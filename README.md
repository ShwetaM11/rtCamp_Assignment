# Swag Labs E2E Test Automation with Playwright for rtCamp

## Project description
This project automates End-to-End (E2E) testing for the <a href="https://www.saucedemo.com/">Swag Labs</a> using Playwright. It validates core functionalities such as user authentication, product sorting, cart management, and checkout processes to ensure a seamless user experience.

## Key features
**Login:** Test login authentication for valid and invalid users.  
**Product sorting:** Ensures correct sorting by name and price.   
**Cart functionality:** Adds, removes, and verifies cart items.  
**Checkout process:** Completes order placement with verification of totals.  
**Screenshots & Reports:** Generates failure screenshots and interactive HTML reports.  
  
## Tech-stack 
**Test framework:** Playwright (Page Object Model)  
**Programming language:** JavaScript  
**Test runner:** Playwright  
**Test reports & Logs:** Playwright HTML Reports & Screenshots  
  
## Test scenarios covered
**E2E test scenarios:**  
1. Login: Verify successful login with valid credentials.  
2. Sorting products (Z-A): Validate product sorting in descending order.  
3. Sorting by price (High to Low): Ensure accurate price sorting.  
4. Cart & Checkout: Add multiple products, verify the cart, and complete the checkout process.  

**Edge test scenarioes:**  
1. Invalid login credentials
2. Login with empty filed
3. Checkout with the empty cart
4. Proceeding to checkout with an empty cart should be blocked  

**Accessibility test scenarios:**  
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

## Running tests
1. Install npm dependencies from the project root folder
  ```npm install```
2. Run all tests
   ```npx playwright test```  
3. Run a specific test
   ```npx playwright test /test/Assignments/AssignmentOfMainScenarioes/E2ETestScenarioes.spec.js```
4. Run tests in headed mode (visible browser)
  ```npx playwright test --headed```
5. Generate and view HTML report
  ```npx playwright show-report```
6. To debug test-script 
  ```npx playwright test --debug```

## Test report
Check already generated report [here](playwright-report/index.html)

 ## Demo Videos 

 1. <a href="https://www.loom.com/share/c4ac0f89fa7d4987b09b589ab1c0c86a?sid=056b6dfd-0c68-46ab-bf81-923d0e12f24e">Playwright Automation Suite Overview</a>
 2. <a href= "https://www.loom.com/share/d58938c70f564ae2878d1a7347d0ae92?sid=2a81a0dc-de8d-4d6f-809c-37565d353764">Accessibility and Edge Test Cases Overview</a>
 3. <a href="https://www.loom.com/share/dbffaaad70924ef9a2bb7fd74604488b?sid=7946a127-61e2-419f-891c-8788c908199a">Execution of testcases in headed mode</a>

## Framework structure
rtCamp_Assignment  
|&emsp;/playwright-report  
|&emsp;|&emsp;index.html  
|&emsp;/test  
|&emsp;│&emsp;/assignments  
|&emsp;│&emsp;│&emsp;/assignmentOfMainScenarioes  
|&emsp;│&emsp;│&emsp;│&emsp;e2eTestScenarioes.spec.js  
│&emsp;│&emsp;│&emsp;/bonusFeatures  
│&emsp;│&emsp;│&emsp;|&emsp;accessesibility.spec.js  
│&emsp;│&emsp;│&emsp;|&emsp;edgeTestScenarioes.spec.js  
│&emsp;│&emsp;│&emsp;/pages  
│&emsp;│&emsp;│&emsp;|&emsp;cartPage.js  
│&emsp;│&emsp;│&emsp;|&emsp;checkoutPage.js  
│&emsp;│&emsp;│&emsp;|&emsp;loginPage.js  
│&emsp;│&emsp;│&emsp;|&emsp;productPage.js  
|&emsp;│&emsp;│&emsp;testData.js  
|&emsp;package-lock.json  
|&emsp;package.json  
|&emsp;playwright.config.js  
