(kind) => {
 const text=e=>(e?.innerText ?? e?.textContent ?? '').trim();
 const money=s=>{const m=s.replace(/,/g,'').match(/-?\$?\s*(\d+(?:\.\d{2})?)/);if(!m)throw Error('Missing financial amount');return Number(m[1]);};
 if(kind==='summary'){
  const root=document.querySelector('.ProjectFinancials');if(!root)throw Error('Missing financial summary');
  const rows=[...root.querySelectorAll('.FinancialSummaryRow')];
  const amount=label=>money(text(rows.find(x=>text(x.querySelector('.FinancialSummaryRowLabel'))===label)?.querySelector('span[dir=ltr]')));
  return {revisedPrice:money(text(root.querySelector('[data-testid="jpsHeaderCompactCard-value"]'))),originalPrice:money(text(root.querySelector('[data-testid="Original price"] span[dir=ltr]'))),tax:money(text(root.querySelector('[data-testid="Tax"] span[dir=ltr]'))),totalPaid:amount('Total paid'),remainingToPay:amount('Remaining to pay'),nextPaymentText:text(root.querySelector('.NextPaymentWrapper'))};
 }
 if(kind==='schedule')return [...document.querySelectorAll('[data-testid="agGridScheduleList"] [role=row][row-id]')].map(r=>{
  const cells=Object.fromEntries([...r.querySelectorAll('[role=gridcell][col-id]')].map(c=>[c.getAttribute('col-id'),text(c)]));
  const a=r.querySelector('[col-id=title] a');const sourceId=a?.getAttribute('href')?.match(/\/Schedule\/(\d+)\//)?.[1];if(!sourceId)throw Error('Missing stable schedule ID');
  const cb=r.querySelector('[col-id=completed] input[type=checkbox]');
  return {sourceId,...cells,completed:cb?cb.checked:null,sourcePath:a.getAttribute('href')};
 });
 if(kind==='photos')return [...document.querySelectorAll('[data-testid]')].filter(e=>/^file-card-\d+$/.test(e.dataset.testid)).map(e=>{
  const img=e.querySelector('img');return {sourceId:e.dataset.testid.split('-').pop(),name:img?.alt||'',previewUrl:img?.getAttribute('src')||'',details:text(e),imageType:'preview'};
 });
 if(kind==='dailyLogs')return [...document.querySelectorAll('[id^="daily-log-list-item-"]')].map(e=>({sourceId:e.id.replace('daily-log-list-item-',''),dateLabel:text(e.querySelector('[data-testid=DailyLogTitleLink]')),author:text(e.querySelector('[data-testid^="DailyLogAddedByPill-"]')),notes:text(e.querySelector('[data-testid^="notes-"]')),details:text(e)}));
 if(kind==='invoices')return [...document.querySelectorAll('[data-testid]')].filter(e=>/^entity-\d+$/.test(e.dataset.testid)).map(e=>({sourceId:e.dataset.testid.replace('entity-',''),...Object.fromEntries([...e.querySelectorAll('[data-testid^="cell-"]')].map(c=>[c.dataset.testid.replace('cell-',''),text(c)]))}));
 throw Error('Unknown adapter');
}
