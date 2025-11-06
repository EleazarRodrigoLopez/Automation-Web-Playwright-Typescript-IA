import { Page } from '@playwright/test';
import fs from 'fs';

export async function captureDOMSnapshot(page: Page, filePath: string) {
  const domContent = await page.content();
  fs.writeFileSync(filePath, domContent, 'utf-8');
}

export function compareDOMSnapshots(oldPath: string, newPath: string): string[] {
  const oldDOM = fs.readFileSync(oldPath, 'utf-8');
  const newDOM = fs.readFileSync(newPath, 'utf-8');
  const changes: string[] = [];

  if (oldDOM !== newDOM) {
    changes.push('DOM has changed between executions.');
  }

  return changes;
}
