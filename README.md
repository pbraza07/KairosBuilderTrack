# Kairos Legacy Homes — Investor Project Portal v2.9

## v2.9 — Investor-focused login experience

- Removed all visible demo/access credential information from the login page.
- Reworked the landing-page message around investor confidence, transparency, capital visibility, approvals, and construction milestones.
- Updated the secure-login description so the page presents as a production investor portal rather than a technical/demo interface.
- Updated the Overview-page subtitle to emphasize capital deployed, budget position, approvals, milestones, and current project progress.
- English and Brazilian Portuguese display text were updated together.

## v1.9 — Complete bilingual display coverage

This release expands the English / Brazilian Portuguese language switcher across the full portal. In Portuguese mode, navigation, dashboards, schedule labels, Gantt/list views, admin tables, Excel synchronization messages, investment/budget helper text, approvals/history, and the standard construction phase names from the Kairos Excel schedule are translated for display.

The original project data remains stored exactly as entered/imported. Changing PT/EN only changes how supported construction terminology is displayed, so switching back to English never rewrites the underlying schedule. Future spreadsheet phase names also receive best-effort construction-term translation when they use common terminology.

## Critical data-persistence fix in v1.8

The previous releases could fall back to a JSON file inside the Render web-service container when `DATABASE_URL` was not configured. Render can restart/sleep/recreate that container, so browser-created clients and projects could appear to disappear after the service restarted.

**v1.8 removes that risk:**

- On Render, the portal will **refuse to accept logins/writes without durable storage** instead of silently saving to an ephemeral file.
- Connect a PostgreSQL database and set `DATABASE_URL` on the Web Service.
- Normal Admin saves are now **non-destructive merges**: a stale browser cannot erase a client, project, phase, photo, or expense simply because that record is missing from its local copy.
- Actual deletions use a dedicated authenticated Admin deletion endpoint and only run after the Admin clicks a Delete control and confirms it.
- Excel **Replace Schedule** remains an explicit human action and is the only normal save operation allowed to replace all phases for the selected project.
- PostgreSQL keeps a rolling server-side backup history (up to 250 snapshots) for additional recovery protection.
- A deletion audit is retained in server metadata.

### Required Render setup

If you deployed through `render.yaml` / Blueprint, `DATABASE_URL` is wired automatically to the included PostgreSQL database. If you created the Web Service manually, open **Render → your Web Service → Environment** and add `DATABASE_URL` using the connection string from your PostgreSQL database.

Do **not** set `ALLOW_EPHEMERAL_STORAGE=true` in production. That override exists only for temporary development/testing.

The health endpoint now reports `persistentStorage` and `writeProtection`, so `/health` can be checked before entering live client data.

---


This version fixes the previous browser-only login limitation. Client accounts and project data now use a shared server data layer. When `DATABASE_URL` is configured, the portal stores that shared data in PostgreSQL, so a client created on the Admin computer can sign in from a phone, tablet, or another computer.

Passwords are not stored in the browser after synchronization and are stored server-side as salted scrypt hashes.

## IMPORTANT: one-time migration for the account you already created

Your older version saved users/projects only inside the browser where you created them. After deploying v1.8:

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




## v1.7 — English / Brazilian Portuguese language switcher

- A compact **Brazilian flag (PT)** and **U.S. flag (EN)** now appear in the upper-right area of the portal, including the login screen.
- Select the Brazilian flag to switch the portal interface to **Brazilian Portuguese**.
- Select the U.S. flag to switch back to **English**.
- The selected language is remembered on that browser/device.
- Navigation, dashboard labels, schedules, financial screens, admin controls, modals, approval workflow, photo controls, Excel-import instructions, statuses, dates, and common system messages are localized.
- Dates and USD currency formatting follow the selected interface locale.
- User-entered project names, custom notes, vendor names, photo titles, and spreadsheet phase names remain exactly as entered so the language switch does not modify or overwrite project records. System construction-category labels are translated for display while their stored values remain unchanged.

## v1.6 — Photo lightbox/download + client expense approvals

### Project photo viewer
- Click or tap any project photo to open a full-screen viewer.
- Use the on-screen arrows, keyboard Left/Right arrows, or the close control to navigate the gallery.
- Every photo can be downloaded from the viewer; gallery cards also include a download control.
- The download is the optimized stored copy, preserving the storage-saving photo policy from v1.4.

### Client expense approval workflow
- When an administrator adds an expense to a project that has an assigned client, the expense is marked **Pending client approval**.
- The client receives an in-portal notification badge and can choose **Approve** or **Not approve**, with an optional comment.
- The same approval controls are available in the Investment page.
- Editing an expense requests client approval again.
- Approval/non-approval decisions are processed server-side so a client can only decide expenses for projects assigned to that account.
- Expense requests, edits, approvals, non-approvals, and deletions are recorded in the **Expense approval history** inside the project.
- The client portal refreshes shared state periodically and whenever the app returns to the foreground, so new approval requests appear without requiring a new login.

### Financial behavior
Per the requested Kairos workflow, adding an expense still immediately increases both **Approved Project Budget** and **Invested to Date**. Client approval is tracked as a separate project decision/audit status and does not remove the recorded cost. Deleting an expense reverses its amount from both totals.

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

## v2.1 schedule visualization
- Added a category color legend to the Gantt schedule.
- Added Monthly and Weekly schedule views.
- Monthly columns are weighted by the number of days in each month so day-level bar placement aligns more closely with calendar dates.
- Weekly view uses Monday-Sunday blocks and displays ISO week numbers.
- Phase bars retain category colors and precise day-based start/end positioning.

## v2.2 schedule bar update
- Phase bars now display the planned duration in days inside each bar.
- Completed = lime green, Current = bright yellow, Past due = bright red, Upcoming = bright orange.
- Category colors remain on category headers/chips so schedule grouping remains visually distinct.


## v2.4 Front-page phase window
The Overview page now shows the 10 phases immediately preceding the active phase, the current phase, and the next upcoming phase, in chronological order. This keeps the dashboard focused on recent work and what happens next instead of always showing the first phases in the project.


## v2.9 browser quota fix
- PostgreSQL/server state remains authoritative.
- Browser localStorage now keeps only a lightweight cache and never stores base64 construction-photo payloads.
- If an older browser cache is already full, the app automatically replaces it with a compact cache.
- A local browser cache quota error can no longer block a successful login or cloud save.


## v2.9 ROI Projection
Adds an investor-facing ROI Projection tab with editable sale-price, private-loan payoff, seller transaction costs, equity basis, a fixed 10% Kairos partner/coordinator commission on positive profit, sale-proceeds waterfall, projected investor net profit, cash returned, and ROI. Admin assumptions persist to the shared database; investor what-if edits remain session-only.


## v2.9 changes
- ROI defaults: Closing / title / escrow = 2% of projected sale price.
- ROI defaults: Documentary stamp / transfer taxes = 1% of projected sale price.
- Schedule List and Admin phase Status badges now use the same bright status colors as the Overview phase list: completed lime green, current bright yellow, past due bright red, upcoming bright orange.


## v2.9 Photo calendar enhancements
- Project photos are grouped by the exact calendar day selected during upload.
- Administrators can add another photo directly to an existing day group and the upload form is prefilled with that date.
- Editing a photo date automatically moves it to the correct calendar-day group.
- Photo cards display a calendar date badge.
- The full-screen viewer sorts photos by calendar date and prominently updates the date whenever Previous/Next is used.
