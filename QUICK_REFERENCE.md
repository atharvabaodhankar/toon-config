# TOON Config Quick Reference

## Installation
```bash
npm install toon-config
```

## Basic Usage

### Load Config File
```javascript
import { loadConfig } from 'toon-config';
const config = await loadConfig('./config.toon');
```

### Parse String
```javascript
import { parseString } from 'toon-config';
const config = parseString('OBJ(STR(name, "test"))');
```

### Generate TOON
```javascript
import { stringifyTOON } from 'toon-config';
const toon = stringifyTOON({ name: "test", port: 3000 });
```

## TOON Syntax

### String
```toon
STR(name, "value")
STR(description, "Multi-word string")
```

### Integer
```toon
INT(port, 3000)
INT(count, 42)
INT(negative, -10)
```

### Float
```toon
FLOAT(price, 19.99)
FLOAT(rate, 0.05)
```

### Boolean
```toon
BOOL(enabled, true)
BOOL(debug, false)
```

### List
```toon
LIST("item1", "item2", "item3")
LIST(1, 2, 3, 4, 5)
LIST(true, false, true)
```

### Object
```toon
OBJ(
   STR(key1, "value1"),
   INT(key2, 42),
   BOOL(key3, true)
)
```

### Nested Object
```toon
OBJ(
   STR(appName, "MyApp"),
   OBJ(database,
      STR(host, "localhost"),
      INT(port, 5432)
   )
)
```

### List in Object
```toon
OBJ(
   STR(name, "MyApp"),
   LIST(modules, "auth", "api", "db")
)
```

### Comments
```toon
## This is a comment
OBJ(
   STR(name, "test")  ## inline comment
)
```

## Common Patterns

### Application Config
```toon
OBJ(
   STR(appName, "MyApp"),
   STR(version, "1.0.0"),
   INT(port, 3000),
   BOOL(debug, false)
)
```

### Database Config
```toon
OBJ(
   STR(host, "localhost"),
   INT(port, 5432),
   STR(database, "mydb"),
   OBJ(credentials,
      STR(user, "admin"),
      STR(password, "secret")
   )
)
```

### Feature Flags
```toon
OBJ(
   BOOL(enableAuth, true),
   BOOL(enableCache, false),
   BOOL(betaFeatures, false)
)
```

## Error Handling

```javascript
try {
  const config = await loadConfig('./config.toon');
} catch (error) {
  console.error('Failed to load config:', error.message);
}
```

## Type Validation

TOON validates types at parse time:

```javascript
// ❌ This throws an error
parseString('INT(value, true)');
// Error: Type mismatch: expected Integer token, got boolean

// ✅ This works
parseString('INT(value, 42)');
```

## API Reference

### `loadConfig(filePath: string): Promise<object>`
Asynchronously load and parse a .toon file.

### `loadConfigSync(filePath: string): object`
Synchronously load and parse a .toon file.

### `parseString(toonString: string): object`
Parse a TOON string and return JavaScript object.

### `stringifyTOON(object: object, indent?: number): string`
Convert JavaScript object to TOON format string.

## Tips

1. Use comments (`##`) to document your config
2. Keep nesting levels reasonable (max 3-4 levels)
3. Use meaningful key names
4. Group related settings in nested objects
5. Use LIST for arrays of similar items
6. Validate your config after loading
7. Use type-specific tokens (INT, BOOL) for better validation

## Examples

See the `samples/` directory for more examples:
- `simple.toon` - Basic configuration
- `config.toon` - Application configuration
- `database.toon` - Database settings
- `advanced.toon` - Complex nested structure

## Links

- GitHub: [atharvabaodhankar/toon-config](https://github.com/atharvabaodhankar/toon-config)
- npm: [@op_athu_17](https://www.npmjs.com/~op_athu_17)
