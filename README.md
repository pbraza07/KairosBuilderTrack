# Kairos Legacy Homes — Investor Portal (Render-ready)

This package is ready to run as a Node.js web service on Render.

## Demo credentials

**Administrator**
- Email: `admin@kairoslegacyhomes.com`
- Password: `Kairos2026!`

**Investor**
- Email: `investor1@demo.com`
- Password: `Investor1!`

## Deploy to Render

### Recommended: GitHub + Render Blueprint
1. Extract this ZIP.
2. Create a new GitHub repository and upload **all files from this folder to the repository root**.
3. In Render, choose **New + > Blueprint**.
4. Connect the GitHub repository.
5. Render will detect `render.yaml`.
6. Approve the service creation and deploy.
7. Open the generated `https://...onrender.com` URL.

### Alternative: New Web Service
1. Create a **New Web Service** in Render and connect the repository.
2. Runtime: **Node**.
3. Build command: `npm install`
4. Start command: `npm start`
5. Health check path: `/health`
6. Deploy.

The server binds to Render's `PORT` environment variable and `0.0.0.0`, so no manual port configuration is required.

## Local test

```bash
npm install
npm start
```

Then open `http://localhost:10000`.

Health check: `http://localhost:10000/health`

## Important security / persistence note

This is still a front-end prototype. It uses browser localStorage for demo users, projects, budgets, phases, expenses, and uploaded images. That means data is tied to the browser/device where it was entered. It is not yet a production authentication/database layer.

For true multi-user use across devices, the next version should use server-side authentication, PostgreSQL/Supabase, project-level authorization, and private cloud photo storage.
