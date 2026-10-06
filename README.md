# Kairos Legacy Homes — Investor Project Portal v1.5

This version fixes the previous browser-only login limitation. Client accounts and project data now use a shared server data layer. When `DATABASE_URL` is configured, the portal stores that shared data in PostgreSQL, so a client created on the Admin computer can sign in from a phone, tablet, or another computer.

Passwords are not stored in the browser after synchronization and are stored server-side as salted scrypt hashes.

## IMPORTANT: one-time migration for the account you already created

Your older version saved users/projects only inside the browser where you created them. After deploying v1.5:

1. Use the SAME desktop/browser where you originally created `pbraza@gmail...`.
2. Open the newly deployed Render portal.
3. Sign in as Admin.
4. If the shared database is new, the portal automatically migrates the old browser users, projects, schedules, photos, and expenses into shared storage.
5. Wait for the message that cloud migration completed.
6. Then open the same Render URL on the phone and sign in with the client's email and password.

Do not clear the old Admin browser's site data before completing this first migration.

## Best deployment: Render Blueprint

The included `render.yaml` creates both:

- the Node web service, and
- a Render PostgreSQL database connected as `DATABASE_URL`.

In Render choose **New + → Blueprint**, connect the GitHub repo, and deploy.

The Blueprint currently uses Render's Free Postgres plan for testing. Render's free PostgreSQL databases are temporary and currently expire after 30 days. Upgrade the database before using this as a long-term production portal.

## If you already have a Render Web Service

You can keep the existing service:

1. Replace the repository files with this version and push to GitHub.
2. In Render choose **New + → PostgreSQL** and create a database.
3. In the database's Render page, copy/connect its internal connection string to the web service as environment variable `DATABASE_URL`.
4. Redeploy the web service.
5. On the original Admin browser, sign in once so the previous local data is migrated.

Web-service settings remain:

- Runtime: Node
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/health`

## Why the database matters

A Render Free Web Service has an ephemeral filesystem and can lose local files when it spins down, restarts, or redeploys. The portal therefore prefers PostgreSQL whenever `DATABASE_URL` exists. Without PostgreSQL it falls back to a local JSON file for local development only.

## Existing features retained

- Separate client/project access
- Project overview dashboard
- Gantt and list schedule views
- Excel schedule import/update
- Individual phase editing
- Photo add/edit/delete
- Expense add/edit/delete
- Project/client account editing
- Shared cross-device logins and project data


## v1.5 — Construction phase categories + automatic expense totals

### Automatic broader construction categories
Every schedule phase is now assigned to a broader construction category such as **Pre-Construction, Design & Permitting**, **Foundation & Underground**, **Structure & Framing**, **MEP Rough-In & Utilities**, **Interior Finishes**, **Site Improvements & Landscaping**, and **Final Inspections & Turnover**.

- Excel imports auto-categorize each phase from its phase code/title.
- Existing projects are categorized automatically when loaded.
- Gantt and List views group phases under category headers.
- Admins can override the category when editing any individual phase.
- The importer preview shows the detected category before the schedule is applied.

### Expense behavior
When an expense is added, its amount is automatically added to both **Approved Project Budget** and **Invested to Date**. Editing an expense adjusts both totals by the difference, and deleting an expense reverses that amount.

The **Spend by category** visualization also aggregates multiple expense entries with the same category into one category total.

## v1.4 — Individual phase editing + automatic photo optimization

### Edit any construction phase
Administrators can edit each construction phase independently from **Schedule → List** or **Admin Center → Project phases**. The editor supports phase code/name, start and finish dates, progress percentage, duration, responsible trade/contractor, and phase notes. Changes sync to shared storage and become visible to the assigned client.

### Storage-optimized construction photos
New photo uploads are optimized **in the browser before they are synchronized to Render/PostgreSQL**. This reduces network use and database/storage consumption without requiring the admin to resize photos manually.

Default optimization policy:
- Maximum long edge: **1,600 px**
- Preferred output: **WebP** (JPEG fallback)
- Target size: approximately **350 KB per photo**
- Quality floor: **56%** before dimensions are reduced further
- Soft maximum: approximately **650 KB** for unusually detailed images
- The upload dialog shows the original size, optimized size, percentage saved, and final pixel dimensions.

Older photos remain compatible. Replacing a legacy photo through Edit will automatically optimize the replacement.

> For a very large production photo archive (thousands of images), object storage such as S3/R2/Supabase Storage is still preferable to storing image payloads inside the portal database. This version substantially reduces the footprint of the current shared-storage architecture.
