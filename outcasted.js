async function main() {
  // student portal direct URL
  let url = 'https://portal.isp.edu.pk/portal';
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  try {
    await page.goto(url);
    //looking for the inputs
    await page.waitForSelector('input[placeholder="Enter User Name"]');
    const usernameInput = await page.getByPlaceholder('Enter User Name');
    await usernameInput.click();
    await usernameInput.press('NumLock');
    await usernameInput.fill(username);
    await usernameInput.press('Enter');
    await page.waitForSelector('input[placeholder="Password"]');
    const passwordInput = await page.getByPlaceholder('Password');
    await passwordInput.fill(password);
    const signInButton = await page.getByRole('button', { name: 'Sign In' });
    await signInButton.click();
    // locgic to answer all questions
    for (let i = 1; i <= 40; i++) {
      if (i == 40) {
        i = 1;
        const submitAnswersButton = await page.getByRole('button', {
          name: 'Submit Answers',
        });
        await submitAnswersButton.click();
        await page.waitForTimeout(2000);
      }
      const questionNumber = `A${i}`;
      const selectLocator = `select[name="${questionNumber}"]`;
      const selectElement = await page.locator(selectLocator);
      // selecting default option
      if (selectElement) {
        await selectElement.selectOption('3');
        await page.waitForTimeout(500);
      }
    }
    const submitAnswersButton = await page.getByRole('button', {
      name: 'Submit Answers',
    });
    await submitAnswersButton.click();
    await page.waitForTimeout(2000);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
}
// Invoke the script to be tested.
main();
