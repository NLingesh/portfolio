# Favicon Setup Instructions

To match the premium dark red and black color theme (`#ff4d5e` and `#050505`) of your developer portfolio, follow these instructions to generate and set up your favicon files.

## 1. Generate Favicon Assets

You can generate a complete set of favicon files using an online generator such as **[Favicon.io](https://favicon.io/)** or **[RealFaviconGenerator](https://realfavicongenerator.net/)**:

1. Use your profile initials or a relevant developer icon (like a console terminal or brain `</>`, `LN`, `[L]`).
2. Set the primary color to match your accent red: `#ff4d5e`.
3. Set the background to match your canvas dark color: `#050505` (or make it transparent).
4. Download the generated package containing:
   - `favicon.ico` (standard size: 16x16 / 32x32 / 48x48)
   - `favicon-32x32.png`
   - `favicon-16x16.png`
   - `apple-touch-icon.png`
   - `site.webmanifest` (optional)

## 2. Place Assets in the Project

Move the generated files into the following project folders:

- **Root Directory (`portfolio/`)**:
  - `favicon.ico`

- **Icons Asset Directory (`portfolio/assets/icons/`)**:
  - `favicon-32x32.png`
  - `favicon-16x16.png`
  - `apple-touch-icon.png`

## 3. Verify HTML Tags

The modern meta and link tags are already configured in `index.html` as follows:

```html
<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/icons/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/icons/apple-touch-icon.png">
```
These tags use **relative paths** to ensure the favicons load perfectly when hosted on GitHub Pages (e.g. `nlingesh.github.io/assets/icons/...`).
