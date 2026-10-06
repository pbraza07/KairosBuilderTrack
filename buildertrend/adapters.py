import re, time
from pathlib import Path
EXTRACT = (Path(__file__).parent / 'extract.js').read_text()

def read(page, kind):
    return page.evaluate(EXTRACT, kind)

def scroll_step(page, selector, reset=False):
    return page.evaluate('''({selector,reset})=>{
      const root=document.querySelector(selector);if(!root)throw Error('Missing scroll container');
      const nodes=[root,...root.querySelectorAll('*')];let p=root.parentElement;
      while(p){nodes.push(p);p=p.parentElement;}
      const candidates=nodes.filter(e=>e.clientHeight>0 && e.scrollHeight>e.clientHeight+5 && /auto|scroll/.test(getComputedStyle(e).overflowY));
      const el=candidates[0]||document.scrollingElement;
      const before=el.scrollTop;el.scrollTop=reset?0:before+Math.max(100,el.clientHeight*0.65);
      return {top:el.scrollTop,height:el.scrollHeight,bottom:el.scrollTop+el.clientHeight>=el.scrollHeight-3};
    }''', {'selector':selector,'reset':reset})

def collect_scrolling(page, kind, selector, expected=None):
    records={};scroll_step(page,selector,True);page.wait_for_timeout(350)
    stable=0;old=None
    for _ in range(600):
        for item in read(page,kind):records[item['sourceId']]=item
        pos=scroll_step(page,selector);page.wait_for_timeout(400)
        state=(len(records),pos['height'],pos['top'])
        stable=stable+1 if state==old and pos['bottom'] else 0;old=state
        if stable>=8:
            if expected is not None and len(records)!=expected:raise RuntimeError(f'{kind}: expected {expected}, collected {len(records)}. Capture refused.')
            return list(records.values())
    raise RuntimeError(kind+': scrolling did not finish within safety limit')

def schedule(page):
    footer=page.locator('[data-testid=SchedulePagingBottom]')
    prev=footer.locator('li[title="Previous Page"]')
    for _ in range(100):
        if prev.get_attribute('aria-disabled')=='true':break
        old=footer.locator('.range').inner_text();prev.locator('button').click()
        page.wait_for_function('(old)=>document.querySelector("[data-testid=SchedulePagingBottom] .range").innerText!==old',arg=old)
    else:raise RuntimeError('Unable to return to first schedule page')
    records={};total=None
    for _ in range(100):
        before=footer.locator('.range').inner_text()
        nums=list(map(int,re.findall(r'\d+',before.replace(',',''))))
        if len(nums)!=3:raise RuntimeError('Unrecognized schedule pagination')
        first,last,currentTotal=nums
        if total is None:total=currentTotal
        if total!=currentTotal:raise RuntimeError('Schedule changed during capture; retry')
        rows=collect_scrolling(page,'schedule','[data-testid=agGridScheduleList]',last-first+1 if total else 0)
        for row in rows:records[row['sourceId']]=row
        nxt=footer.locator('li[title="Next Page"]')
        if nxt.get_attribute('aria-disabled')=='true':break
        nxt.locator('button').click()
        page.wait_for_function('(old)=>document.querySelector("[data-testid=SchedulePagingBottom] .range").innerText!==old',arg=before)
        page.wait_for_timeout(500)
    else:raise RuntimeError('Schedule page limit exceeded')
    if len(records)!=total:raise RuntimeError('Incomplete schedule; previous data preserved')
    return {'records':list(records.values()),'expectedCount':total,'coverage':'All rows in the active schedule view; current filters apply'}

def capture(page,section,project):
    page.goto(section['url'],wait_until='domcontentloaded',timeout=45000)
    from urllib.parse import urlparse
    if urlparse(page.url).hostname != 'buildertrend.net':raise RuntimeError('Unexpected redirect; sign in again')
    page.locator(section['ready_selector']).first.wait_for(state='visible',timeout=30000)
    if page.locator('input[type=password]').count():raise RuntimeError('Sign in again with --login')
    if project['verifyText'] not in page.locator('body').inner_text():raise RuntimeError('Wrong project selected; capture refused')
    kind=section['name']
    if kind=='summary':return {'fields':read(page,kind),'coverage':'Summary financial cards'}
    if kind=='schedule':return schedule(page)
    records=collect_scrolling(page,kind,section['ready_selector'])
    result={'records':records,'coverage':'Loaded records after scrolling; active filters apply; completeness requires live review'}
    if kind=='photos':
        from urllib.parse import urlparse,parse_qs
        for item in records:
            q=parse_qs(urlparse(item['previewUrl']).query)
            if q.get('jobId')!=[project['sourceId']]:raise RuntimeError('Photo belongs to a different project')
        result['coverage']='Daily Logs photo folder only; preview links, not original files'
    if kind=='invoices':result['coverage']='Invoices tab only; credit memos, deposits and attachments excluded'
    return result
