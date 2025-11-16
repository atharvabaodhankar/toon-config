# TOON Config Architecture

## Overview

TOON Config is a configuration parser and serializer built using classic compiler design principles. It transforms TOON (Token-Oriented Object Notation) format into JavaScript objects and vice versa.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    TOON Config System                    │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌───────────────┐                      ┌───────────────┐
│   PARSING     │                      │ SERIALIZATION │
│   PIPELINE    │                      │   PIPELINE    │
└───────────────┘                      └───────────────┘
        │                                       │
        │                                       │
   .toon file                            JS Object
        │                                       │
        ▼                                       ▼
┌───────────────┐                      ┌───────────────┐
│  File Loader  │                      │  Serializer   │
└───────────────┘                      └───────────────┘
        │                                       │
        ▼                                       ▼
┌───────────────┐                      ┌───────────────┐
│     Lexer     │                      │ Type Inferrer │
│  (Tokenizer)  │                      └───────────────┘
└───────────────┘                              │
        │                                       │
        ▼                                       ▼
┌───────────────┐                      ┌───────────────┐
│    Tokens     │                      │  TOON String  │
└───────────────┘                      └───────────────┘
        │
        ▼
┌───────────────┐
│    Parser     │
└───────────────┘
        │
        ▼
┌───────────────┐
│   Validator   │
└───────────────┘
        │
        ▼
┌───────────────┐
│   JS Object   │
└───────────────┘
```

## Components

### 1. Lexer (lexer.js)
**Purpose**: Tokenize TOON input into a stream of tokens

**Responsibilities**:
- Read character by character
- Identify token types (KEYWORD, IDENTIFIER, STRING, NUMBER, etc.)
- Skip whitespace and comments
- Track line and column numbers for error reporting
- Handle escape sequences in strings

**Token Types**:
- `KEYWORD`: OBJ, STR, INT, FLOAT, BOOL, LIST
- `IDENTIFIER`: Variable names/keys
- `STRING`: Quoted string values
- `NUMBER`: Integer or float values
- `BOOLEAN`: true/false
- `LPAREN`, `RPAREN`: Parentheses
- `COMMA`: Separator
- `EOF`: End of file

**Example**:
```javascript
Input:  'STR(name, "test")'
Output: [
  { type: 'KEYWORD', value: 'STR' },
  { type: 'LPAREN', value: '(' },
  { type: 'IDENTIFIER', value: 'name' },
  { type: 'COMMA', value: ',' },
  { type: 'STRING', value: 'test' },
  { type: 'RPAREN', value: ')' }
]
```

### 2. Parser (parser.js)
**Purpose**: Convert token stream into JavaScript objects

**Responsibilities**:
- Consume tokens from lexer
- Build Abstract Syntax Tree (AST)
- Validate syntax structure
- Handle nested objects and lists
- Provide clear error messages

**Parsing Methods**:
- `parseValue()`: Parse any value type
- `parseToken()`: Parse token-based values
- `parseObject()`: Parse OBJ structures
- `parseList()`: Parse LIST structures
- `parseTypedValue()`: Parse typed primitives (STR, INT, etc.)

**Example**:
```javascript
Input:  [KEYWORD(OBJ), LPAREN, KEYWORD(STR), ...]
Output: { name: "test", port: 3000 }
```

### 3. Validator (integrated in parser.js)
**Purpose**: Ensure type correctness

**Responsibilities**:
- Validate token types match expected values
- Check INT tokens contain integers
- Check BOOL tokens contain booleans
- Check STR tokens contain strings
- Provide descriptive error messages

**Example**:
```javascript
// ❌ Invalid
INT(value, true)  → Error: Type mismatch

// ✅ Valid
INT(value, 42)    → Success
```

### 4. Serializer (serializer.js)
**Purpose**: Convert JavaScript objects to TOON format

**Responsibilities**:
- Infer types from JavaScript values
- Generate properly formatted TOON syntax
- Handle nested structures
- Escape special characters in strings
- Format with proper indentation

**Type Inference**:
- `string` → `STR`
- `number` (integer) → `INT`
- `number` (float) → `FLOAT`
- `boolean` → `BOOL`
- `Array` → `LIST`
- `Object` → `OBJ`

**Example**:
```javascript
Input:  { name: "test", port: 3000 }
Output: 'OBJ(\n   STR(name, "test"),\n   INT(port, 3000)\n)'
```

### 5. Loader (loader.js)
**Purpose**: File I/O and orchestration

**Responsibilities**:
- Read .toon files from disk
- Coordinate lexer and parser
- Handle file errors
- Provide sync and async APIs

**API**:
- `loadConfig(path)`: Async file loading
- `loadConfigSync(path)`: Sync file loading
- `parseString(str)`: Parse TOON string directly

## Data Flow

### Parsing Flow
```
.toon file
    ↓
File Loader (reads file)
    ↓
Lexer (tokenizes)
    ↓
Token Stream
    ↓
Parser (builds AST)
    ↓
Validator (checks types)
    ↓
JavaScript Object
```

### Serialization Flow
```
JavaScript Object
    ↓
Type Inferrer (determines types)
    ↓
Serializer (generates TOON)
    ↓
TOON String
```

## Error Handling

### Error Types
1. **Lexer Errors**
   - Unterminated strings
   - Invalid characters
   - Malformed numbers

2. **Parser Errors**
   - Unexpected tokens
   - Missing parentheses
   - Invalid syntax

3. **Validation Errors**
   - Type mismatches
   - Invalid token usage

### Error Format
```
Error: Type mismatch: expected Integer token, got boolean at line 3, column 15
```

All errors include:
- Clear description
- Line number
- Column number
- Context

## Design Principles

1. **Zero Dependencies**: Pure JavaScript implementation
2. **Type Safety**: Strict type validation at parse time
3. **Clear Errors**: Descriptive error messages with location
4. **Bidirectional**: Parse and serialize with fidelity
5. **Extensible**: Easy to add new token types
6. **Performance**: Single-pass lexing and parsing

## Performance Characteristics

- **Time Complexity**: O(n) where n is input size
- **Space Complexity**: O(n) for token storage
- **Single Pass**: Lexer and parser each make one pass
- **No Backtracking**: Predictive parsing

## Testing Strategy

1. **Unit Tests**: Test each component independently
2. **Integration Tests**: Test full parsing pipeline
3. **Round-trip Tests**: Parse → Serialize → Parse
4. **Error Tests**: Validate error handling
5. **Edge Cases**: Empty objects, nested structures, comments

## Future Enhancements

Potential additions:
- Environment variable interpolation
- Include/import statements
- Schema validation
- TypeScript type definitions
- CLI tool for validation
- VS Code extension with syntax highlighting
- Online playground
- Performance benchmarks

## File Structure

```
toon-config/
├── src/
│   ├── index.js       # Main entry point
│   ├── lexer.js       # Tokenizer
│   ├── parser.js      # Parser + Validator
│   ├── serializer.js  # Object → TOON
│   └── loader.js      # File I/O
├── test/
│   └── basic.test.js  # Test suite
├── samples/
│   ├── config.toon    # Sample configs
│   ├── database.toon
│   └── advanced.toon
└── examples/
    └── usage.js       # Usage examples
```

## Repository

GitHub: [atharvabaodhankar/toon-config](https://github.com/atharvabaodhankar/toon-config)

## Contributing

See individual component files for detailed implementation notes and inline documentation.

## Author

Created by [@op_athu_17](https://www.npmjs.com/~op_athu_17)
