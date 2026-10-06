# Kairos Legacy Homes — Investor Portal v1.2 (Render-ready)

This package is ready to deploy as a Node.js web service on Render and includes **project-specific Excel schedule import plus full administrator editing controls**.


## New: full Admin editing

The Admin Center now allows individual editing and deletion across the project record:

- **Project details** — name, address, assigned client, status, start date, target date, total budget, invested amount, completion %, and summary.
- **Construction phases** — add, edit, or delete each phase; change phase code, name, start/finish dates, duration, and progress %.
- **Project photos** — add, edit metadata, change date/phase/title, optionally replace the image, or delete a photo.
- **Expenses** — add, edit, or delete each expense, including category, amount, date, vendor/payee, and notes. The invested total is recalculated from the expense ledger when expenses are changed.
- **Client logins** — edit client name/email, optionally reset password, change project access assignments, or delete the login.
- **Projects** — create, edit, and delete entire projects. Deleting a project also removes its assignment from client accounts.

Admins can also edit phases directly from the **Schedule > List** view, edit/delete photos directly from the **Photos** page, and edit/delete expenses directly from the **Investment** page.

Existing browser data from the previous version is migrated automatically so older expenses receive internal IDs and remain editable.

## New: Excel construction schedule sync

From **Admin Center**:

1. Select the project you want to update.
2. Click **Import Excel** / **Update from Excel**.
3. Choose that project's `.xlsx` or `.xls` schedule.
4. Review the detected phases and dates in the preview.
5. Choose either:
   - **Replace schedule with spreadsheet** — recommended when the spreadsheet is the authoritative schedule.
   - **Merge / update matching phase codes** — updates matching phase codes and keeps unmatched portal phases.
6. Leave **Update project start, target completion, and completion %** checked if you want the project-level dates and completion to be recalculated automatically.
7. Click **Import schedule**.

The importer supports the spreadsheet structure supplied for this project:

- `ID #`
- `Title`
- `Complete`
- `Duration`
- `Start`
- `End`

It also detects common alternate names such as `Phase`, `Task`, `Start Date`, and `Finish Date`.

A phase title such as `300- Driveway - Pouring` is imported as:

- Phase code: `300`
- Phase name: `Driveway - Pouring`

`Complete = TRUE` becomes 100% complete. Incomplete phases are classified as **Upcoming**, **In progress**, or **Past due** based on their dates. Project completion is calculated using phase durations so longer phases have proportionally more weight.

A generic workbook is included in this package:

`Kairos_Construction_Schedule_Template.xlsx`

The Admin Center also provides a **Template** button to download it.

The last schedule import can be undone from the selected project's Admin Center.

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
2. Upload **all files from this folder to the root of your GitHub repository**.
3. In Render, choose **New + > Blueprint**.
4. Connect the repository.
5. Render will detect `render.yaml`.
6. Approve the service creation and deploy.

### Alternative: New Web Service

Use:

- Runtime: **Node**
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/health`

The server binds to Render's `PORT` environment variable automatically.

## Local test

```bash
npm install
npm start
```

Then open `http://localhost:10000`.

Health check: `http://localhost:10000/health`

## Excel parser

The browser uses SheetJS to read `.xlsx` and `.xls` files. The page loads the library from cdnjs with a jsDelivr fallback. The spreadsheet is parsed in the administrator's browser; the workbook itself is not uploaded to this Node server in this prototype.

## Important persistence / security note

This remains the Render-ready prototype architecture from the previous version. Users, projects, imported schedule data, budgets, expenses, and uploaded photos are stored in browser `localStorage`.

That means:

- Excel import works immediately for the selected project in that browser.
- Different project schedules remain logically segregated inside the app.
- Data is **not yet synchronized between different devices or browsers**.
- The current demo authentication is not production-grade authentication.

For real investor use across devices, move authentication and project data to PostgreSQL/Supabase (or another server database) with project-level authorization and private object storage for images/documents.
