# rtCamp_Assignment

# Project : SauceDemo E2E Test Automation with Playwright

## Project Description:
This project automates End-to-End (E2E) testing for the SauceDemo website using Playwright. It validates core functionalities such as user authentication, product sorting, cart management, and checkout processes to ensure a seamless user experience.

## Key Features: 
Login Automation: Tests authentication for valid and invalid users.  
Product Sorting Validation: Ensures correct sorting by name and price.   
Cart Functionality: Adds, removes, and verifies cart items.  
Checkout Process Testing: Completes order placement with verification of totals. Screenshots & Reports: Generates failure screenshots and interactive HTML reports.  
  
## Tech Stack: 
Test Framework: Playwright (Page Object Model)  
Programming Language: JavaScript  
Test Runner: Playwright  
Test Reports & Logs: Playwright HTML Reports & Screenshots  
  
# Test Scenarios Covered

E2E Test Scenarios:  
1. Login Test: Verify successful login with valid credentials.
2. Sorting Products (Z-A): Validate product sorting in descending order.
3. Sorting by Price (High to Low): Ensure accurate price sorting.
4. Cart & Checkout Test: Add multiple products, verify the cart, and complete the checkout process.

Edge Test Scenarioes:

5. Invalid Login Credentials
6. Login with empty filed
7. Checkout with the empty cart
8. Proceeding to checkout with an empty cart should be blocked

Accessibility Test Scenarios:

9. Logs full accessibility scan results
10. Ensures no violations based on selected rules
11. A page should not have any automatically detectable WCAG A or AA violations.

# Prerequisites

1. Install Node JS and IDE ( VS Code )  

2. Install Playwright using the command as npm package  
  - Create a new folder and open it in VS Code
  - Goto Terminal and run command
  - npm init playwright@latest
  - The following will be added
    - package.json - node project management file 
    - playwright.config.js - Configuration file 
    - tests folder - basic example test 
    - tests-examples folder - detailed example tests 
    - .gitignore - to be used during git commit and push 
    - playwright.yml - to be used during ci cd pipeline (GitHub workflows)
  - Check playwright added
  - npm playwright -v

3. Check playwright command options
  - npx playwright -h

4. Install axe-core Accessibility Library
  - npm install @axe-core/playwright

# Running Tests

1. Run all tests
- npx playwright test  

2. Run a specific test  
- npx playwright test /test/Assignments/AssignmentOfMainScenarioes/E2ETestScenarioes.spec.js

3. Run tests in headed mode (visible browser)
- npx playwright test --headed

4. Generate and view HTML report
- npx playwright show-report

# Framework Structure 

- rtCamp_Assignment
- │── test
- │   │── Assignments/
- │   │   │── / AssignmentOfMainScenarioes
- │   │   │── / BonusFeatures
- │   │   │── / pages
- │   │   │   │── / AssignmentOfMainScenarioes
- │   │   │   │   │── E2ETestScenarioes.spec.js
- │   │   │   │── / BonusFeatures
- │   │   │   │   │── Accessesibility.spec.js
- │   │   │   │   │── EdgeTestScenarioes.spec.js
- │   │   │   │── pages/
- │   │   │   │   │── cartPage.js
- │   │   │   │   │── checkoutPage.js
- │   │   │   │   │── loginPage.js
- │   │   │   │   │── productPage.js
- │   │   │ ── / testData.js
- │   │   │   │── screenshots/
- │   │   │   │── package-lock.json
- │   │   │   │── package.json
- │   │   │   │── playwright.config.js  


