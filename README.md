# 🎯 TOON Config

A modern configuration engine using **Token-Oriented Object Notation (TOON)** — a clean, type-safe alternative to YAML and JSON.

## Why TOON?

- ✅ **Type-safe tokens** with built-in validation
- ✅ **Better error messages** than YAML/JSON
- ✅ **Human-readable** syntax
- ✅ **Zero dependencies**
- ✅ **Comments support** using `##`
- ✅ **Bidirectional** — parse TOON or generate it from JS objects

## Installation

```bash
npm install toon-config
```

## Quick Start

### 1. Create a `.toon` config file

```toon
## config.toon
OBJ(
   STR(appName, "Polystudi"),
   BOOL(debug, true),
   INT(port, 3001),
   LIST(modules, "auth", "api", "db"),
   OBJ(database,
      STR(host, "localhost"),
      INT(port, 27017),
      STR(user, "admin")
   )
)
```

### 2. Load it in your app

```javascript
import { loadConfig } from 'toon-config';

const config = await loadConfig('./config.toon');

console.log(config.appName);  // "Polystudi"
console.log(config.port);     // 3001
console.log(config.database.host);  // "localhost"
```

## API Reference

### `loadConfig(filePath)`

Asynchronously load and parse a `.toon` file.

```javascript
const config = await loadConfig('./config.toon');
```

### `loadConfigSync(filePath)`

Synchronously load and parse a `.toon` file.

```javascript
import { loadConfigSync } from 'toon-config';
const config = loadConfigSync('./config.toon');
```

### `parseString(toonString)`

Parse a TOON string directly.

```javascript
import { parseString } from 'toon-config';

const config = parseString(`
OBJ(
   STR(name, "MyApp"),
   INT(port, 3000)
)
`);
```

### `stringifyTOON(object, indent)`

Convert a JavaScript object to TOON format.

```javascript
import { stringifyTOON } from 'toon-config';

const toonString = stringifyTOON({
  appName: "Web3 Notes",
  debug: false,
  port: 8080
});

console.log(toonString);
```

Output:
```toon
OBJ(
   STR(appName, "Web3 Notes"),
   BOOL(debug, false),
   INT(port, 8080)
)
```

## TOON Syntax

### Supported Tokens

| Token | Type | Example |
|-------|------|---------|
| `STR` | String | `STR(name, "value")` |
| `INT` | Integer | `INT(count, 42)` |
| `FLOAT` | Float | `FLOAT(price, 19.99)` |
| `BOOL` | Boolean | `BOOL(enabled, true)` |
| `LIST` | Array | `LIST("a", "b", "c")` |
| `OBJ` | Object | `OBJ(STR(key, "val"))` |

### Comments

Use `##` for single-line comments:

```toon
## This is a comment
OBJ(
   STR(name, "test")  ## inline comment
)
```

### Nested Objects

```toon
OBJ(
   STR(appName, "MyApp"),
   OBJ(database,
      STR(host, "localhost"),
      INT(port, 5432),
      OBJ(credentials,
         STR(user, "admin"),
         STR(password, "secret")
      )
   )
)
```

### Lists

```toon
LIST("auth", "api", "db")
LIST(1, 2, 3, 4, 5)
LIST(true, false, true)
```

## Type Safety

TOON validates types at parse time:

```javascript
// ❌ This will throw an error
parseString('INT(value, true)');
// Error: Type mismatch: expected Integer token, got boolean
```

```javascript
// ✅ This works
parseString('INT(value, 42)');
```

## Error Messages

TOON provides clear, actionable error messages:

```
Type mismatch: expected Integer token, got boolean at line 3, column 15
```

```
Unterminated string at line 5, column 8
```

## Testing

Run the test suite:

```bash
npm test
```

## Use Cases

- Application configuration files
- Environment-specific settings
- API endpoint definitions
- Feature flags
- Database connection configs
- Build tool configurations

## Comparison

| Feature | TOON | JSON | YAML |
|---------|------|------|------|
| Type-safe | ✅ | ❌ | ❌ |
| Comments | ✅ | ❌ | ✅ |
| Human-readable | ✅ | ⚠️ | ✅ |
| Clear errors | ✅ | ❌ | ❌ |
| Bidirectional | ✅ | ✅ | ⚠️ |

## Repository

GitHub: [atharvabaodhankar/toon-config](https://github.com/atharvabaodhankar/toon-config)

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR on GitHub.

## Author

Created by [@op_athu_17](https://www.npmjs.com/~op_athu_17)

---

Made with ❤️ for better config management
