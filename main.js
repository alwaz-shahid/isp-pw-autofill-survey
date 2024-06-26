

const { chromium } = require('playwright');

async function main() {
  const username = '';
  const password = '';

  // student portal direct URL
  let url = 'https://portal.isp.edu.pk/portal';
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to the portal
    await page.goto(url);
    
    // Close any pop-ups or alerts
    await page.goto('https://portal.isp.edu.pk/');
    await page.getByRole('button', { name: 'Close' }).click();

    // Click on the Student Portal button
    await page.getByRole('button', { name: 'Student Portal ' }).click();

    // Fill in the User ID
    await page.getByPlaceholder('Enter User ID').click();
    await page.getByPlaceholder('Enter User ID').fill(username);

    // Fill in the Password
    await page.getByRole('textbox', { name: 'Enter Password' }).click();
    await page.getByRole('textbox', { name: 'Enter Password' }).fill(password);

    // Click the Sign In button
    await page.getByRole('button', { name: 'Sign In' }).click();
// loopp for number of professors
    for (let i = 1; i <= 7; i++){
      // Select options for questions and submit answers
      for (let i = 1; i <= 39; i++) {
        const questionNumber = `A${i}`;
        const selectLocator = `select[name="${questionNumber}"]`;
        const selectElement = await page.locator(selectLocator);
  
        // Select default option
        if (selectElement) {
          await selectElement.selectOption('3');
          await page.waitForTimeout(500);
        }
  
        // Submit answers after the last question
        if (i === 39) {
          const submitAnswersButton = await page.getByRole('button', { name: 'Submit Answers' });
          await submitAnswersButton.click();
          await page.waitForTimeout(2000);
        }
      }
      
      // Submit answers button click (if necessary)
      const submitAnswersButton = await page.getByRole('button', { name: 'Submit Answers' });
      await submitAnswersButton.click();
      await page.waitForTimeout(2000);
    }
    await page.waitForTimeout(2000);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
}

// Invoke the script to be tested.
main();
