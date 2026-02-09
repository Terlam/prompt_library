# CoreKind Aaron Douglas Prompt Library

A prompt library for **everyday and creative use** and **business** contexts. Set your context in a drawer, pick a prompt, then copy and paste into your AI assistant (e.g. ChatGPT, Claude). Built with React and Vite.

## Features

- **Everyday & Creative:** Organize your week, write messages you’ve been avoiding, brainstorm side projects, build a simple site, define your mission.
- **Business:** Clarify your idea, design your presence, build something real, make it inclusive, communicate.
- **Context drawer:** Fill topic, goal, audience, tone, and constraints; prompts use your context to replace placeholders like `[topic]` and `[goal]`.
- **UX:** Expand/collapse prompt cards, night/day theme, mobile-friendly layout, clear “Context” CTA, and short how-to instructions.
- **Accessibility:** Semantic HTML, keyboard and screen reader support, focus trap in the context panel, reduced-motion respect for animations.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build and preview

```bash
npm run build   # output in dist/
npm run preview # preview production build locally
```

## Deploy to GitHub Pages

1. **Create a repo on GitHub**  
   Create a new repository (e.g. `prompt_library`). Don’t add a README or .gitignore if you’re pushing this folder.

2. **Match the base path (if needed)**  
   If your repo name is not `prompt_library`, edit `.github/workflows/deploy.yml` and set `VITE_BASE_PATH` to `"/your-repo-name/"`. Also update `base` in `vite.config.js` if you build locally for production.

3. **Push the code**

   ```bash
   cd prompt_library
   git add .
   git commit -m "Initial commit: CoreKind Aaron Douglas Prompt Library"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/prompt_library.git
   git push -u origin main
   ```

4. **Turn on GitHub Pages**  
   In the repo: **Settings → Pages**. Under “Build and deployment”, set **Source** to **GitHub Actions**. After the first push, the workflow will run and the site will be at `https://YOUR_USERNAME.github.io/prompt_library/`.

### Link shares (Open Graph / Twitter)

The app includes a meta description and Open Graph / Twitter Card meta tags so link previews show a title, description, and image. The share image is `public/screenGrab.png` (a screenshot of the app). Meta tags use the path `/screenGrab.png`. If you deploy to a **subpath** (e.g. GitHub Pages project at `https://user.github.io/repo/`), crawlers may need an **absolute** image URL. In that case, set `og:image` and `twitter:image` in `index.html` to your full URL (e.g. `https://YOUR_USERNAME.github.io/prompt_library/screenGrab.png`).

## Scripts

| Command           | Description                    |
|-------------------|--------------------------------|
| `npm run dev`     | Start dev server               |
| `npm run build`   | Production build (output: `dist/`) |
| `npm run preview` | Preview production build      |

---

Built in partnership with [Aaron Douglas LLC](https://aarondouglas.us) and [Core Kind](https://corekind.com).
