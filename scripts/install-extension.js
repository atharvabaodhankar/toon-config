#!/usr/bin/env node

/**
 * Post-install script to set up TOON syntax highlighting in VS Code
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, cpSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const isWindows = process.platform === 'win32';
const vscodeExtDir = join(
  homedir(),
  isWindows ? '.vscode/extensions' : '.vscode/extensions',
  'toon-vscode-1.0.0'
);

console.log('📦 Setting up TOON syntax highlighting for VS Code...');

try {
  // Check if VS Code is installed
  try {
    execSync(isWindows ? 'code --version' : 'code --version', { stdio: 'ignore' });
  } catch (error) {
    console.log('⚠️  VS Code not found. Skipping extension installation.');
    console.log('   You can manually install the extension later from the VS Code Marketplace.');
    process.exit(0);
  }

  // Create extensions directory if it doesn't exist
  if (!existsSync(vscodeExtDir)) {
    mkdirSync(vscodeExtDir, { recursive: true });
  }

  // Copy extension files
  const extensionSource = join(process.cwd(), 'vscode-extension');
  
  if (existsSync(extensionSource)) {
    cpSync(extensionSource, vscodeExtDir, { recursive: true });
    console.log('✅ TOON syntax highlighting installed successfully!');
    console.log('   Reload VS Code to activate: Ctrl+Shift+P → "Reload Window"');
  } else {
    console.log('⚠️  Extension files not found. Skipping installation.');
  }
} catch (error) {
  console.log('⚠️  Could not install VS Code extension automatically.');
  console.log('   You can manually install it from: https://marketplace.visualstudio.com/items?itemName=op_athu_17.toon-vscode');
  console.log('   Error:', error.message);
}
