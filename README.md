# Warrior Protocol — GitHub Pages Deployment

## One-time setup (5 minutes)

### 1. Install Node.js (if you don't have it)
Download from https://nodejs.org — pick the LTS version.

### 2. Create a GitHub account + new repo
- Go to https://github.com and sign in (or create an account)
- Click the **+** → **New repository**
- Name it exactly: `warrior-app`
- Set it to **Public**
- Click **Create repository** (don't add README)

### 3. Put your app code in
- Open `src/App.jsx` in any text editor
- Replace the entire contents with your warrior app JSX
  - Make sure it ends with: `export default function App() { ... }`
  - If your component has a different name like `WarriorPlan`, rename it to `App`

### 4. Edit package.json
- Open `package.json`
- Find this line:
  `"homepage": "https://YOUR_GITHUB_USERNAME.github.io/warrior-app"`
- Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username

### 5. Edit vite.config.js (only if you named the repo differently)
- If your repo is NOT named `warrior-app`, change `/warrior-app/` to `/your-repo-name/`

---

## Deploy (every time you want to update)

Open a terminal in this folder and run:

```bash
npm install          # first time only
npm run deploy
```

That's it. After ~30 seconds your app is live at:
`https://YOUR_GITHUB_USERNAME.github.io/warrior-app`

---

## First-time GitHub setup (only needed once)
If you've never used git on your machine:

```bash
git init
git add .
git commit -m "initial"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/warrior-app.git
git push -u origin main
npm run deploy
```

---

## To update the app later
1. Replace `src/App.jsx` with the new JSX from Claude
2. Run `npm run deploy`
3. Done — live in 30 seconds

---

## Troubleshooting
- **Blank page after deploy**: Check that `base: '/warrior-app/'` in vite.config.js matches your repo name exactly
- **"gh-pages not found"**: Run `npm install` first
- **Permission error**: Make sure your GitHub repo is set to Public
