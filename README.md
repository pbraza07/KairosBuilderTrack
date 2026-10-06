# Kairos Legacy Homes — Investor Project Portal (Prototype)

A responsive, browser-based prototype inspired by the core client transparency workflow of construction platforms such as Buildertrend, but with an original Kairos Legacy Homes interface.

## What is included

- Separate administrator and investor/client logins
- Project-level access segregation
- Client project overview
- Gantt-style construction schedule + list view
- Project photo gallery
- Budget / amount-invested dashboard
- Admin center for:
  - creating client accounts
  - creating/editing projects
  - assigning a client to a project
  - adding construction phases
  - uploading project-specific photos
  - adding project expenses
- Responsive desktop/mobile layout
- Browser-local persistence for demonstration purposes

## Demo credentials

**Admin**
- Email: `admin@kairoslegacyhomes.com`
- Password: `Kairos2026!`

**Investor**
- Email: `investor1@demo.com`
- Password: `Investor1!`

## Run locally

Open `index.html` in a browser. For the smoothest experience, serve the folder with any small local web server, for example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Important production note

This prototype deliberately uses browser storage so it can be tested without a server. It is **not production authentication** and should not be used for real client data as-is.

A production deployment should replace local browser persistence with:

- Managed authentication (Supabase Auth, Auth0, Clerk, or Firebase Auth)
- PostgreSQL database with row-level security / tenant isolation
- Private object storage for project photos and documents
- Signed URLs for media
- Admin audit logs
- Password reset / MFA
- Email notifications
- Role-based permissions
- Encrypted backups

## Suggested production data model

- `users`
- `projects`
- `project_members`
- `schedule_items`
- `project_photos`
- `expenses`
- `change_orders`
- `documents`
- `updates`
- `audit_log`

The most important security rule is that every read and write is authorized by `project_id` membership, not just hidden in the UI.
