# Deploy FormulaM JS to GitHub Pages

## New repository setup

Recommended repository name:

```text
FormulaM-js
```

Commit this folder at the repository root. The root must contain:

```text
index.html
src/
data/masses.json
logo.svg
favicon.svg
.nojekyll
```

## Local preview

```bash
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000/
```

## Branch-based GitHub Pages

1. Open repository **Settings**.
2. Open **Pages**.
3. Select **Deploy from a branch**.
4. Choose `main` and `/root`.
5. Save.

## GitHub Actions Pages

A workflow is included at:

```text
.github/workflows/pages.yml
```

To use it:

1. Open repository **Settings → Pages**.
2. Set source to **GitHub Actions**.
3. Push to `main`.

The workflow uploads the whole repository as a static site.

## Common problems

### The app says it cannot load `masses.json`

Check that this file exists:

```text
data/masses.json
```

Also make sure the site is served over HTTP, not opened with `file://`.

### Module import error

Serve the repository root, not the `src/` folder.

### Search is slow

Tighten element bounds. Formula enumeration is combinatorial, so broad bounds can become expensive in the browser.
