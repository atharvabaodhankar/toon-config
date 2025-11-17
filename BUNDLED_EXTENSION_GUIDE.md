# TOON Config - Bundled VS Code Extension Guide

## 📦 What's Bundled?

The TOON Config npm package now includes a VS Code extension that provides syntax highlighting for `.toon` files!

## 🎯 How It Works

When users install your npm package:

```bash
npm install toon-config
```

The `postinstall` script automatically:
1. Detects if VS Code is installed
2. Copies the extension to `~/.vscode/extensions/`
3. Activates syntax highlighting for `.toon` files

## 📁 Project Structure

```
toon-config/
├── src/                          # Main npm package
│   ├── index.js
│   ├── lexer.js
│   ├── parser.js
│   ├── serializer.js
│   └── loader.js
├── vscode-extension/             # VS Code extension (bundled)
│   ├── syntaxes/
│   │   └── toon.tmLanguage.json # Syntax grammar
│   ├── language-configuration.json
│   ├── package.json             # Extension manifest
│   ├── README.md
│   ├── CHANGELOG.md
│   └── icon.png
├── scripts/
│   └── install-extension.js     # Auto-install script
└── package.json                 # Main package (includes postinstall)
```

## 🚀 Publishing Workflow

### 1. Publish to npm (includes extension)
```bash
npm publish
```

This publishes the npm package WITH the bundled extension.

### 2. Publish to VS Code Marketplace (optional)
```bash
cd vscode-extension
npm install -g @vscode/vsce
vsce package
vsce publish
```

This makes the extension available separately on the VS Code Marketplace.

## 💡 Benefits of Bundling

### For Users:
✅ One command installs everything (`npm install toon-config`)
✅ No need to search for and install a separate extension
✅ Syntax highlighting works immediately
✅ Better developer experience

### For You:
✅ Higher adoption rate (no friction)
✅ Single version to maintain
✅ Everything in one repo
✅ Easier to keep in sync

## 🎨 What Users Get

After installing `toon-config`, users automatically get:

**Syntax Highlighting:**
- Keywords (`OBJ`, `LIST`) in blue
- Types (`STR`, `INT`, `FLOAT`, `BOOL`) in purple
- Strings in green
- Numbers in orange
- Booleans in yellow
- Comments in gray

**Editor Features:**
- Auto-closing brackets `()`
- Auto-closing quotes `""`
- Line comments with `##`
- Smart indentation

## 🔄 Update Workflow

When you release a new version:

1. Update version in both:
   - `package.json` (main)
   - `vscode-extension/package.json`

2. Update changelogs:
   - `CHANGELOG.md` (main)
   - `vscode-extension/CHANGELOG.md`

3. Publish to npm:
   ```bash
   npm publish
   ```

4. (Optional) Publish extension separately:
   ```bash
   cd vscode-extension
   vsce publish
   ```

## 📊 Real-World Examples

Other packages that bundle VS Code extensions:

- **Prisma** - Database ORM with syntax highlighting
- **Tailwind CSS** - CSS framework with IntelliSense
- **GraphQL** - Query language with syntax support
- **MDX** - Markdown with JSX support

## 🐛 Troubleshooting

### Extension not installing?
- Check if VS Code is installed: `code --version`
- Manually install: Copy `vscode-extension/` to `~/.vscode/extensions/toon-vscode-1.0.0/`
- Reload VS Code: `Ctrl+Shift+P` → "Reload Window"

### Syntax highlighting not working?
- Reload VS Code window
- Check file extension is `.toon`
- Check extension is enabled: Extensions panel → Search "TOON"

### Want to disable auto-install?
Users can skip postinstall:
```bash
npm install toon-config --ignore-scripts
```

## 📈 Marketing This Feature

**In your README:**
> ✨ Includes VS Code syntax highlighting out of the box!

**In your npm description:**
> A modern configuration engine with built-in VS Code support

**On social media:**
> No need to install a separate extension - syntax highlighting comes bundled! 🎨

## 🎯 Next Steps

1. ✅ Extension is bundled and ready
2. 📦 Publish to npm (already done!)
3. 🎨 (Optional) Create a custom icon for the extension
4. 📢 (Optional) Publish to VS Code Marketplace separately
5. 🌟 Market the "batteries included" approach

## 🔗 Links

- npm package: https://www.npmjs.com/package/toon-config
- GitHub repo: https://github.com/atharvabaodhankar/toon-config
- VS Code Marketplace: (publish separately to get this link)

---

**You now have a complete, professional package with built-in tooling support!** 🎉
