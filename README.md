<h1 align="center">Playwright Web Scraper for Trivago</h1>

<p align="center">
  A powerful automation script built with <strong>Playwright</strong> to scrape 5-star hotel deals from <a href="https://www.trivago.com">Trivago</a> based on top guest ratings.
</p>

---

## 🩻 What It Does

This tool helps you **automate hotel search** and fetch the **lowest prices** for a 5-star hotel stay in any city, for **2 adults and 1 infant (age < 2)**, sorted by guest ratings.

---

##  Features

1️⃣  Automated city search and future date selection  
2️⃣  Dynamic calendar pagination  
3️⃣  Adds an infant traveler  
4️⃣  Filters only 5-star hotels  
5️⃣  Sorts results by **Top Guest Ratings**  
6️⃣  Scrapes multiple price listings per hotel  
7️⃣  Outputs to console

---

##  Tech Stack

| ⚙️Tool        | 🤔Purpose                     |
|-------------|------------------------------|
|  Playwright | Browser automation engine    |
|  TypeScript | Be Type Safe |
|  HTML Report | Beautiful test result output |

---

## 🏁 Getting Started

###  Prerequisites
- [Node.js](https://nodejs.org/) installed
- [VS Code](https://code.visualstudio.com/) or any editor
- Terminal access

### 🪜 Steps to Use

```bash
# Step 1: Clone the repo
git clone https://github.com/AkshayGulhane46/HeadyTest
cd HeadyTest

# Step 2: Install dependencies
npm install

# Step 3: Update location and date (Optional)
 Edit line 32 in the script:
    Example:
    await searchCityAndDates(page, 'Mumbai', '2025-11-03', '2025-11-10');

# Step 4: Run the test
npx playwright test

# Step 5 (Optional): View interactive HTML report
npx playwright show-report
```


in terminal you can see the output for 5 Star hotel prices in given city as 

```bash 
On ZenHotels.com the cost for The Oberoi New Delhi is ₹28,601 per night!
On Hotel Site the cost for The Oberoi New Delhi is ₹34,338 per night!
On Trip.com the cost for The Oberoi New Delhi is ₹39,683 per night!
On Agoda the cost for The Oberoi New Delhi is ₹38,468 per night!
```

OR

you can see the HTML report by Playwright by puttng these in terminal
```bash  npx playwright show-report ```


## ✨ Code Overview

| Function Name                | Description                                        |
|-----------------------------|----------------------------------------------------|
| `locators`                  | Centralized XPaths for maintainability             |
| `goToHomePage()`            | Opens Trivago home page                            |
| `searchCityAndDates()`      | Handles city input and dynamic calendar scrolling  |
| `addInfantAndSearch()`      | Adds infant to the guest list and initiates search |
| `filterTopRated5Star()`     | Applies filters for 5-star hotels and top ratings  |
| `openFirstHotelAndViewDeals()` | Opens the first hotel and scrapes multiple deals  |



---

Author
### Akshay Gulhane

#### Senior QA Engineer

 


