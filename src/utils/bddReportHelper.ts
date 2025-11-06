import * as fs from 'fs';
import { ICustomWorld } from '../bdd/steps/world';

export class BDDReportHelper {
  /**
   * Send log to ReportPortal with optional attachment
   * @param world - The Cucumber world context
   * @param level - Log level (INFO, ERROR, DEBUG, etc.)
   * @param message - Message to log
   * @param attachmentPath - Optional path to attachment file
   */
  static async sendLog(
    world: ICustomWorld, 
    level: string, 
    message: string, 
    attachmentPath?: string
  ): Promise<void> {
    // Implement actual ReportPortal integration here
    console.log(`[${level}] ${message}`);
    
    if (attachmentPath && fs.existsSync(attachmentPath)) {
      // Placeholder for ReportPortal attachment logic
      console.log(`Attachment added: ${attachmentPath}`);
    }
  }
}