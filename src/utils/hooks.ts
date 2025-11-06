import * as fs from 'fs';
import * as path from 'path';

/**
 * Creates a directory for screenshots if it doesn't exist
 * @param dirPath - The directory path to create
 */
export function createScreenshotDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Creates a report directory if it doesn't exist
 * @param dirPath - The directory path to create
 */
export function createReportDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}