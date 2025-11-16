// File loader for TOON config files
import { readFileSync } from 'fs';
import { readFile } from 'fs/promises';
import { Lexer } from './lexer.js';
import { Parser } from './parser.js';

function loadConfigSync(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const lexer = new Lexer(content);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    return parser.parse();
  } catch (error) {
    throw new Error(`Failed to load config from ${filePath}: ${error.message}`);
  }
}

async function loadConfig(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    const lexer = new Lexer(content);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    return parser.parse();
  } catch (error) {
    throw new Error(`Failed to load config from ${filePath}: ${error.message}`);
  }
}

function parseString(toonString) {
  try {
    const lexer = new Lexer(toonString);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    return parser.parse();
  } catch (error) {
    throw new Error(`Failed to parse TOON string: ${error.message}`);
  }
}

export { loadConfig, loadConfigSync, parseString };
