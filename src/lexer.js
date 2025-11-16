// Tokenizer for TOON format

const TokenType = {
  KEYWORD: 'KEYWORD',
  IDENTIFIER: 'IDENTIFIER',
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  BOOLEAN: 'BOOLEAN',
  LPAREN: 'LPAREN',
  RPAREN: 'RPAREN',
  COMMA: 'COMMA',
  EOF: 'EOF'
};

class Lexer {
  constructor(input) {
    this.input = input;
    this.pos = 0;
    this.line = 1;
    this.column = 1;
  }

  peek() {
    return this.input[this.pos];
  }

  advance() {
    const char = this.input[this.pos++];
    if (char === '\n') {
      this.line++;
      this.column = 1;
    } else {
      this.column++;
    }
    return char;
  }

  skipWhitespace() {
    while (this.pos < this.input.length) {
      const char = this.peek();
      if (char === ' ' || char === '\t' || char === '\n' || char === '\r') {
        this.advance();
      } else if (char === '#' && this.input[this.pos + 1] === '#') {
        // Skip comments
        while (this.pos < this.input.length && this.peek() !== '\n') {
          this.advance();
        }
      } else {
        break;
      }
    }
  }

  readString() {
    const startLine = this.line;
    const startCol = this.column;
    this.advance(); // skip opening quote
    let value = '';
    
    while (this.pos < this.input.length && this.peek() !== '"') {
      if (this.peek() === '\\') {
        this.advance();
        const next = this.advance();
        switch (next) {
          case 'n': value += '\n'; break;
          case 't': value += '\t'; break;
          case '\\': value += '\\'; break;
          case '"': value += '"'; break;
          default: value += next;
        }
      } else {
        value += this.advance();
      }
    }
    
    if (this.peek() !== '"') {
      throw new Error(`Unterminated string at line ${startLine}, column ${startCol}`);
    }
    this.advance(); // skip closing quote
    
    return { type: TokenType.STRING, value, line: startLine, column: startCol };
  }

  readNumber() {
    const startLine = this.line;
    const startCol = this.column;
    let value = '';
    
    if (this.peek() === '-') {
      value += this.advance();
    }
    
    while (this.pos < this.input.length && /[0-9.]/.test(this.peek())) {
      value += this.advance();
    }
    
    return { type: TokenType.NUMBER, value: parseFloat(value), line: startLine, column: startCol };
  }

  readIdentifier() {
    const startLine = this.line;
    const startCol = this.column;
    let value = '';
    
    while (this.pos < this.input.length && /[a-zA-Z0-9_]/.test(this.peek())) {
      value += this.advance();
    }
    
    // Check for keywords
    const keywords = ['OBJ', 'STR', 'INT', 'FLOAT', 'BOOL', 'LIST'];
    if (keywords.includes(value)) {
      return { type: TokenType.KEYWORD, value, line: startLine, column: startCol };
    }
    
    // Check for boolean literals
    if (value === 'true' || value === 'false') {
      return { type: TokenType.BOOLEAN, value: value === 'true', line: startLine, column: startCol };
    }
    
    return { type: TokenType.IDENTIFIER, value, line: startLine, column: startCol };
  }

  tokenize() {
    const tokens = [];
    
    while (this.pos < this.input.length) {
      this.skipWhitespace();
      
      if (this.pos >= this.input.length) break;
      
      const char = this.peek();
      const line = this.line;
      const column = this.column;
      
      if (char === '(') {
        tokens.push({ type: TokenType.LPAREN, value: '(', line, column });
        this.advance();
      } else if (char === ')') {
        tokens.push({ type: TokenType.RPAREN, value: ')', line, column });
        this.advance();
      } else if (char === ',') {
        tokens.push({ type: TokenType.COMMA, value: ',', line, column });
        this.advance();
      } else if (char === '"') {
        tokens.push(this.readString());
      } else if (char === '-' || /[0-9]/.test(char)) {
        tokens.push(this.readNumber());
      } else if (/[a-zA-Z_]/.test(char)) {
        tokens.push(this.readIdentifier());
      } else {
        throw new Error(`Unexpected character '${char}' at line ${line}, column ${column}`);
      }
    }
    
    tokens.push({ type: TokenType.EOF, value: null, line: this.line, column: this.column });
    return tokens;
  }
}

export { Lexer, TokenType };
