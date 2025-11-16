# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-16

### Added
- Initial release of TOON Config
- Lexer for tokenizing TOON format
- Parser for converting TOON to JavaScript objects
- Serializer for converting JavaScript objects to TOON
- File loader with sync and async support
- Type validation for all TOON tokens (STR, INT, FLOAT, BOOL, LIST, OBJ)
- Comment support using `##`
- Comprehensive test suite
- Example files and usage documentation
- Zero dependencies

### Features
- `loadConfig(filePath)` - Async config loading
- `loadConfigSync(filePath)` - Sync config loading
- `parseString(toonString)` - Parse TOON strings
- `stringifyTOON(object)` - Convert JS objects to TOON
- Support for nested objects and lists
- Clear error messages with line and column numbers
- Type-safe token validation

[1.0.0]: https://github.com/atharvabaodhankar/toon-config/releases/tag/v1.0.0
