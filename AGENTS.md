# Rags Auto - Development Guidelines

**CRITICAL: NO-BUILD ARCHITECTURE**

This project uses a "No-Build" architecture.
- **DO NOT** run `npm install`.
- **DO NOT** create a `package.json`.
- **DO NOT** use Vite, Webpack, or any bundler.
- **DO NOT** write JSX. Use `React.createElement` (or the `h` helper in `app.js`).

## Stack
- **HTML5**: Entry point `index.html`.
- **React**: Loaded via CDN (esm.sh) in `index.html`.
- **Tailwind**: Loaded via CDN script in `index.html`.
- **ES Modules**: `app.js` is the main entry point, `content.js` holds data.

## Workflow
To run the app, simply serve the directory with a static file server (e.g., `python3 -m http.server`).
Files are served directly to the browser.
