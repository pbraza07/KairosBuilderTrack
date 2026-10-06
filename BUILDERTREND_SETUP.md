# Kairos v1.10 — Buildertrend capture foundation

This release adds an administrator Refresh from Buildertrend button, a durable job queue, a local Playwright worker, capture status, and JSON capture download. It does NOT yet update Kairos schedules, financials, photos, or accounts. All-data scraping cannot be claimed until your signed-in pages, pagination, attachments and field mappings have been verified. A successful job is labeled captured, not synchronized. Existing Kairos records remain intact.

## Setup on Render and your computer

1. Deploy this portal release using your existing Render service and DATABASE_URL. Keep your existing database. Do not reset it.
2. Generate a random worker token, for example with `python -c "import secrets; print(secrets.token_urlsafe(48))"`. Set BUILDERTREND_WORKER_TOKEN in the Render service's Environment. This is a dedicated sync secret, not your Buildertrend password.
3. On your Windows computer install Python 3.11 or later. Open PowerShell in the extracted portal folder.
4. Run `python -m venv .venv`, then `.\.venv\Scripts\Activate.ps1`, then `pip install -r buildertrend/requirements.txt`, then `python -m playwright install chromium`.
5. Run `python buildertrend/worker.py --login`. Sign in directly in the opened Buildertrend browser using your personal credentials, complete MFA, open the Summary, then press Enter in PowerShell. Login state stays in buildertrend/.private-profile on this computer. Protect this folder like a password; never upload it or commit it.
6. Configure buildertrend/pages.json with each explicit project/section URL, a verified ready_selector unique to the signed-in page, and content_selector selecting the data containers. Example shape (selectors must be obtained from your actual page):

   [{"name":"project-6020-summary","url":"https://buildertrend.net/app/Owner/Summary","ready_selector":"REPLACE_WITH_VERIFIED_SIGNED_IN_SELECTOR","content_selector":"REPLACE_WITH_VERIFIED_DATA_SELECTOR"}]

   The shipped list is intentionally empty; no Buildertrend selectors or project IDs have been invented. Ensure each URL opens the correct project independently. Do not rely on an implicit last-selected project. Capture covers visible containers only. Virtualized tables, pagination, photos, documents and hidden details need separate verified adapters.
7. Set the same token locally in PowerShell: `$env:BUILDERTREND_WORKER_TOKEN = 'YOUR_GENERATED_TOKEN'` and `$env:KAIROS_PORTAL_URL = 'https://YOUR-EXISTING-PORTAL.onrender.com'`. Keep secrets out of screenshots, source files and chat.
8. Run `python buildertrend/worker.py`. Keep the computer awake and worker running. Sign into Kairos as administrator, open Admin Center and click Refresh from Buildertrend. Click Check status for updates and Download capture to inspect the result.
9. If the session expires, stop the worker, repeat step 5 and restart. The worker does not bypass MFA/CAPTCHA and does not click submit/edit controls in Buildertrend. It navigates configured pages and reads visible text only.

## Completing full synchronization

For each accessible project and module, verify stable source IDs, pagination and completeness. Define explicit source-to-Kairos project mappings and typed mappings for task dates/progress, budgets and photos. Preview differences before enabling imports. Use source IDs for idempotent updates, preserve Kairos client approvals and local edits, and never delete records because a scrape omitted them. Do not infer spent amounts from text or assign clients by name alone. Server-side database access belonging to Buildertrend is not available through this worker.

To finish this adapter, provide the accessible section names and redacted screenshots/export samples of their fields, including pagination and project selector. A supervised signed-in inspection can identify selectors. Do not send your password.

## Operational limits

One worker is supported. Jobs are reclaimed after a 10-minute lease; old completions are rejected. Capture is capped at 5 MB and keeps the previous successful snapshot on failure. This is an on-demand capture queue, not a recurring scheduler. No network response harvesting is enabled. The browser session on your computer is independent of a normal Chrome login and independent of Render. Only administrators may request or download captures; the worker token can only claim and finish sync jobs. Rotate the token to revoke the worker.

Verified locally: JavaScript/Python syntax and job endpoint behavior. Live Buildertrend extraction has not been tested against your account.
