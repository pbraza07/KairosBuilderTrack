"""Read-only, explicit-page capture. No speculative API calls or field mapping."""
import argparse, json, os, time
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen
from playwright.sync_api import sync_playwright

BASE = Path(__file__).resolve().parent
PROFILE = BASE / '.private-profile'

def allowed(value):
    u = urlparse(value)
    return u.scheme == 'https' and u.hostname == 'buildertrend.net' and not u.username and not u.password

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--login', action='store_true')
    args = parser.parse_args()
    PROFILE.mkdir(mode=0o700, exist_ok=True)
    os.chmod(PROFILE, 0o700)
    with sync_playwright() as pw:
        context = pw.chromium.launch_persistent_context(str(PROFILE), headless=not args.login, accept_downloads=False)
        page = context.new_page()
        if args.login:
            page.goto('https://buildertrend.net/app/Owner/Summary')
            input('Sign in in the browser, complete MFA, and open your summary. Press Enter here when finished: ')
            context.close()
            return
        config = json.loads((BASE / 'pages.json').read_text())
        if not config or any(not allowed(x['url']) or not x.get('ready_selector') for x in config):
            raise ValueError('Configure explicit Buildertrend URLs and verified ready selectors in pages.json.')
        names = [x['name'] for x in config]
        if len(set(names)) != len(names):
            raise ValueError('Section names must be unique.')
        portal = os.environ['KAIROS_PORTAL_URL'].rstrip('/')
        if urlparse(portal).scheme != 'https' and urlparse(portal).hostname not in ('localhost', '127.0.0.1'):
            raise ValueError('Use HTTPS for your Kairos portal.')
        token = os.environ['BUILDERTREND_WORKER_TOKEN']
        if len(token) < 32:
            raise ValueError('Worker token must contain at least 32 characters.')
        def api(route, body):
            req = Request(portal + '/api/buildertrend/' + route, data=json.dumps(body).encode(), headers={'Authorization':'Bearer '+token,'Content-Type':'application/json'}, method='POST')
            with urlopen(req, timeout=30) as response:
                return json.load(response)
        while True:
            try:
                job = api('claim', {}).get('job')
                if job:
                    try:
                        sections = {}
                        for section in config:
                            page.goto(section['url'], wait_until='domcontentloaded', timeout=45000)
                            if not allowed(page.url) or 'login' in page.url.lower():
                                raise RuntimeError('Session expired')
                            page.locator(section['ready_selector']).wait_for(state='visible', timeout=20000)
                            if page.locator('input[type=password]').count():
                                raise RuntimeError('Sign-in required')
                            # Capture only explicitly configured visible containers.
                            container = page.locator(section['content_selector'])
                            container.first.wait_for(state='visible', timeout=15000)
                            content = container.all_inner_texts()
                            if not any(x.strip() for x in content):
                                raise RuntimeError('Empty capture')
                            sections[section['name']] = {'url':section['url'], 'capturedAt':time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), 'visibleText':content, 'coverage':'Configured visible containers only; pagination and attachments not included.'}
                        api('result', {'job':job, 'sections':sections})
                        print('Capture saved. Field mapping is still required for operational data updates.')
                    except Exception:
                        api('result', {'job':job, 'error':True})
                        print('Capture failed; previous capture preserved. Verify selectors and session.')
            except Exception:
                print('Worker request failed. Check connectivity and worker token.')
            time.sleep(15)

if __name__ == '__main__':
    main()
