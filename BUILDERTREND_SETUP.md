# Kairos v1.11 — installation and first refresh

## What this release fixes

The configured five-page adapter replaces the empty pages.json from v1.10. It reads summary finances, paginated/virtualized schedule rows, Daily Logs photo-folder metadata/previews, daily logs, and the Invoices tab. It stores the results separately from manual Kairos project records and displays them in Admin Center → Buildertrend → View imported data. Contract price is not substituted for Kairos construction budget. Invoice balances are separate from contract balances. No accounts, approvals or manual records are deleted or overwritten.

The current project is 6020 SW 127th Ave Rd, observed source job ID 45571488. Future project data can be stored separately by ID, but automatic project discovery/switching is NOT implemented. The worker refuses configurations with multiple projects until switching is verified. Active Buildertrend filters apply. Credit memos, deposits, other photo folders, original photos, file attachments and comments inside details are not included. Preview links may require a Buildertrend login. This release does not claim all-account completeness.

## Upgrade — Windows and Render

1. Stop your worker with Ctrl+C. Extract this ZIP to a new folder.
2. Upload the application files to the same GitHub repository that backs your existing Render service. Keep your current DATABASE_URL and database. Deploy the latest commit. Do not upload .venv, data, or buildertrend/.private-profile.
3. Keep your newly rotated BUILDERTREND_WORKER_TOKEN set in Render. Use the same new key locally. Do not reuse the key exposed in the screenshot.
4. Open PowerShell in the new folder containing server.js and buildertrend. Run these commands separately:

   python -m venv .venv
   .\.venv\Scripts\python.exe -m pip install -r .\buildertrend\requirements.txt
   .\.venv\Scripts\python.exe -m playwright install chromium

5. Run .\.venv\Scripts\python.exe .\buildertrend\worker.py --login. Sign in directly in the opened browser, complete MFA and select 6020 SW 127th Ave Rd. Open its Summary page, then return to PowerShell and press Enter. Credentials are entered in Buildertrend, not Kairos. You may alternatively move your existing private profile after stopping the old worker, but logging in fresh is simpler.
6. Set the connection values in PowerShell:

   $env:BUILDERTREND_WORKER_TOKEN = 'YOUR_NEW_KEY'
   $env:KAIROS_PORTAL_URL = 'https://kairosbuildertrack.onrender.com'

7. Start .\.venv\Scripts\python.exe .\buildertrend\worker.py
8. In Kairos, sign in as administrator. Open Admin Center → Buildertrend → Refresh from Buildertrend. Keep the computer awake and PowerShell open. The worker prints the section it is collecting.
9. Click Check status. Once captured, click View imported data. Expand the finances, schedule, invoices, daily logs and photos sections.
10. Verify the schedule count against the live Buildertrend count (your sample showed 112), and check financial amounts, log counts and photo counts. Photos show preview links; original files are not downloaded. Captured means the configured collection succeeded, not that every feature in Buildertrend was imported.

## If a refresh fails

The last successful capture is preserved. Read the worker's local message. Wrong project selected: repeat --login and select the configured project. Sign-in expired: repeat --login. Incomplete schedule: verify filters and pagination, retry after the source stops changing, then send the non-secret error if it continues. Missing locator or timeout: send the section name and updated page markup. Worker request failed: verify the Render deployment, website URL and matching worker tokens. A crashed running job is eligible for recovery after ten minutes.

## Security and operating behavior

The private browser profile lives inside buildertrend/.private-profile and contains sensitive session cookies. Do not upload, share, or commit it. Prefer a local folder outside OneDrive for the worker/profile. The worker only navigates pages, scrolls and clicks schedule paging controls; it never approves, pays, edits or deletes Buildertrend records. No MFA/CAPTCHA bypass. No undocumented API probing. There is one worker and one currently selected project. Captures are admin-only. Run refresh again to collect later changes. There is no recurring timer beyond checking the refresh queue.

## Validation

JavaScript/Python syntax, supplied HTML structures, scrolling accumulation, deduplication and incomplete-count unit checks, and local API permission/validation/persistence checks were run. A live Buildertrend session was not available here. The first live refresh remains necessary to verify page loading and completeness. Do not treat source fixture counts as guarantees of current counts.
