import { expect, test, Page } from '@playwright/test';
import fs from 'fs';
test.setTimeout(120000); // Set timeout to 2 minutes

// Added Explicit waits to see how this program selects values 
// All Locators
const locators = {
  destinationInput: '//input[@data-testid="search-form-destination"]',
  calendarOpen: "//span[@data-testid='search-form-calendar-checkin-value']/parent::span",
  calendarNext: "//button[@data-testid='calendar-button-next']",
  childrenAddButton: "//button[@data-testid='children-amount-plus-button']",
  searchButton: "//button[@data-testid='search-button-with-loader']",
  moreFiltersButton: "//button[@name='more_filters']",
  fiveStarFilter: "//button[@data-testid='5-star-hotels-filter']",
  applyFiltersButton: "//button[@data-testid='filters-popover-apply-button']",
  sortSelector: "//button[@name='sorting_selector']",
  topGuestRatings: "Top guest ratings",
  firstHotelDetails: "(//div[@data-testid='details-section'])[1]",
  pricesTab: '//li[@data-testid="accommodation-list-element"]//span[@data-testid="tab-wrapper" and contains(text(),"Prices")]',
  showMoreDealsButton: '//button[@data-testid="show-more-deals-button"]',
  hotelName: "(//li[@data-testid='accommodation-list-element'])[1]//span[@itemprop='name']",
  dealAdvertiserNames: "//div[@data-testid='deal-summary']//span[@data-testid='advertiser-name']",
  dealPrices: "//div[@data-testid='deal-summary']//div[@data-testid='recommended-price']"
};

// Test Suite
test.describe('Web Scraper for Hotel Websites', () => {
  test('Get the lowest deal for 5-star hotel', async ({ page }) => {
    // Navigate to Trivago Home Page
    await goToHomePage(page);
    // Add any City and Date till next 12 Months in form YYYY-MM-DD
    await searchCityAndDates(page, 'New Delhi', '2025-10-03', '2025-10-10'); 
    // Add Infant and Search
    await addInfantAndSearch(page);
    // Filter for Top Rated 5-Star Hotels
    await filterTopRated5Star(page);
    // Open First Hotel and View Deals
    await openFirstHotelAndViewDeals(page);
  });
});

// Helper Functions
async function goToHomePage(page: Page) {
  await page.goto('https://www.trivago.com/');
  await page.waitForTimeout(5000);
}

async function searchCityAndDates(page: Page, city: string, checkInDate: string, checkOutDate: string) {
  await page.locator(locators.destinationInput).fill(city);
  await page.waitForTimeout(2000);

  await page.locator(locators.calendarOpen).click();
  await page.waitForTimeout(1000);

  // Date selection function
  async function selectDate(date: string) {
    const dateSelector = `//button[@data-testid='valid-calendar-day-${date}']`;
    // Loop to check the dates for next 12 Months
    for (let i = 0; i < 12; i++) {
      const isDateVisible = await page.locator(dateSelector).isVisible();
      if (isDateVisible) {
        await page.locator(dateSelector).click();
        return;
      }
      // if date is not found in current month, click next month
      await page.locator(locators.calendarNext).click();
      await page.waitForTimeout(500);
    }
    throw new Error(`Date ${date} not found in calendar after 12 attempts`);
  }

  await selectDate(checkInDate);
  await page.waitForTimeout(1000);
  await selectDate(checkOutDate);
}

async function addInfantAndSearch(page: Page) {
  await page.waitForTimeout(2000);
  await page.locator(locators.childrenAddButton).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.searchButton).click();
  await page.waitForTimeout(10000);
}

async function filterTopRated5Star(page: Page) {
  await page.locator(locators.moreFiltersButton).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.fiveStarFilter).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.applyFiltersButton).click();
  await page.waitForTimeout(5000);
  await page.locator(locators.sortSelector).click();
  await expect(page.getByText(locators.topGuestRatings)).toBeVisible();
  await page.getByText(locators.topGuestRatings).click();
  await page.waitForTimeout(5000);
}

async function openFirstHotelAndViewDeals(page: Page) {
  await page.locator(locators.firstHotelDetails).click();
  await page.waitForTimeout(2000);

  await page.locator(locators.pricesTab).click();
  await page.waitForTimeout(2000);

  await page.locator(locators.showMoreDealsButton).click();

  const hotelName = await page.locator(locators.hotelName).textContent();
  const deals = page.locator(locators.dealAdvertiserNames);
  const prices = page.locator(locators.dealPrices);

  const dealCount = await deals.count();
  for (let i = 1; i < dealCount; i++) {
    const dealName = await deals.nth(i).textContent();
    const dealPrice = await prices.nth(i).textContent();
    console.log(`Price for ${hotelName} on ${dealName} per night is ${dealPrice}`);
  }
}
