// Parser for TOON format
import { TokenType } from './lexer.js';

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.pos = 0;
  }

  peek() {
    return this.tokens[this.pos];
  }

  advance() {
    return this.tokens[this.pos++];
  }

  expect(type) {
    const token = this.peek();
    if (token.type !== type) {
      throw new Error(
        `Expected ${type} but got ${token.type} at line ${token.line}, column ${token.column}`
      );
    }
    return this.advance();
  }

  parseValue() {
    const token = this.peek();
    
    if (token.type === TokenType.KEYWORD) {
      return this.parseToken();
    } else if (token.type === TokenType.STRING) {
      this.advance();
      return token.value;
    } else if (token.type === TokenType.NUMBER) {
      this.advance();
      return token.value;
    } else if (token.type === TokenType.BOOLEAN) {
      this.advance();
      return token.value;
    } else {
      throw new Error(
        `Unexpected token ${token.type} at line ${token.line}, column ${token.column}`
      );
    }
  }

  parseToken() {
    const keyword = this.expect(TokenType.KEYWORD);
    this.expect(TokenType.LPAREN);
    
    switch (keyword.value) {
      case 'OBJ':
        return this.parseObject();
      case 'LIST':
        return this.parseList();
      case 'STR':
        return this.parseTypedValue('string');
      case 'INT':
        return this.parseTypedValue('integer');
      case 'FLOAT':
        return this.parseTypedValue('float');
      case 'BOOL':
        return this.parseTypedValue('boolean');
      default:
        throw new Error(`Unknown keyword: ${keyword.value}`);
    }
  }

  parseObject() {
    const obj = {};
    
    while (this.peek().type !== TokenType.RPAREN) {
      const token = this.peek();
      
      if (token.type === TokenType.KEYWORD) {
        const keyword = this.advance();
        this.expect(TokenType.LPAREN);
        
        const key = this.expect(TokenType.IDENTIFIER).value;
        this.expect(TokenType.COMMA);
        
        const value = this.parseValue();
        obj[key] = value;
        
        this.expect(TokenType.RPAREN);
      } else {
        throw new Error(
          `Expected keyword in object at line ${token.line}, column ${token.column}`
        );
      }
      
      if (this.peek().type === TokenType.COMMA) {
        this.advance();
      }
    }
    
    this.expect(TokenType.RPAREN);
    return obj;
  }

  parseList() {
    const list = [];
    
    while (this.peek().type !== TokenType.RPAREN) {
      list.push(this.parseValue());
      
      if (this.peek().type === TokenType.COMMA) {
        this.advance();
      }
    }
    
    this.expect(TokenType.RPAREN);
    return list;
  }

  parseTypedValue(expectedType) {
    const key = this.expect(TokenType.IDENTIFIER).value;
    this.expect(TokenType.COMMA);
    
    const token = this.peek();
    const value = this.parseValue();
    
    // Type validation
    this.validateType(value, expectedType, token);
    
    this.expect(TokenType.RPAREN);
    return value;
  }

  validateType(value, expectedType, token) {
    const actualType = typeof value;
    
    switch (expectedType) {
      case 'string':
        if (actualType !== 'string') {
          throw new Error(
            `Type mismatch: expected String token, got ${actualType} at line ${token.line}, column ${token.column}`
          );
        }
        break;
      case 'integer':
        if (actualType !== 'number' || !Number.isInteger(value)) {
          throw new Error(
            `Type mismatch: expected Integer token, got ${actualType} at line ${token.line}, column ${token.column}`
          );
        }
        break;
      case 'float':
        if (actualType !== 'number') {
          throw new Error(
            `Type mismatch: expected Float token, got ${actualType} at line ${token.line}, column ${token.column}`
          );
        }
        break;
      case 'boolean':
        if (actualType !== 'boolean') {
          throw new Error(
            `Type mismatch: expected Boolean token, got ${actualType} at line ${token.line}, column ${token.column}`
          );
        }
        break;
    }
  }

  parse() {
    return this.parseValue();
  }
}

export { Parser };
