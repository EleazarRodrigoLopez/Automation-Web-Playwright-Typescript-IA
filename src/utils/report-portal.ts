import { TestInfo } from '@playwright/test';

/**
 * ReportPortal Reporter utility for sending logs and attachments
 */
export class Reporter {
  /**
   * Send a log message to ReportPortal
   * 
   * @param testInfo The test information
   * @param level Log level (INFO, WARN, ERROR)
   * @param message The log message
   * @param attachment Optional attachment
   */
  static sendLog(
    testInfo: TestInfo, 
    level: 'INFO' | 'WARN' | 'ERROR', 
    message: string, 
    attachment?: { name: string, type: string, content: Buffer | string }
  ): void {
    // Log to console during development
    console.log(`[${level}] ${message}`);
    
    // Add attachment to test if provided
    if (attachment) {
      testInfo.attachments.push({
        name: attachment.name,
        contentType: attachment.type,
        body: typeof attachment.content === 'string' 
          ? Buffer.from(attachment.content) 
          : attachment.content
      });
    }
    
    // In real implementation, this would send to ReportPortal API
    // For now, we're just logging to console and attaching to test
  }
} 