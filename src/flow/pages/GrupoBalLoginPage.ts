import { Page, Locator } from '@playwright/test';

export class GrupoBalLoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // TODO: Replace with actual selectors from the application
    this.usernameInput = page.locator('#edit-name');
    this.passwordInput = page.locator('#edit-pass');
    this.loginButton = page.locator('#edit-submit');
    this.errorMessage = page.locator('.alert.alert-danger'); // Placeholder for error message
  }

  async navigateToLogin() {
    await this.page.goto('https://grupobalstage.prod.acquia-sites.com/ingresar');
  }

  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async validateSuccessfulLogin() {
    // TODO: Replace with a reliable check for successful login,
    // e.g., checking for a welcome message or a specific element on the dashboard.
    await this.page.waitForURL('**/some-dashboard-url');
  }

  async validateErrorMessage() {
    await this.errorMessage.waitFor({ state: 'visible' });
  }

  async getErrorMessageText(): Promise<string> {
    return this.errorMessage.innerText();
  }

  async isOnLoginPage(): Promise<boolean> {
    // TODO: Replace with a reliable check for the login page.
    return this.loginButton.isVisible();
  }

  async captureStepScreenshot(name: string, dir: string): Promise<string> {
    const screenshotPath = `${dir}/${name}.png`;
    await this.page.screenshot({ path: screenshotPath });
    return screenshotPath;
  }
}
