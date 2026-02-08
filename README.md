# CoreKind Aaron Douglas Institute — Prompt Library

A prompt library for everyday and creative use, plus business prompts. Built with React and Vite.

- **Everyday & Creative:** Organize your week, write messages you’ve been avoiding, brainstorm side projects, build a simple site, define your mission.
- **Business:** Clarify your idea, design your presence, build something real, make it inclusive, communicate.
- Context lives in a drawer; prompt cards expand/collapse. Night/day theme; mobile-friendly.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Deploy to GitHub (and GitHub Pages)

1. **Create a repo on GitHub**  
   Create a new repository (e.g. `prompt_library`). Don’t add a README or .gitignore if you’re pushing this folder.

2. **Match the base path (if needed)**  
   If your repo name is not `prompt_library`, edit `.github/workflows/deploy.yml` and set `VITE_BASE_PATH` to `"/your-repo-name/"`. Also update `base` in `vite.config.js` if you build locally for production.

3. **Push the code**

   ```bash
   cd prompt_library
   git add .
   git commit -m "Initial commit: CoreKind Aaron Douglas Institute prompt library"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/prompt_library.git
   git push -u origin main
   ```

4. **Turn on GitHub Pages**  
   In the repo: **Settings → Pages**. Under “Build and deployment”, set **Source** to **GitHub Actions**. After the first push, the “Deploy to GitHub Pages” workflow will run and your site will be at `https://YOUR_USERNAME.github.io/prompt_library/`.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build (output in `dist/`)
- `npm run preview` — preview production build locally
