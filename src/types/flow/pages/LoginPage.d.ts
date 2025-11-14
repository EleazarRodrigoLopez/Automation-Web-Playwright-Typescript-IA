import { Page } from '@playwright/test';

export declare class LoginPage {
  constructor(page: Page);
  
  navigateToLogin(): Promise<void>;
  enterUsername(username: string): Promise<void>;
  enterPassword(password: string): Promise<void>;
  clickLoginButton(): Promise<void>;
  login(username: string, password: string): Promise<void>;
  validateSuccessfulLogin(): Promise<void>;
  validateErrorMessage(): Promise<void>;
  getErrorMessageText(): Promise<string>;
  isOnLoginPage(): Promise<boolean>;
  captureStepScreenshot(stepName: string, screenshotDir: string): Promise<string>;
}


