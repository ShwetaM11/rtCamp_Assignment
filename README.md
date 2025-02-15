# Project : SauceDemo E2E Test Automation with Playwright for rtCamp

## Project Description
This project automates End-to-End (E2E) testing for the SauceDemo website using Playwright. It validates core functionalities such as user authentication, product sorting, cart management, and checkout processes to ensure a seamless user experience.

## Key Features
**Login Automation:** Tests authentication for valid and invalid users.  
**Product Sorting Validation:** Ensures correct sorting by name and price.   
**Cart Functionality:** Adds, removes, and verifies cart items.  
**Checkout Process Testing:** Completes order placement with verification of totals.  
**Screenshots & Reports:** Generates failure screenshots and interactive HTML reports.  
  
## Tech Stack 
**Test Framework:** Playwright (Page Object Model)  
**Programming Language:** JavaScript  
**Test Runner:** Playwright  
**Test Reports & Logs:** Playwright HTML Reports & Screenshots  
  
## Test Scenarios Covered
**E2E Test Scenarios:**  
1. Login Test: Verify successful login with valid credentials.  
2. Sorting Products (Z-A): Validate product sorting in descending order.  
3. Sorting by Price (High to Low): Ensure accurate price sorting.  
4. Cart & Checkout Test: Add multiple products, verify the cart, and complete the checkout process.  

**Edge Test Scenarioes:**  
1. Invalid Login Credentials
2. Login with empty filed
3. Checkout with the empty cart
4. Proceeding to checkout with an empty cart should be blocked  

**Accessibility Test Scenarios:**  
1. Logs full accessibility scan results
2. Ensures no violations based on selected rules
3. A page should not have any automatically detectable WCAG A or AA violations.  

## Prerequisites
<ol>
  <li>Install Node JS and IDE ( VS Code )</li>
  <li>Install Playwright using the command as npm package  
    <ol>
      <li>Create a new folder and open it in VS Code</li>
      <li>Goto Terminal and run command  <code>npm init playwright@latest</code>  and the following will be added</li>
      <ul>
        <li><code>package.json</code> - node project management file</li>
        <li><code>playwright.config.js</code> - Configuration file</li>
        <li><code>tests</code> - folder for basic example test</li>
        <li><code>tests-examples</code> - folder for detailed example tests</li>
        <li><code>.gitignore</code> - to be used during git commit and push</li>
        <li><code>playwright.yml</code> - to be used during ci cd pipeline (GitHub workflows)</li>
      </ul>
    </ol>
  </li>
  <li>Check playwright added</li>
  <code>npm playwright -v</code>
  <li>Check playwright help options</li>
  <code>npx playwright -h</code>
  <li>Install axe-core Accessibility Library</li>
  <code>npm install @axe-core/playwright</code>
</ol>

## Running Tests
1. Run all tests
```npx playwright test```  
2. Run a specific test
   ```npx playwright test /test/Assignments/AssignmentOfMainScenarioes/E2ETestScenarioes.spec.js```
3. Run tests in headed mode (visible browser)
  ```npx playwright test --headed```
4. Generate and view HTML report
  ```npx playwright show-report```

## Framework Structure
rtCamp_Assignment  
|&emsp;/test  
|&emsp;│&emsp;/Assignments/  
|&emsp;│&emsp;│&emsp;/AssignmentOfMainScenarioes  
|&emsp;│&emsp;│&emsp;│&emsp;E2ETestScenarioes.spec.js  
│&emsp;│&emsp;│&emsp;/BonusFeatures  
│&emsp;│&emsp;│&emsp;|&emsp;Accessesibility.spec.js  
│&emsp;│&emsp;│&emsp;|&emsp;EdgeTestScenarioes.spec.js  
│&emsp;│&emsp;│&emsp;/pages  
│&emsp;│&emsp;│&emsp;|&emsp;cartPage.js  
│&emsp;│&emsp;│&emsp;|&emsp;checkoutPage.js  
│&emsp;│&emsp;│&emsp;|&emsp;loginPage.js  
│&emsp;│&emsp;│&emsp;|&emsp;productPage.js  
|&emsp;│&emsp;│&emsp;testData.js  
|&emsp;/screenshots  
|&emsp;package-lock.json  
|&emsp;package.json  
|&emsp;playwright.config.js  
