# Premium AI/ML Engineer & Backend Developer Portfolio

A production-ready, highly interactive developer portfolio featuring a premium dark red and black glassmorphic design system. Built using optimized vanilla HTML5, CSS3, and JavaScript, and pre-configured for automated deployment to GitHub Pages.

---

## 🚀 Live Demo
Once deployed, the portfolio will be available at:  
**`https://<your-github-username>.github.io/`**

---

## 🎨 Design & Features

- **Premium Dark Mode Aesthetic**: Visual layout utilizing a deep, custom dark red and black palette (`#ff4d5e` / `#050505`) with subtle background gradient blobs and cursor-tracking radial glow.
- **Micro-Interactions & Audio Feedback**: Incorporates magnetic CTAs, 3D card tilt effects, custom mouse cursors, and an optional Web Audio API audio-synthesizer feedback loop.
- **Interactive Terminal Simulator**: A realistic, non-blocking asynchronous shell terminal showcasing machine learning model training and server initialization.
- **Dynamic Neural Net Canvas**: Real-time canvas particle simulation generating an animated network of connected AI nodes that respond to pointer movement.
- **Fully Responsive & Fluid**: Grid layouts that adapt automatically to Mobile, Tablet, Laptop, and Ultra-wide Desktop displays.
- **Modern Performance & SEO**: Uses script deferring, lazy-loaded images, proper semantic wrappers, Open Graph tags, canonical pointers, sitemap, and robots configurations.
- **Accessibility Oriented (A11y)**: Incorporates keyboard navigation attributes (`tabindex`, custom `:focus-visible` focus rings, keydown listener support) and ARIA hidden icon declarations.

---

## 🛠️ Tech Stack

- **Markup & Structure**: HTML5 (Semantic elements)
- **Styling & Layout**: CSS3 (Vanilla CSS variables, Flexbox, Grid, Keyframe Animations)
- **Logic & Interactions**: JavaScript (Vanilla ES6, HTML5 Canvas, Web Audio API, Intersection Observer API)
- **Icons**: Lucide Icons
- **Deployment Pipeline**: GitHub Actions & GitHub Pages

---

## 📂 Project Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment automation
├── assets/
│   ├── images/                 # Theme layouts, profile imagery
│   ├── icons/                  # Custom favicons, utility vector packs
│   ├── screenshots/            # Showcase images (mockup previews)
│   ├── fonts/                  # Custom typography files (optional)
│   └── resume.pdf              # Professional PDF resume download link
├── 404.html                    # Dark red styled page-not-found route
├── favicon_instructions.md     # Favicon assets generation guide
├── index.html                  # Main semantic HTML structure
├── README.md                   # Project documentation
├── robots.txt                  # Search engine crawl directives
├── script.js                   # Extracted and optimized micro-interactions
├── sitemap.xml                 # Search index sitemap XML schema
└── style.css                   # Extracted premium glassmorphic stylesheet
```

---

## ⚙️ Installation & Local Development

No compilers or build environments are necessary. You can run the project locally with standard browser environments.

### Prerequisite
It is recommended to run a simple HTTP server locally to support ES6 module loads and proper audio context initialization.

### Running the Project

1. Clone or download the folder repository.
2. Open terminal in the `portfolio/` directory.
3. Start a local server:
   - **Python 3**:
     ```bash
     python3 -m http.server 8000
     ```
   - **Node.js (`npx`)**:
     ```bash
     npx serve
     ```
4. Access the site in your browser at: `http://localhost:8000` or `http://localhost:3000`.

---

## ⚙️ Customization Guide

- **Resume**: Overwrite `assets/resume.pdf` with your updated professional resume.
- **Colors**: To modify the color scheme, edit the CSS variables in the `:root` block of `style.css`:
  ```css
  :root {
    --bg: #050505;
    --primary: #ff4d5e;
    --secondary: #ff7a85;
    /* ... */
  }
  ```
- **Terminal Messages**: To change the simulated shell messages, edit the `logs` array at the top of `script.js`.
- **Statistics**: Update the numerical targets for project counts in `index.html` on the statistics container using `data-target="YOUR_NUMBER"`.

---

## 🌐 GitHub Pages Deployment

### Option 1: Automated Deployment (Recommended)
This project is configured with a GitHub Actions workflow:
1. Initialize a Git repository inside the `portfolio/` directory:
   ```bash
   git init
   git add .
   git commit -m "feat: portfolio init"
   ```
2. Create a repository on GitHub and link it:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. Go to your repository settings on GitHub -> **Pages**.
4. Under **Build and deployment**, select **GitHub Actions** as the source.
5. The pipeline configured in `.github/workflows/deploy.yml` will run automatically and deploy your site to Pages.

### Option 2: Classic Deployment
1. Push the project files to a branch (e.g., `main`).
2. Go to repository settings on GitHub -> **Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the branch `main` and root directory `/` (root), then click **Save**.

---

## 📄 License
This portfolio is licensed under the MIT License. See [LICENSE](LICENSE) for details.
