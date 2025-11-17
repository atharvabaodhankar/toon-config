# TOON Language Support for VS Code

Syntax highlighting and language support for TOON (Token-Oriented Object Notation) configuration files.

## Features

✨ **Syntax Highlighting** - Beautiful color coding for `.toon` files
💬 **Comment Support** - Line comments with `##`
🎨 **Token Colors** - Distinct colors for keywords, types, strings, numbers, and booleans
🔧 **Auto-closing** - Automatic closing of brackets and quotes
📝 **Smart Indentation** - Proper indentation support

## Installation

### From VS Code Marketplace
1. Open VS Code
2. Press `Ctrl+P` (or `Cmd+P` on Mac)
3. Type: `ext install op_athu_17.toon-vscode`
4. Press Enter

### From npm package
If you've installed `toon-config` via npm, the extension is automatically available:

```bash
npm install toon-config
```

## Usage

Simply open any `.toon` file and enjoy syntax highlighting!

## Example

```toon
## Sample TOON Configuration File
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

## Color Scheme

- **Keywords** (`OBJ`, `LIST`) - Control flow color (blue)
- **Types** (`STR`, `INT`, `FLOAT`, `BOOL`) - Type color (purple)
- **Strings** - String color (green)
- **Numbers** - Number color (orange)
- **Booleans** - Constant color (yellow)
- **Comments** - Comment color (gray)

## Related

- [toon-config npm package](https://www.npmjs.com/package/toon-config)
- [GitHub Repository](https://github.com/atharvabaodhankar/toon-config)

## Support

Found a bug or have a feature request? [Open an issue](https://github.com/atharvabaodhankar/toon-config/issues)

## Author

Created by [@op_athu_17](https://www.npmjs.com/~op_athu_17)

## License

MIT
