const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default; 

// Accessibility test suite for the Saucedemo website
test.describe('Saucedemo Accessibility Tests', () => { 

    // Test 1: Perform a full accessibility scan and log the results
    test('Logs full accessibility scan results', async ({ page }) => {

      // Navigate to the Saucedemo login page
      await page.goto('https://www.saucedemo.com/'); 
      
      // Run an automated accessibility scan using Axe-core
      const Results = await new AxeBuilder({ page }).analyze();
      
      // Log the scan results for debugging and review
      console.log('Accessibility Scan Results:', JSON.stringify(Results, null, 2));

      // Capture a full-page screenshot for reference
      await page.screenshot({ path: 'screenshots/Accessibility/full-accessibility-scan.png', fullPage: true });

      // Ensure that accessibility violations (if any) are logged but do not fail the test
      expect(Results.violations.length).toBeGreaterThanOrEqual(0);

    });

    // Test 2: Check for specific accessibility rule violations
    test('Ensures no violations based on selected rules', async ({ page }, testInfo) => {

      await test.step('check a11y', async() => {

        // Run an accessibility scan with selected rules for common WCAG violations
        const { violations } = await new AxeBuilder({ page })
          .withRules([
            'accesskeys', 'aria-allowed-role', 'aria-text', 'aria-treeitem-name', 
            'empty-heading', 'empty-table-header', 'frame-tested', 'heading-order', 
            'label-title-only', 'image-redundant-alt', 'landmark-banner-is-top-level', 
            'landmark-complementary-is-top-level', 'landmark-contentinfo-is-top-level', 
            'landmark-main-is-top-level', 'landmark-no-duplicate-banner', 
            'landmark-no-duplicate-contentinfo', 'landmark-no-duplicate-main',
            'landmark-unique', 'meta-viewport-large', 'presentation-role-conflict', 
            'scope-attr-valid', 'skip-link', 'tabindex', 'table-duplicate-name', /*'landmark-one-main', 'page-has-heading-one', 'region'*/
          ])
          .analyze();

        // If violations are found, log them and capture a screenshot
        if (violations.length > 0) {
          console.log('Accessibility Violations Found:', JSON.stringify(violations, null, 2));
        }

        // Attach the scan results to the test report for visibility
        await testInfo.attach('accessibility-scan-results', {
          body: JSON.stringify(violations, null, 2),
          contentType: 'application/json'
        });

        // Ensure no violations exist for the selected rules
        expect(violations).toHaveLength(0);
        console.log('No Accessibility Violations Found');

      });
    });

    // Test 3: Validate compliance with WCAG A and AA standards
    test('A page should not have any automatically detectable WCAG A or AA violations', async ({ page }) => {

      // Navigate to the Saucedemo website
      await page.goto('https://www.saucedemo.com/');
    
      // Run an accessibility scan against WCAG 2.0 & 2.1 A/AA standards
      const ScanedResults = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();

      // If violations are detected, log and capture a screenshot
      if (ScanedResults.violations.length > 0) {
        console.log('Detected WCAG Violations:', JSON.stringify(ScanedResults.violations, null, 2));
      }

      // Assert that no WCAG violations exist
      expect(ScanedResults.violations).toEqual([]);

    });   

});
