const STORE_KEY = 'kairos_portal_v1';
const SESSION_KEY = 'kairos_session_v1';

const svgIcon = (name) => {
  const icons = {
    home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/><path d="M9.5 20v-6h5v6"/></svg>',
    schedule:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>',
    photos:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m5 18 5-5 3 3 2-2 4 4"/></svg>',
    money:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M15 8.5c-.7-.8-1.7-1.2-3-1.2-1.7 0-3 1-3 2.4 0 3.6 6 1.6 6 4.6 0 1.4-1.2 2.4-3 2.4-1.4 0-2.6-.5-3.4-1.5M12 5.7v12.6"/></svg>',
    admin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 4.5 6v5c0 4.7 2.8 8.2 7.5 10 4.7-1.8 7.5-5.3 7.5-10V6L12 3Z"/><path d="M9.5 12 11 13.5l3.5-4"/></svg>',
    bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>',
    menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
    user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg>',
    upload:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M5 13v6h14v-6"/></svg>',
    file:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></svg>',
    edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20h4l11-11-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/></svg>',
    trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="m7 7 1 13h8l1-13"/><path d="M10 11v5M14 11v5"/></svg>'
  }; return icons[name] || '';
};

const sampleSvg = (title, subtitle, tones=['#d8dedb','#6e7c76','#15382f']) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="650" viewBox="0 0 900 650">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${tones[0]}"/><stop offset="1" stop-color="${tones[1]}"/></linearGradient></defs>
  <rect width="900" height="650" fill="url(#g)"/><rect x="0" y="450" width="900" height="200" fill="#b9b0a2"/>
  <path d="M200 455V250L450 110l250 140v205" fill="#f5f4ef" stroke="${tones[2]}" stroke-width="14"/>
  <path d="M170 260 450 90l280 170" fill="none" stroke="${tones[2]}" stroke-width="24" stroke-linecap="round"/>
  <rect x="365" y="315" width="170" height="140" fill="#7d6754"/><rect x="245" y="305" width="90" height="90" fill="#a9c5cf" stroke="${tones[2]}" stroke-width="8"/><rect x="565" y="305" width="90" height="90" fill="#a9c5cf" stroke="${tones[2]}" stroke-width="8"/>
  <circle cx="770" cy="105" r="52" fill="#e9cb7c" opacity=".85"/><text x="35" y="55" fill="#ffffff" font-family="Arial" font-size="30" font-weight="700">${title}</text><text x="35" y="90" fill="#f0f5f2" font-family="Arial" font-size="18">${subtitle}</text></svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
};

const seed = {
  users:[
    {id:'u-admin',name:'Plinio Alves',email:'admin@kairoslegacyhomes.com',password:'Kairos2026!',role:'admin',projectIds:['p-001','p-002']},
    {id:'u-001',name:'Michael & Sarah Carter',email:'investor1@demo.com',password:'Investor1!',role:'client',projectIds:['p-001']},
    {id:'u-002',name:'Daniel Brooks',email:'investor2@demo.com',password:'Investor2!',role:'client',projectIds:['p-002']}
  ],
  projects:[
    {id:'p-001',name:'Stonegate Ranch Residence',address:'Wesley Chapel, FL',clientId:'u-001',status:'In Construction',start:'2026-08-18',target:'2027-02-12',budget:485000,invested:268450,completion:58,lastUpdate:'2026-10-04',summary:'A modern Florida residence progressing through exterior enclosure and rough-in trades.',
      tasks:[
        {id:'t1',code:'100',name:'Permitting & Mobilization',start:'2026-08-18',end:'2026-08-29',progress:100,status:'done'},
        {id:'t2',code:'200',name:'Sitework & Foundation',start:'2026-09-01',end:'2026-09-18',progress:100,status:'done'},
        {id:'t3',code:'300',name:'Framing & Structural',start:'2026-09-19',end:'2026-10-12',progress:78,status:'current'},
        {id:'t4',code:'340',name:'Electrical Rough-In',start:'2026-10-08',end:'2026-10-23',progress:30,status:'current'},
        {id:'t5',code:'350',name:'HVAC Rough-In',start:'2026-10-13',end:'2026-10-28',progress:0,status:'upcoming'},
        {id:'t6',code:'400',name:'Insulation & Drywall',start:'2026-10-29',end:'2026-11-22',progress:0,status:'upcoming'},
        {id:'t7',code:'460',name:'Interior Finishes',start:'2026-11-23',end:'2027-01-17',progress:0,status:'upcoming'},
        {id:'t8',code:'500',name:'Finals & Turnover',start:'2027-01-18',end:'2027-02-12',progress:0,status:'upcoming'}],
      photos:[
        {id:'ph1',title:'Foundation Complete',date:'2026-09-18',phase:'Sitework & Foundation',url:sampleSvg('Foundation Complete','Sep 18, 2026',['#bcc4bf','#8d8171','#15382f'])},
        {id:'ph2',title:'First-Floor Framing',date:'2026-09-26',phase:'Framing & Structural',url:sampleSvg('First-Floor Framing','Sep 26, 2026',['#d8dedb','#739083','#17372f'])},
        {id:'ph3',title:'Roof Trusses Set',date:'2026-10-04',phase:'Framing & Structural',url:sampleSvg('Roof Trusses Set','Oct 04, 2026',['#c7d3ce','#657d72','#17372f'])}
      ],
      expenses:[
        {cat:'Land / Acquisition',amount:95000},{cat:'Foundation',amount:53500},{cat:'Framing',amount:64750},{cat:'MEP Rough-In',amount:28700},{cat:'Windows / Exterior',amount:26500}
      ]
    },
    {id:'p-002',name:'Magnolia Ridge Build',address:'Spring Hill, FL',clientId:'u-002',status:'Pre-Construction',start:'2026-10-20',target:'2027-04-30',budget:412000,invested:62500,completion:14,lastUpdate:'2026-10-01',summary:'Pre-construction planning, procurement, and permitting for a clean contemporary single-family home.',
      tasks:[
        {id:'x1',code:'100',name:'Design & Engineering',start:'2026-09-15',end:'2026-10-15',progress:90,status:'current'},
        {id:'x2',code:'120',name:'Permitting',start:'2026-10-01',end:'2026-10-24',progress:40,status:'current'},
        {id:'x3',code:'200',name:'Sitework & Foundation',start:'2026-10-26',end:'2026-11-18',progress:0,status:'upcoming'},
        {id:'x4',code:'300',name:'Framing',start:'2026-11-19',end:'2026-12-18',progress:0,status:'upcoming'},
        {id:'x5',code:'500',name:'Interiors & Finals',start:'2027-01-10',end:'2027-04-30',progress:0,status:'upcoming'}],
      photos:[{id:'xph1',title:'Lot Survey & Stakeout',date:'2026-10-01',phase:'Pre-Construction',url:sampleSvg('Lot Survey & Stakeout','Oct 01, 2026',['#dde2df','#8b9a93','#203e35'])}],
      expenses:[{cat:'Land / Acquisition',amount:48000},{cat:'Design & Engineering',amount:9500},{cat:'Permits / Fees',amount:5000}]
    }
  ]
};

let state = loadState();
let session = loadSession();
let currentView = 'overview';
let selectedProjectId = null;
let scheduleMode = 'gantt';

function deepClone(x){ return JSON.parse(JSON.stringify(x)); }
function normalizeState(raw){
  const data=raw && typeof raw==='object'?raw:deepClone(seed);
  data.users=Array.isArray(data.users)?data.users:[];
  data.projects=Array.isArray(data.projects)?data.projects:[];
  data.users.forEach(u=>{ if(!Array.isArray(u.projectIds))u.projectIds=[]; });
  data.projects.forEach(p=>{
    p.tasks=Array.isArray(p.tasks)?p.tasks:[];
    p.photos=Array.isArray(p.photos)?p.photos:[];
    p.expenses=Array.isArray(p.expenses)?p.expenses:[];
    p.tasks=p.tasks.map(t=>({...t,id:t.id||uid('t'),code:t.code??'',name:t.name||'Untitled phase',progress:Number(t.progress)||0,duration:Number(t.duration)||daysBetweenInclusive(t.start,t.end)}));
    p.photos=p.photos.map(ph=>({...ph,id:ph.id||uid('ph'),title:ph.title||'Project photo',date:ph.date||todayISO(),phase:ph.phase||'',url:ph.url||''}));
    p.expenses=p.expenses.map(e=>({...e,id:e.id||uid('ex'),cat:e.cat||'Other',amount:Number(e.amount)||0,date:e.date||'',vendor:e.vendor||'',notes:e.notes||''}));
  });
  return data;
}
function loadState(){ try{ return normalizeState(JSON.parse(localStorage.getItem(STORE_KEY)) || deepClone(seed)); } catch { return normalizeState(deepClone(seed)); } }
function saveState(){ localStorage.setItem(STORE_KEY,JSON.stringify(state)); }
function loadSession(){ try{return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || null}catch{return null} }
function saveSession(){ sessionStorage.setItem(SESSION_KEY,JSON.stringify(session)); }
function money(n){ return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(Number(n||0)); }
function fmtDate(s){ if(!s)return '—'; return new Date(s+'T12:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}); }
function initials(name){return name.split(/\s|&/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase()}
function toast(msg){ const t=document.getElementById('toast'); t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200); }
function uid(prefix='id'){ return prefix+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7); }
function todayISO(){ const d=new Date(); const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0'); return `${y}-${m}-${day}`; }
function taskStatus(t){
  if(Number(t.progress)>=100 || t.status==='done') return 'done';
  if(Number(t.progress)>0) return 'current';
  const today=todayISO();
  if(t.start && t.end && today>t.end) return 'overdue';
  if(t.start && (!t.end || today<=t.end) && today>=t.start) return 'current';
  return 'upcoming';
}
function taskStatusLabel(t){ return ({done:'Complete',current:'In progress',overdue:'Past due',upcoming:'Upcoming'})[taskStatus(t)] || 'Upcoming'; }
function taskStatusClass(t){ return ({done:'status-done',current:'status-live',overdue:'status-overdue',upcoming:'status-plan'})[taskStatus(t)] || 'status-plan'; }
function daysBetweenInclusive(start,end){ if(!start||!end)return 1; const a=new Date(start+'T12:00:00'),b=new Date(end+'T12:00:00'); return Math.max(1,Math.round((b-a)/86400000)+1); }
function scheduleCompletion(tasks=[]){
  if(!tasks.length)return 0;
  let total=0,weighted=0;
  tasks.forEach(t=>{
    const duration=Math.max(1,Number(t.duration)||daysBetweenInclusive(t.start,t.end));
    const progress=Math.max(0,Math.min(100,taskStatus(t)==='done'?100:(Number(t.progress)||0)));
    total+=duration; weighted+=duration*(progress/100);
  });
  return total?Math.round(weighted/total*100):0;
}

function currentUser(){ return state.users.find(u=>u.id===session?.userId); }
function accessibleProjects(){ const u=currentUser(); if(!u)return[]; return u.role==='admin'?state.projects:state.projects.filter(p=>u.projectIds.includes(p.id)); }
function currentProject(){ const list=accessibleProjects(); if(!selectedProjectId || !list.some(p=>p.id===selectedProjectId)) selectedProjectId=list[0]?.id || null; return list.find(p=>p.id===selectedProjectId) || null; }

function render(){
  const root=document.getElementById('app');
  if(!session || !currentUser()){ root.innerHTML=loginTemplate(); bindLogin(); return; }
  currentProject();
  root.innerHTML=shellTemplate();
  bindShell();
  renderView();
}

function logoMark(){ return `<div class="brand-mark"><svg viewBox="0 0 40 40" fill="none"><path d="M7 19 20 8l13 11v13H7V19Z" stroke="currentColor" stroke-width="2.4"/><path d="M15 32V21h10v11" stroke="currentColor" stroke-width="2.4"/><circle cx="20" cy="16" r="3.2" stroke="#c7a14a" stroke-width="2"/></svg></div>`; }

function loginTemplate(){ return `<div class="auth-shell">
  <section class="auth-visual">
    <div class="brand">${logoMark()}<div class="brand-copy"><strong>Kairos Legacy Homes</strong><span>Investor Project Portal</span></div></div>
    <div class="auth-hero"><div class="auth-kicker">For Such a Time as This</div><h1>Your home. Your investment. Completely visible.</h1><p>A private, investor-friendly portal for construction progress, schedules, project photos, financial visibility, and milestone updates — all in one beautifully organized place.</p></div>
    <div class="auth-stats"><div class="auth-stat"><strong>24/7</strong><span>secure project visibility</span></div><div class="auth-stat"><strong>1 place</strong><span>schedule, photos & spend</span></div><div class="auth-stat"><strong>Private</strong><span>project-by-project access</span></div></div>
  </section>
  <section class="auth-panel"><form class="login-card" id="loginForm">
    <div class="auth-kicker" style="color:#8c6b2e">Investor Portal</div><h2>Welcome back</h2><p class="sub">Sign in to view your construction project or administer client accounts.</p>
    <div class="demo-box"><strong>Demo access</strong><br>Admin: admin@kairoslegacyhomes.com / Kairos2026!<br>Investor: investor1@demo.com / Investor1!</div>
    <div class="field"><label>Email address</label><input class="input" id="email" type="email" autocomplete="username" placeholder="you@example.com" required></div>
    <div class="field"><label>Password</label><input class="input" id="password" type="password" autocomplete="current-password" placeholder="••••••••" required></div>
    <button class="btn btn-primary login-btn" type="submit">Sign in securely</button>
    <div class="login-foot">Prototype environment — production version should use managed authentication and encrypted cloud storage.</div>
  </form></section>
</div>`; }

function bindLogin(){ document.getElementById('loginForm').addEventListener('submit',e=>{e.preventDefault();const email=document.getElementById('email').value.trim().toLowerCase();const password=document.getElementById('password').value;const u=state.users.find(x=>x.email.toLowerCase()===email && x.password===password);if(!u){toast('Invalid email or password');return}session={userId:u.id};saveSession();selectedProjectId=u.role==='admin'?state.projects[0]?.id:u.projectIds[0];currentView='overview';render();}); }

function shellTemplate(){ const u=currentUser(),p=currentProject(); const items=[['overview','home','Overview'],['schedule','schedule','Schedule'],['photos','photos','Photos'],['financials','money','Investment']]; if(u.role==='admin')items.push(['admin','admin','Admin Center']); return `<div class="shell">
<aside class="sidebar" id="sidebar"><div class="side-brand">${logoMark()}<div><strong>Kairos Legacy Homes</strong><small>Project Portal</small></div></div><nav class="nav">${items.map(([v,i,l])=>`<button data-view="${v}" class="${currentView===v?'active':''}">${svgIcon(i)}<span>${l}</span></button>`).join('')}</nav><div class="side-footer"><div class="user-mini"><div class="avatar">${initials(u.name)}</div><div><strong>${u.name}</strong><span>${u.role==='admin'?'Administrator':'Investor / Client'}</span></div></div><button class="logout" id="logoutBtn">Sign out</button></div></aside>
<main class="main"><header class="topbar"><div class="top-left"><button class="mobile-menu" id="mobileMenu">${svgIcon('menu')}</button><div class="crumb"><small>${u.role==='admin'?'Administrative portal':'Private client portal'}</small><strong>${p?.name || 'No project selected'}</strong></div></div><div class="top-actions">${accessibleProjects().length?`<select class="project-switch" id="projectSwitch">${accessibleProjects().map(x=>`<option value="${x.id}" ${x.id===selectedProjectId?'selected':''}>${x.name}</option>`).join('')}</select>`:''}<button class="icon-btn" title="Notifications">${svgIcon('bell')}</button></div></header><section class="content" id="view"></section></main></div>`; }

function bindShell(){
  document.querySelectorAll('.nav button').forEach(b=>b.onclick=()=>{currentView=b.dataset.view;document.getElementById('sidebar').classList.remove('open');render();});
  document.getElementById('logoutBtn').onclick=()=>{session=null;sessionStorage.removeItem(SESSION_KEY);render();};
  document.getElementById('mobileMenu').onclick=()=>document.getElementById('sidebar').classList.toggle('open');
  const sw=document.getElementById('projectSwitch'); if(sw)sw.onchange=e=>{selectedProjectId=e.target.value;currentView=currentView==='admin'?'admin':'overview';render();};
}

function renderView(){ const host=document.getElementById('view'); const p=currentProject(); if(!p && currentView!=='admin'){host.innerHTML='<div class="card empty">No project is assigned to this account yet.</div>';return}
  if(currentView==='overview') host.innerHTML=overviewTemplate(p);
  if(currentView==='schedule') host.innerHTML=scheduleTemplate(p);
  if(currentView==='photos') host.innerHTML=photosTemplate(p);
  if(currentView==='financials') host.innerHTML=financialTemplate(p);
  if(currentView==='admin') host.innerHTML=adminTemplate();
  bindView();
}

function overviewTemplate(p){
  const remaining=Math.max(p.budget-p.invested,0);
  const next=p.tasks.find(t=>taskStatus(t)==='current') || p.tasks.find(t=>taskStatus(t)==='overdue') || p.tasks.find(t=>taskStatus(t)==='upcoming');
  const synced=p.scheduleSource?`<span class="schedule-sync-note">Schedule synced ${fmtDate(p.scheduleSource.importedDate)} from Excel</span>`:'';
  return `<div class="page-head"><div><h1>Project overview</h1><p>A clear snapshot of schedule, construction progress, and investment activity.</p>${synced}</div><div class="head-actions"><button class="btn btn-outline" data-goto="photos">View latest photos</button><button class="btn btn-primary" data-goto="schedule">Open schedule</button></div></div>
<div class="hero-card card"><div class="eyebrow">${p.status}</div><h2>${p.name}</h2><p>${p.summary}</p><div class="hero-meta"><div><strong>${p.address}</strong><span>Project location</span></div><div><strong>${fmtDate(p.start)}</strong><span>Construction start</span></div><div><strong>${fmtDate(p.target)}</strong><span>Target completion</span></div><div><strong>${fmtDate(p.lastUpdate)}</strong><span>Last project update</span></div></div></div>
<div class="grid grid-4" style="margin-top:18px"><div class="card metric"><span class="label">Project completion</span><div class="value">${p.completion}%</div><div class="progress"><span style="width:${p.completion}%"></span></div><div class="metric-icon">${svgIcon('schedule')}</div></div><div class="card metric"><span class="label">Invested to date</span><div class="value">${money(p.invested)}</div><div class="delta">${p.budget?Math.round((p.invested/p.budget)*100):0}% of project budget</div><div class="metric-icon">${svgIcon('money')}</div></div><div class="card metric"><span class="label">Remaining budget</span><div class="value">${money(remaining)}</div><div class="muted" style="font-size:12px">Total budget ${money(p.budget)}</div></div><div class="card metric"><span class="label">Current / next phase</span><div class="value" style="font-size:19px;line-height:1.3">${next?.name || 'Project Complete'}</div><div class="muted" style="font-size:12px">${next?taskStatusLabel(next):'All milestones complete'}</div></div></div>
<div class="grid grid-2" style="margin-top:18px"><div class="card"><div class="card-head"><h3>Construction phases</h3><span class="muted">${p.tasks.filter(x=>taskStatus(x)==='done').length} of ${p.tasks.length} completed</span></div>${p.tasks.slice(0,6).map((t,i)=>phaseRow(t,i)).join('')}</div><div class="card"><div class="card-head"><h3>Latest project photos</h3><button class="btn btn-soft" data-goto="photos">View all</button></div><div class="gallery" style="grid-template-columns:1fr 1fr">${p.photos.slice(-4).reverse().map(photoCard).join('')||'<div class="empty">No photos uploaded yet.</div>'}</div></div></div>`;
}

function phaseRow(t,i){
  return `<div class="phase-row"><div class="phase-num">${escapeHtml(t.code||String(i+1).padStart(2,'0'))}</div><div class="phase-title"><strong>${escapeHtml(t.name)}</strong><span>${fmtDate(t.start)} – ${fmtDate(t.end)}</span></div><div class="progress"><span style="width:${Math.max(0,Math.min(100,Number(t.progress)||0))}%"></span></div><div class="phase-status ${taskStatusClass(t)}">${taskStatusLabel(t)}</div></div>`;
}

function scheduleTemplate(p){
  const admin=currentUser().role==='admin';
  const src=p.scheduleSource;
  return `<div class="page-head"><div><h1>Construction schedule</h1><p>Follow every construction phase and planned work from start through turnover.</p>${src?`<div class="schedule-source"><span>${svgIcon('file')}</span><span>Last Excel sync: <strong>${fmtDate(src.importedDate)}</strong> · ${src.rows} phases</span></div>`:''}</div><div class="head-actions">${admin?`<button class="btn btn-soft" id="scheduleAddPhaseBtn">${svgIcon('plus')} Add phase</button><button class="btn btn-outline" id="scheduleImportBtn">${svgIcon('upload')} Import Excel</button>`:''}<div class="tabs"><button data-smode="gantt" class="${scheduleMode==='gantt'?'active':''}">Gantt</button><button data-smode="list" class="${scheduleMode==='list'?'active':''}">List</button></div></div></div><div class="card">${scheduleMode==='gantt'?ganttTemplate(p):listScheduleTemplate(p)}</div>`;
}
function monthStartFromISO(s){ const d=new Date(s+'T12:00:00'); return new Date(d.getFullYear(),d.getMonth(),1); }
function monthDiff(a,b){ return (b.getFullYear()-a.getFullYear())*12+(b.getMonth()-a.getMonth()); }
function addMonth(d,n){ return new Date(d.getFullYear(),d.getMonth()+n,1); }
function ganttTemplate(p){
  const dated=p.tasks.filter(t=>t.start&&t.end);
  if(!dated.length) return '<div class="empty">No dated construction phases yet. Import a project schedule or add phases manually.</div>';
  let first=dated.reduce((a,t)=>monthStartFromISO(t.start)<a?monthStartFromISO(t.start):a,monthStartFromISO(dated[0].start));
  let last=dated.reduce((a,t)=>monthStartFromISO(t.end)>a?monthStartFromISO(t.end):a,monthStartFromISO(dated[0].end));
  const monthCount=Math.min(36,Math.max(1,monthDiff(first,last)+1));
  const months=Array.from({length:monthCount},(_,i)=>addMonth(first,i));
  const template=`260px repeat(${monthCount},minmax(78px,1fr))`;
  const minWidth=Math.max(960,260+monthCount*82);
  return `<div class="timeline"><div class="gantt" style="min-width:${minWidth}px"><div class="gantt-head" style="grid-template-columns:${template}"><div>Phase / trade</div>${months.map(m=>`<div>${m.toLocaleDateString('en-US',{month:'short',year:'2-digit'})}</div>`).join('')}</div>${p.tasks.map((t,i)=>{
    if(!t.start||!t.end) return '';
    const start=Math.max(0,Math.min(monthCount-1,monthDiff(first,monthStartFromISO(t.start))));
    const end=Math.max(start,Math.min(monthCount-1,monthDiff(first,monthStartFromISO(t.end))));
    const st=taskStatus(t);
    return `<div class="gantt-row" style="grid-template-columns:${template};--months:${monthCount}"><div class="label"><strong>${escapeHtml(t.code||String(i+1))} · ${escapeHtml(t.name)}</strong><span>${fmtDate(t.start)} – ${fmtDate(t.end)} · ${taskStatusLabel(t)}</span></div><div class="gantt-grid">${Array(monthCount).fill('<i></i>').join('')}</div><div class="bar ${st}" style="grid-column:${start+2}/${end+3};grid-row:1" title="${attr(t.name)}: ${fmtDate(t.start)} – ${fmtDate(t.end)}"></div></div>`;
  }).join('')}</div></div>`;
}
function listScheduleTemplate(p){
  const admin=currentUser().role==='admin';
  return `<div class="table-wrap"><table class="table schedule-table"><thead><tr><th>Code</th><th>Phase</th><th>Start</th><th>Finish</th><th>Days</th><th>Progress</th><th>Status</th>${admin?'<th>Actions</th>':''}</tr></thead><tbody>${p.tasks.map(t=>`<tr><td>${escapeHtml(t.code||'—')}</td><td><strong>${escapeHtml(t.name)}</strong></td><td>${fmtDate(t.start)}</td><td>${fmtDate(t.end)}</td><td>${Number(t.duration)||daysBetweenInclusive(t.start,t.end)}</td><td style="min-width:150px"><div class="progress"><span style="width:${Math.max(0,Math.min(100,Number(t.progress)||0))}%"></span></div><span class="table-progress-label">${Math.max(0,Math.min(100,Number(t.progress)||0))}%</span></td><td><span class="pill ${taskStatus(t)==='overdue'?'pill-overdue':''}">${taskStatusLabel(t)}</span></td>${admin?`<td><div class="action-group"><button class="icon-action" title="Edit phase" data-edit-task="${t.id}">${svgIcon('edit')}</button><button class="icon-action danger" title="Delete phase" data-delete-task="${t.id}">${svgIcon('trash')}</button></div></td>`:''}</tr>`).join('')}</tbody></table></div>`;
}

function photosTemplate(p){
  const admin=currentUser().role==='admin';
  return `<div class="page-head"><div><h1>Project photos</h1><p>Progress documentation organized by project and phase.</p></div>${admin?`<button class="btn btn-primary" id="addPhotoBtn">${svgIcon('plus')} Add photo</button>`:''}</div><div class="card"><div class="gallery">${p.photos.slice().reverse().map(ph=>photoCard(ph,admin)).join('')||'<div class="empty">No photos have been uploaded for this project yet.</div>'}</div></div>`;
}
function photoCard(ph,admin=false){
  return `<div class="photo"><img src="${ph.url}" alt="${escapeHtml(ph.title)}"><div class="photo-overlay"><strong>${escapeHtml(ph.title)}</strong><span>${escapeHtml(ph.phase||'Project update')} · ${fmtDate(ph.date)}</span></div>${admin?`<div class="photo-admin-actions"><button class="icon-action light" title="Edit photo" data-edit-photo="${ph.id}">${svgIcon('edit')}</button><button class="icon-action light danger" title="Delete photo" data-delete-photo="${ph.id}">${svgIcon('trash')}</button></div>`:''}</div>`;
}

function financialTemplate(p){
  const admin=currentUser().role==='admin';
  const pct=p.budget?Math.min(100,Math.round((p.invested/p.budget)*100)):0;
  const max=Math.max(...p.expenses.map(e=>Number(e.amount)||0),1);
  return `<div class="page-head"><div><h1>Investment & budget</h1><p>Investor-friendly visibility into budget utilization and project cost categories.</p></div>${admin?`<button class="btn btn-primary" id="financialAddExpenseBtn">${svgIcon('plus')} Add expense</button>`:''}</div><div class="grid grid-3"><div class="card metric"><span class="label">Approved project budget</span><div class="value">${money(p.budget)}</div><div class="muted" style="font-size:12px">Current authorized budget</div></div><div class="card metric"><span class="label">Invested to date</span><div class="value">${money(p.invested)}</div><div class="delta">${pct}% utilized</div></div><div class="card metric"><span class="label">Remaining capital</span><div class="value">${money(Math.max(0,p.budget-p.invested))}</div><div class="muted" style="font-size:12px">Based on current budget</div></div></div><div class="card" style="margin-top:18px"><div class="card-head"><h3>Capital utilization</h3><span class="muted">Updated ${fmtDate(p.lastUpdate)}</span></div><div class="finance-wrap"><div><div class="donut" style="--pct:${pct}%"><div class="center"><strong>${pct}%</strong><span>budget utilized</span></div></div><div class="progress gold"><span style="width:${pct}%"></span></div></div><div><h3 style="margin:5px 0 18px;font-size:15px">Spend by category</h3><div class="spend-bars">${p.expenses.map(e=>`<div class="spend-item"><span>${escapeHtml(e.cat)}</span><div class="spend-track"><span style="width:${Math.round((Number(e.amount)||0)/max*100)}%"></span></div><b>${money(e.amount)}</b></div>`).join('')||'<div class="muted">No expenses entered yet.</div>'}</div></div></div></div>${admin?`<div class="card" style="margin-top:18px"><div class="card-head"><div><h3>Expense ledger</h3><span class="muted">Edit or remove individual transactions</span></div><button class="btn btn-soft" id="financialAddExpenseBtn2">${svgIcon('plus')} Add expense</button></div>${expenseTableTemplate(p,true)}</div>`:''}<div class="card pad" style="margin-top:18px"><strong style="font-size:13px">Investor note</strong><p class="muted" style="font-size:12px;line-height:1.7;margin-bottom:0">This dashboard is designed for transparency and project tracking. Production deployment can also include invoice documents, draw requests, payment history, change orders, and lender-specific reporting.</p></div>`;
}

function expenseTableTemplate(p,withActions=false){
  return `<div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Category</th><th>Vendor / payee</th><th>Notes</th><th>Amount</th>${withActions?'<th>Actions</th>':''}</tr></thead><tbody>${p.expenses.map(e=>`<tr><td>${fmtDate(e.date)}</td><td><strong>${escapeHtml(e.cat)}</strong></td><td>${escapeHtml(e.vendor||'—')}</td><td class="wrap-cell">${escapeHtml(e.notes||'—')}</td><td><strong>${money(e.amount)}</strong></td>${withActions?`<td><div class="action-group"><button class="icon-action" title="Edit expense" data-edit-expense="${e.id}">${svgIcon('edit')}</button><button class="icon-action danger" title="Delete expense" data-delete-expense="${e.id}">${svgIcon('trash')}</button></div></td>`:''}</tr>`).join('')||`<tr><td colspan="${withActions?6:5}" class="muted">No expenses have been added.</td></tr>`}</tbody></table></div>`;
}

function adminTemplate(){
  const users=state.users.filter(u=>u.role==='client');
  return `<div class="page-head"><div><h1>Admin center</h1><p>Full editing control for client access, projects, construction phases, photos, expenses, budgets, and schedule imports.</p></div><div class="head-actions"><button class="btn btn-outline" id="newClientBtn">${svgIcon('user')} New client</button><button class="btn btn-primary" id="newProjectBtn">${svgIcon('plus')} New project</button></div></div>
  <div class="grid grid-4"><div class="card metric"><span class="label">Client accounts</span><div class="value">${users.length}</div></div><div class="card metric"><span class="label">Active projects</span><div class="value">${state.projects.length}</div></div><div class="card metric"><span class="label">Portfolio budget</span><div class="value">${money(state.projects.reduce((a,p)=>a+(Number(p.budget)||0),0))}</div></div><div class="card metric"><span class="label">Capital deployed</span><div class="value">${money(state.projects.reduce((a,p)=>a+(Number(p.invested)||0),0))}</div></div></div>
  <div class="admin-split" style="margin-top:18px"><div class="card list-card"><div class="card-head"><h3>Projects</h3><span class="muted">Select to manage</span></div>${state.projects.map(p=>`<div class="list-item ${p.id===selectedProjectId?'active':''}" data-admin-project="${p.id}"><strong>${escapeHtml(p.name)}</strong><span>${escapeHtml(p.address)} · ${p.completion}% complete</span></div>`).join('')||'<div class="empty">No projects yet.</div>'}</div><div class="card" id="adminEditor">${adminEditorTemplate(currentProject())}</div></div>
  <div class="card admin-section" style="margin-top:18px"><div class="card-head"><div><h3>Client login accounts</h3><span class="muted">Edit credentials and project access assignments</span></div><button class="btn btn-soft" id="newClientBtn2">${svgIcon('user')} New client</button></div><div class="table-wrap"><table class="table"><thead><tr><th>Client</th><th>Email</th><th>Assigned project(s)</th><th>Role</th><th>Actions</th></tr></thead><tbody>${users.map(u=>`<tr><td><strong>${escapeHtml(u.name)}</strong></td><td>${escapeHtml(u.email)}</td><td class="wrap-cell">${u.projectIds.map(id=>state.projects.find(p=>p.id===id)?.name).filter(Boolean).map(escapeHtml).join(', ')||'None'}</td><td><span class="pill">Client</span></td><td><div class="action-group"><button class="icon-action" title="Edit client" data-edit-user="${u.id}">${svgIcon('edit')}</button><button class="icon-action danger" title="Delete client" data-delete-user="${u.id}">${svgIcon('trash')}</button></div></td></tr>`).join('')||'<tr><td colspan="5" class="muted">No client accounts yet.</td></tr>'}</tbody></table></div></div>`;
}

function adminEditorTemplate(p){
  if(!p)return '<div class="empty">Create a project to begin.</div>';
  const client=state.users.find(u=>u.id===p.clientId);
  const src=p.scheduleSource;
  return `<div class="card-head"><div><h3>${escapeHtml(p.name)}</h3><span class="muted">${escapeHtml(p.address)}</span></div><div class="head-actions"><button class="btn btn-soft" id="editProjectBtn">${svgIcon('edit')} Edit project</button><button class="btn btn-danger-soft" id="deleteProjectBtn">${svgIcon('trash')} Delete</button></div></div>
  <div class="pad">
    <div class="grid grid-3"><div><div class="muted mini-label">Assigned client</div><strong class="mini-value">${escapeHtml(client?.name||'Unassigned')}</strong></div><div><div class="muted mini-label">Budget</div><strong class="mini-value">${money(p.budget)}</strong></div><div><div class="muted mini-label">Completion</div><strong class="mini-value">${p.completion}%</strong></div></div><div class="progress" style="margin:18px 0 22px"><span style="width:${p.completion}%"></span></div>
    <div class="schedule-import-box"><div class="schedule-import-icon">${svgIcon('file')}</div><div class="schedule-import-copy"><strong>Excel construction schedule</strong>${src?`<span>Synced from <b>${escapeHtml(src.fileName)}</b> on ${fmtDate(src.importedDate)} · ${src.rows} phases</span>`:'<span>No spreadsheet has been imported for this project yet.</span>'}<small>Upload this project's spreadsheet to replace or merge phases, dates, completion flags, duration, and project schedule dates.</small></div><div class="schedule-import-actions"><button class="btn btn-primary" id="importScheduleBtn">${svgIcon('upload')} ${src?'Update from Excel':'Import Excel'}</button><a class="btn btn-soft" href="Kairos_Construction_Schedule_Template.xlsx" download>Template</a>${p.scheduleBackup?'<button class="btn btn-soft" id="undoScheduleImportBtn">Undo last import</button>':''}</div></div>
    <div class="admin-action-row"><button class="btn btn-outline" id="addTaskBtn">${svgIcon('plus')} Add phase</button><button class="btn btn-outline" id="adminAddPhotoBtn">${svgIcon('plus')} Add photo</button><button class="btn btn-outline" id="addExpenseBtn">${svgIcon('plus')} Add expense</button></div>
  </div>

  <div class="admin-subsection"><div class="card-head"><div><h3>Project phases</h3><span class="muted">${p.tasks.length} schedule items · click Edit to change dates, progress, code, or name</span></div><button class="btn btn-soft" id="addTaskBtn2">${svgIcon('plus')} Add phase</button></div>
  <div class="table-wrap"><table class="table"><thead><tr><th>Code</th><th>Phase</th><th>Dates</th><th>Progress</th><th>Status</th><th>Actions</th></tr></thead><tbody>${p.tasks.map(t=>`<tr><td>${escapeHtml(t.code||'—')}</td><td><strong>${escapeHtml(t.name)}</strong></td><td>${fmtDate(t.start)} → ${fmtDate(t.end)}</td><td><span class="mini-progress">${Math.max(0,Math.min(100,Number(t.progress)||0))}%</span></td><td><span class="pill ${taskStatus(t)==='overdue'?'pill-overdue':''}">${taskStatusLabel(t)}</span></td><td><div class="action-group"><button class="icon-action" title="Edit phase" data-edit-task="${t.id}">${svgIcon('edit')}</button><button class="icon-action danger" title="Delete phase" data-delete-task="${t.id}">${svgIcon('trash')}</button></div></td></tr>`).join('')||'<tr><td colspan="6" class="muted">No construction phases yet.</td></tr>'}</tbody></table></div></div>

  <div class="admin-subsection"><div class="card-head"><div><h3>Project photos</h3><span class="muted">${p.photos.length} uploaded photos · edit title, date, phase, or replace the image</span></div><button class="btn btn-soft" id="adminAddPhotoBtn2">${svgIcon('plus')} Add photo</button></div>
  <div class="table-wrap"><table class="table"><thead><tr><th>Photo</th><th>Title</th><th>Phase</th><th>Date</th><th>Actions</th></tr></thead><tbody>${p.photos.slice().reverse().map(ph=>`<tr><td><img class="table-thumb" src="${ph.url}" alt=""></td><td><strong>${escapeHtml(ph.title)}</strong></td><td>${escapeHtml(ph.phase||'—')}</td><td>${fmtDate(ph.date)}</td><td><div class="action-group"><button class="icon-action" title="Edit photo" data-edit-photo="${ph.id}">${svgIcon('edit')}</button><button class="icon-action danger" title="Delete photo" data-delete-photo="${ph.id}">${svgIcon('trash')}</button></div></td></tr>`).join('')||'<tr><td colspan="5" class="muted">No photos uploaded yet.</td></tr>'}</tbody></table></div></div>

  <div class="admin-subsection"><div class="card-head"><div><h3>Project expenses</h3><span class="muted">${p.expenses.length} entries · invested total ${money(p.invested)}</span></div><button class="btn btn-soft" id="addExpenseBtn2">${svgIcon('plus')} Add expense</button></div>${expenseTableTemplate(p,true)}</div>`;
}

function bindView(){
  document.querySelectorAll('[data-goto]').forEach(b=>b.onclick=()=>{currentView=b.dataset.goto;render();});
  document.querySelectorAll('[data-smode]').forEach(b=>b.onclick=()=>{scheduleMode=b.dataset.smode;renderView();});
  const addPhoto=document.getElementById('addPhotoBtn'); if(addPhoto)addPhoto.onclick=()=>openPhotoModal();
  const si=document.getElementById('scheduleImportBtn'); if(si)si.onclick=openScheduleImportModal;
  const sap=document.getElementById('scheduleAddPhaseBtn'); if(sap)sap.onclick=()=>openTaskModal();
  const fe=document.getElementById('financialAddExpenseBtn'); if(fe)fe.onclick=()=>openExpenseModal();
  const fe2=document.getElementById('financialAddExpenseBtn2'); if(fe2)fe2.onclick=()=>openExpenseModal();

  document.querySelectorAll('[data-edit-task]').forEach(b=>b.onclick=()=>{const t=currentProject()?.tasks.find(x=>x.id===b.dataset.editTask);if(t)openTaskModal(t);});
  document.querySelectorAll('[data-delete-task]').forEach(b=>b.onclick=()=>deleteTask(b.dataset.deleteTask));
  document.querySelectorAll('[data-edit-photo]').forEach(b=>b.onclick=()=>{const ph=currentProject()?.photos.find(x=>x.id===b.dataset.editPhoto);if(ph)openPhotoModal(ph);});
  document.querySelectorAll('[data-delete-photo]').forEach(b=>b.onclick=()=>deletePhoto(b.dataset.deletePhoto));
  document.querySelectorAll('[data-edit-expense]').forEach(b=>b.onclick=()=>{const ex=currentProject()?.expenses.find(x=>x.id===b.dataset.editExpense);if(ex)openExpenseModal(ex);});
  document.querySelectorAll('[data-delete-expense]').forEach(b=>b.onclick=()=>deleteExpense(b.dataset.deleteExpense));

  if(currentView==='admin') bindAdmin();
}

function bindAdmin(){
  document.querySelectorAll('[data-admin-project]').forEach(x=>x.onclick=()=>{selectedProjectId=x.dataset.adminProject;renderView();});
  const nc=document.getElementById('newClientBtn'); if(nc)nc.onclick=()=>openClientModal();
  const nc2=document.getElementById('newClientBtn2'); if(nc2)nc2.onclick=()=>openClientModal();
  const np=document.getElementById('newProjectBtn'); if(np)np.onclick=()=>openProjectModal();
  const ep=document.getElementById('editProjectBtn'); if(ep)ep.onclick=()=>openProjectModal(currentProject());
  const dp=document.getElementById('deleteProjectBtn'); if(dp)dp.onclick=()=>deleteProject(currentProject()?.id);
  const at=document.getElementById('addTaskBtn'); if(at)at.onclick=()=>openTaskModal();
  const at2=document.getElementById('addTaskBtn2'); if(at2)at2.onclick=()=>openTaskModal();
  const ap=document.getElementById('adminAddPhotoBtn'); if(ap)ap.onclick=()=>openPhotoModal();
  const ap2=document.getElementById('adminAddPhotoBtn2'); if(ap2)ap2.onclick=()=>openPhotoModal();
  const ae=document.getElementById('addExpenseBtn'); if(ae)ae.onclick=()=>openExpenseModal();
  const ae2=document.getElementById('addExpenseBtn2'); if(ae2)ae2.onclick=()=>openExpenseModal();
  const im=document.getElementById('importScheduleBtn'); if(im)im.onclick=openScheduleImportModal;
  const undo=document.getElementById('undoScheduleImportBtn'); if(undo)undo.onclick=undoLastScheduleImport;

  document.querySelectorAll('[data-edit-user]').forEach(b=>b.onclick=()=>{const u=state.users.find(x=>x.id===b.dataset.editUser);if(u)openClientModal(u);});
  document.querySelectorAll('[data-delete-user]').forEach(b=>b.onclick=()=>deleteClient(b.dataset.deleteUser));
}

function recalcProjectInvestment(p){
  p.invested=p.expenses.reduce((a,x)=>a+(Number(x.amount)||0),0);
  p.lastUpdate=todayISO();
}
function deleteTask(id){
  const p=currentProject(); if(!p)return;
  const t=p.tasks.find(x=>x.id===id); if(!t)return;
  if(!confirm(`Delete construction phase "${t.name}"?`))return;
  p.tasks=p.tasks.filter(x=>x.id!==id); p.completion=scheduleCompletion(p.tasks); p.lastUpdate=todayISO(); saveState(); renderView(); toast('Phase deleted');
}
function deletePhoto(id){
  const p=currentProject(); if(!p)return;
  const ph=p.photos.find(x=>x.id===id); if(!ph)return;
  if(!confirm(`Delete photo "${ph.title}"?`))return;
  p.photos=p.photos.filter(x=>x.id!==id); p.lastUpdate=todayISO(); saveState(); renderView(); toast('Photo deleted');
}
function deleteExpense(id){
  const p=currentProject(); if(!p)return;
  const ex=p.expenses.find(x=>x.id===id); if(!ex)return;
  if(!confirm(`Delete expense "${ex.cat}" for ${money(ex.amount)}?`))return;
  p.expenses=p.expenses.filter(x=>x.id!==id); recalcProjectInvestment(p); saveState(); renderView(); toast('Expense deleted');
}
function deleteClient(id){
  const u=state.users.find(x=>x.id===id); if(!u)return;
  if(!confirm(`Delete client login "${u.name}"? Their project data will remain, but access will be removed.`))return;
  state.projects.forEach(p=>{if(p.clientId===id)p.clientId='';});
  state.users=state.users.filter(x=>x.id!==id);
  saveState(); render(); toast('Client login deleted');
}

function deleteProject(id){
  const p=state.projects.find(x=>x.id===id); if(!p)return;
  if(!confirm(`Delete project "${p.name}" and all of its phases, photos, and expenses? This cannot be undone in this browser.`))return;
  state.projects=state.projects.filter(x=>x.id!==id);
  state.users.forEach(u=>u.projectIds=(u.projectIds||[]).filter(pid=>pid!==id));
  selectedProjectId=state.projects[0]?.id||null;
  saveState(); render(); toast('Project deleted');
}

function modal(title,body,onBind){ const wrap=document.createElement('div');wrap.className='modal-backdrop';wrap.innerHTML=`<div class="modal"><div class="modal-head"><h3>${title}</h3><button class="close">×</button></div><div class="modal-body">${body}</div></div>`;document.body.appendChild(wrap);const close=()=>wrap.remove();wrap.querySelector('.close').onclick=close;wrap.onclick=e=>{if(e.target===wrap)close()};onBind?.(wrap,close); }

function openClientModal(user=null){
  const editing=!!user;
  const assigned=new Set(user?.projectIds||[]);
  modal(editing?'Edit client login':'Create client login',`<form id="clientForm"><div class="form-grid">
    <div class="field full"><label>Client / investor name</label><input class="input" name="name" value="${attr(user?.name||'')}" required></div>
    <div class="field"><label>Email</label><input class="input" type="email" name="email" value="${attr(user?.email||'')}" required></div>
    <div class="field"><label>${editing?'New password (optional)':'Temporary password'}</label><input class="input" name="password" ${editing?'placeholder="Leave blank to keep current password"':'required'}></div>
    <div class="field full"><label>Project access</label><div class="project-check-grid">${state.projects.map(p=>`<label class="project-check"><input type="checkbox" name="projectIds" value="${p.id}" ${assigned.has(p.id)?'checked':''}><span><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.address)}</small></span></label>`).join('')||'<span class="muted">Create a project first, then assign access here.</span>'}</div><small class="muted">A client only sees projects checked here. Assigning a project to this client makes them the primary client for that project.</small></div>
  </div><div class="form-actions"><button class="btn btn-primary">${editing?'Save client':'Create account'}</button></div></form>`,(w,close)=>{
    w.querySelector('#clientForm').onsubmit=e=>{
      e.preventDefault(); const f=new FormData(e.target);
      const email=String(f.get('email')||'').trim();
      if(state.users.some(u=>u.id!==user?.id && u.email.toLowerCase()===email.toLowerCase())){toast('Email already exists');return}
      const projectIds=f.getAll('projectIds').map(String);
      if(editing){
        user.name=String(f.get('name')||'').trim(); user.email=email;
        const pw=String(f.get('password')||''); if(pw)user.password=pw;
        const oldIds=new Set(user.projectIds||[]);
        user.projectIds=projectIds;
        state.projects.forEach(p=>{
          if(projectIds.includes(p.id)){
            p.clientId=user.id;
            state.users.filter(u=>u.role==='client'&&u.id!==user.id).forEach(u=>u.projectIds=(u.projectIds||[]).filter(id=>id!==p.id));
          } else if(oldIds.has(p.id) && p.clientId===user.id) p.clientId='';
        });
      } else {
        const u={id:uid('u'),name:String(f.get('name')||'').trim(),email,password:String(f.get('password')||''),role:'client',projectIds};
        state.users.push(u);
        projectIds.forEach(pid=>{
          const p=state.projects.find(x=>x.id===pid); if(p)p.clientId=u.id;
          state.users.filter(x=>x.role==='client'&&x.id!==u.id).forEach(x=>x.projectIds=(x.projectIds||[]).filter(id=>id!==pid));
        });
      }
      saveState(); close(); render(); toast(editing?'Client updated':'Client account created');
    };
  });
}

function openProjectModal(p=null){ const clients=state.users.filter(u=>u.role==='client'); modal(p?'Edit project':'Create project',`<form id="projectForm"><div class="form-grid"><div class="field full"><label>Project name</label><input class="input" name="name" value="${attr(p?.name||'')}" required></div><div class="field full"><label>Project address / location</label><input class="input" name="address" value="${attr(p?.address||'')}" required></div><div class="field"><label>Client account</label><select class="select" name="clientId"><option value="">Unassigned</option>${clients.map(u=>`<option value="${u.id}" ${p?.clientId===u.id?'selected':''}>${escapeHtml(u.name)}</option>`).join('')}</select></div><div class="field"><label>Status</label><select class="select" name="status">${['Pre-Construction','In Construction','Punch List','Complete'].map(x=>`<option ${p?.status===x?'selected':''}>${x}</option>`).join('')}</select></div><div class="field"><label>Start date</label><input class="input" type="date" name="start" value="${p?.start||''}" required></div><div class="field"><label>Target completion</label><input class="input" type="date" name="target" value="${p?.target||''}" required></div><div class="field"><label>Total budget</label><input class="input" type="number" name="budget" value="${p?.budget||0}" required></div><div class="field"><label>Invested to date</label><input class="input" type="number" name="invested" value="${p?.invested||0}" required></div><div class="field"><label>Completion %</label><input class="input" type="number" min="0" max="100" name="completion" value="${p?.completion||0}" required></div><div class="field full"><label>Project summary</label><textarea class="textarea" name="summary">${escapeHtml(p?.summary||'')}</textarea></div></div><div class="form-actions"><button class="btn btn-primary">${p?'Save changes':'Create project'}</button></div></form>`,(w,close)=>{w.querySelector('#projectForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);const clientId=f.get('clientId');if(p){Object.assign(p,{name:f.get('name'),address:f.get('address'),clientId,status:f.get('status'),start:f.get('start'),target:f.get('target'),budget:+f.get('budget'),invested:+f.get('invested'),completion:+f.get('completion'),summary:f.get('summary'),lastUpdate:new Date().toISOString().slice(0,10)});}else{p={id:uid('p'),name:f.get('name'),address:f.get('address'),clientId,status:f.get('status'),start:f.get('start'),target:f.get('target'),budget:+f.get('budget'),invested:+f.get('invested'),completion:+f.get('completion'),summary:f.get('summary'),lastUpdate:new Date().toISOString().slice(0,10),tasks:[],photos:[],expenses:[]};state.projects.push(p);selectedProjectId=p.id}state.users.filter(u=>u.role==='client').forEach(u=>{u.projectIds=u.projectIds.filter(id=>id!==p.id);if(u.id===clientId&&!u.projectIds.includes(p.id))u.projectIds.push(p.id)});saveState();close();render();toast(p?'Project updated':'Project created');};}); }


function normalizeHeader(v){ return String(v??'').trim().toLowerCase().replace(/[^a-z0-9]+/g,''); }
function findHeaderColumn(headers,aliases){
  const normalized=headers.map(normalizeHeader);
  for(const alias of aliases){ const i=normalized.indexOf(normalizeHeader(alias)); if(i>=0)return i; }
  return -1;
}
function findScheduleHeader(matrix){
  const max=Math.min(matrix.length,25);
  for(let r=0;r<max;r++){
    const row=matrix[r]||[];
    const title=findHeaderColumn(row,['Title','Phase','Task','Phase / Trade','Description','Name']);
    const start=findHeaderColumn(row,['Start','Start Date','Begin','Begin Date']);
    const end=findHeaderColumn(row,['End','End Date','Finish','Finish Date','Completion Date']);
    if(title>=0 && start>=0 && end>=0){
      return {
        rowIndex:r,title,start,end,
        id:findHeaderColumn(row,['ID #','ID','Code','Phase Code','Task ID']),
        complete:findHeaderColumn(row,['Complete','Completed','Done','Status']),
        duration:findHeaderColumn(row,['Duration','Days','Duration Days'])
      };
    }
  }
  return null;
}
function datePartsToISO(y,m,d){
  y=Number(y);m=Number(m);d=Number(d);
  if(!y||!m||!d)return '';
  if(y<100)y+=y>=70?1900:2000;
  const dt=new Date(y,m-1,d);
  if(Number.isNaN(dt.getTime()))return '';
  return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`;
}
function excelValueToISO(v){
  if(v===null||v===undefined||v==='')return '';
  if(v instanceof Date && !Number.isNaN(v.getTime())) return datePartsToISO(v.getFullYear(),v.getMonth()+1,v.getDate());
  if(typeof v==='number' && Number.isFinite(v)){
    if(window.XLSX?.SSF?.parse_date_code){ const x=XLSX.SSF.parse_date_code(v); if(x)return datePartsToISO(x.y,x.m,x.d); }
    const d=new Date(Date.UTC(1899,11,30)+Math.round(v*86400000));
    return datePartsToISO(d.getUTCFullYear(),d.getUTCMonth()+1,d.getUTCDate());
  }
  const raw=String(v).trim();
  let m=raw.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})$/);
  if(m)return datePartsToISO(m[3],m[1],m[2]);
  m=raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if(m)return datePartsToISO(m[1],m[2],m[3]);
  const d=new Date(raw);
  return Number.isNaN(d.getTime())?'':datePartsToISO(d.getFullYear(),d.getMonth()+1,d.getDate());
}
function addCalendarDays(iso,days){ const d=new Date(iso+'T12:00:00'); d.setDate(d.getDate()+Number(days||0)); return datePartsToISO(d.getFullYear(),d.getMonth()+1,d.getDate()); }
function parseComplete(v){
  if(v===true)return true;
  if(v===false||v===null||v===undefined||v==='')return false;
  if(typeof v==='number')return v>=1;
  return ['true','yes','y','x','complete','completed','done','100','100%'].includes(String(v).trim().toLowerCase());
}
function splitPhaseTitle(value,fallbackCode=''){
  const raw=String(value??'').trim();
  const m=raw.match(/^([A-Za-z0-9.]+)\s*[-–—]\s*(.+)$/);
  return m?{code:m[1].trim(),name:m[2].trim()}:{code:String(fallbackCode??'').trim(),name:raw};
}
function statusForImportedTask(complete,start,end){
  if(complete)return 'done';
  const today=todayISO();
  if(end && today>end)return 'overdue';
  if(start && today>=start && (!end||today<=end))return 'current';
  return 'upcoming';
}
async function parseScheduleWorkbook(file){
  if(!window.XLSX) throw new Error('Excel parser could not load. Check the internet connection and try again.');
  const buffer=await file.arrayBuffer();
  const book=XLSX.read(buffer,{type:'array',cellDates:true});
  let selected=null;
  for(const sheetName of book.SheetNames){
    const ws=book.Sheets[sheetName];
    const matrix=XLSX.utils.sheet_to_json(ws,{header:1,raw:true,defval:null,blankrows:false});
    const header=findScheduleHeader(matrix);
    if(header){ selected={sheetName,matrix,header}; break; }
  }
  if(!selected) throw new Error('No schedule table was found. The spreadsheet needs columns for Title, Start, and End. The Kairos template is supported automatically.');
  const {sheetName,matrix,header}=selected;
  const tasks=[]; let skipped=0;
  for(let r=header.rowIndex+1;r<matrix.length;r++){
    const row=matrix[r]||[];
    const rawTitle=row[header.title];
    if(rawTitle===null||rawTitle===undefined||String(rawTitle).trim()==='')continue;
    let start=excelValueToISO(row[header.start]);
    let end=excelValueToISO(row[header.end]);
    const durationRaw=header.duration>=0?Number(row[header.duration]):NaN;
    const duration=Number.isFinite(durationRaw)&&durationRaw>0?Math.round(durationRaw):0;
    if(start && !end && duration) end=addCalendarDays(start,duration-1);
    if(!start || !end){ skipped++; continue; }
    const fallbackCode=header.id>=0?row[header.id]:'';
    const phase=splitPhaseTitle(rawTitle,fallbackCode);
    if(!phase.name){ skipped++; continue; }
    const complete=header.complete>=0?parseComplete(row[header.complete]):false;
    const finalDuration=duration||daysBetweenInclusive(start,end);
    tasks.push({
      id:uid('xls'),code:phase.code,name:phase.name,start,end,duration:finalDuration,
      progress:complete?100:0,status:statusForImportedTask(complete,start,end),sourceRow:r+1
    });
  }
  if(!tasks.length) throw new Error('The schedule sheet was found, but no rows had both a valid Start and End date.');
  return {sheetName,tasks,skipped};
}
function scheduleTaskKey(t){ return t.code?`code:${String(t.code).trim().toLowerCase()}`:`name:${String(t.name||'').trim().toLowerCase()}`; }
function mergeScheduleTasks(existing,imported){
  const oldMap=new Map(existing.map(t=>[scheduleTaskKey(t),t]));
  const used=new Set();
  const merged=imported.map(t=>{
    const key=scheduleTaskKey(t),old=oldMap.get(key); used.add(key);
    return old?{...old,...t,id:old.id}:{...t};
  });
  existing.forEach(t=>{ const key=scheduleTaskKey(t); if(!used.has(key))merged.push(t); });
  return merged;
}
function scheduleStats(tasks){
  const dates=tasks.filter(t=>t.start&&t.end);
  const starts=dates.map(t=>t.start).sort();
  const ends=dates.map(t=>t.end).sort();
  return {
    rows:tasks.length,
    complete:tasks.filter(t=>taskStatus(t)==='done').length,
    current:tasks.filter(t=>taskStatus(t)==='current').length,
    overdue:tasks.filter(t=>taskStatus(t)==='overdue').length,
    start:starts[0]||'',end:ends[ends.length-1]||'',completion:scheduleCompletion(tasks)
  };
}
function importPreviewHtml(parsed){
  const st=scheduleStats(parsed.tasks);
  const sample=parsed.tasks.slice(0,8);
  return `<div class="import-preview-stats"><div><strong>${st.rows}</strong><span>phases found</span></div><div><strong>${st.complete}</strong><span>marked complete</span></div><div><strong>${st.completion}%</strong><span>schedule completion</span></div><div><strong>${fmtDate(st.start)}</strong><span>first phase</span></div><div><strong>${fmtDate(st.end)}</strong><span>last phase</span></div></div>
  ${parsed.skipped?`<div class="import-warning">${parsed.skipped} row${parsed.skipped===1?' was':'s were'} skipped because a valid Start and End date could not be determined.</div>`:''}
  <div class="table-wrap import-preview-table"><table class="table"><thead><tr><th>Code</th><th>Phase</th><th>Start</th><th>End</th><th>Days</th><th>Status</th></tr></thead><tbody>${sample.map(t=>`<tr><td>${escapeHtml(t.code||'—')}</td><td><strong>${escapeHtml(t.name)}</strong></td><td>${fmtDate(t.start)}</td><td>${fmtDate(t.end)}</td><td>${t.duration}</td><td>${taskStatusLabel(t)}</td></tr>`).join('')}</tbody></table></div>${parsed.tasks.length>sample.length?`<div class="muted import-more">Previewing 8 of ${parsed.tasks.length} phases.</div>`:''}`;
}
function openScheduleImportModal(){
  const p=currentProject(); if(!p)return;
  modal(`Import Excel schedule · ${escapeHtml(p.name)}`,`<form id="scheduleImportForm"><div class="import-intro"><div class="schedule-import-icon large">${svgIcon('upload')}</div><div><strong>Update this project's construction phases from Excel</strong><p>Select the spreadsheet belonging to <b>${escapeHtml(p.name)}</b>. The importer finds the schedule headers automatically, including the format in your provided template.</p></div></div>
  <div class="field"><label>Excel schedule file</label><label class="file-drop" for="scheduleFile"><span>${svgIcon('file')}</span><div><strong>Choose .xlsx or .xls file</strong><small>Expected columns: ID #, Title, Complete, Duration, Start, End</small></div><input id="scheduleFile" type="file" accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" required></label></div>
  <div class="form-grid import-options"><div class="field"><label>Import behavior</label><select class="select" id="scheduleImportMode"><option value="replace">Replace schedule with spreadsheet</option><option value="merge">Merge / update matching phase codes</option></select></div><div class="field checkbox-field"><label><input type="checkbox" id="updateProjectFacts" checked> Update project start, target completion, and completion % from spreadsheet</label></div></div>
  <div class="import-note"><strong>How it works</strong><span>The Title prefix such as <b>300- Driveway - Pouring</b> becomes phase code <b>300</b>. Complete = TRUE becomes 100% complete. Incomplete tasks are classified as upcoming, in progress, or past due from their dates.</span></div>
  <div id="scheduleImportStatus" class="import-status muted">Choose a spreadsheet to preview the changes before importing.</div>
  <div id="scheduleImportPreview"></div>
  <div class="form-actions"><button type="button" class="btn btn-primary" id="applyScheduleImport" disabled>${svgIcon('upload')} Import schedule</button></div></form>`,(w,close)=>{
    const fileInput=w.querySelector('#scheduleFile'),status=w.querySelector('#scheduleImportStatus'),preview=w.querySelector('#scheduleImportPreview'),apply=w.querySelector('#applyScheduleImport');
    let parsed=null,file=null;
    fileInput.onchange=async()=>{
      file=fileInput.files?.[0]||null; parsed=null; apply.disabled=true; preview.innerHTML='';
      if(!file)return;
      status.className='import-status loading'; status.textContent=`Reading ${file.name}…`;
      try{
        parsed=await parseScheduleWorkbook(file);
        status.className='import-status success'; status.textContent=`Found schedule on worksheet “${parsed.sheetName}”. Review the preview below, then import.`;
        preview.innerHTML=importPreviewHtml(parsed); apply.disabled=false;
      }catch(err){
        status.className='import-status error'; status.textContent=err?.message||'Unable to read this spreadsheet.'; parsed=null; apply.disabled=true;
      }
    };
    apply.onclick=()=>{
      if(!parsed||!file)return;
      const mode=w.querySelector('#scheduleImportMode').value;
      p.scheduleBackup={savedAt:new Date().toISOString(),tasks:deepClone(p.tasks),start:p.start,target:p.target,completion:p.completion,status:p.status,lastUpdate:p.lastUpdate,scheduleSource:p.scheduleSource?deepClone(p.scheduleSource):null};
      p.tasks=mode==='merge'?mergeScheduleTasks(p.tasks,parsed.tasks):parsed.tasks;
      const stats=scheduleStats(p.tasks);
      if(w.querySelector('#updateProjectFacts').checked){
        if(stats.start)p.start=stats.start;
        if(stats.end)p.target=stats.end;
        p.completion=stats.completion;
        p.status=stats.completion>=100?'Complete':(p.start&&todayISO()<p.start?'Pre-Construction':'In Construction');
      }
      p.lastUpdate=todayISO();
      p.scheduleSource={fileName:file.name,sheetName:parsed.sheetName,importedAt:new Date().toISOString(),importedDate:todayISO(),rows:parsed.tasks.length,completed:parsed.tasks.filter(t=>taskStatus(t)==='done').length,mode};
      saveState(); close(); render(); toast(`${parsed.tasks.length} construction phases imported`);
    };
  });
}
function undoLastScheduleImport(){
  const p=currentProject(); const b=p?.scheduleBackup; if(!p||!b)return;
  if(!confirm('Restore the project schedule to the version from before the last Excel import?'))return;
  p.tasks=deepClone(b.tasks||[]); p.start=b.start; p.target=b.target; p.completion=b.completion; p.status=b.status; p.lastUpdate=b.lastUpdate; p.scheduleSource=b.scheduleSource?deepClone(b.scheduleSource):null; delete p.scheduleBackup;
  saveState(); renderView(); toast('Previous project schedule restored');
}

function openTaskModal(task=null){
  const p=currentProject(); if(!p)return;
  const editing=!!task;
  modal(editing?'Edit construction phase':'Add construction phase',`<form id="taskForm"><div class="form-grid">
    <div class="field"><label>Phase code</label><input class="input" name="code" placeholder="e.g. 340" value="${attr(task?.code||'')}" required></div>
    <div class="field"><label>Phase / trade name</label><input class="input" name="name" value="${attr(task?.name||'')}" required></div>
    <div class="field"><label>Start date</label><input class="input" type="date" name="start" value="${task?.start||''}" required></div>
    <div class="field"><label>Finish date</label><input class="input" type="date" name="end" value="${task?.end||''}" required></div>
    <div class="field"><label>Progress %</label><input class="input" type="number" min="0" max="100" name="progress" value="${Number(task?.progress)||0}" required></div>
    <div class="field"><label>Duration (days)</label><input class="input" type="number" min="1" name="duration" value="${task?Number(task.duration)||daysBetweenInclusive(task.start,task.end):''}" placeholder="Calculated from dates"></div>
  </div><div class="form-actions"><button class="btn btn-primary">${editing?'Save phase':'Add phase'}</button></div></form>`,(w,close)=>{
    w.querySelector('#taskForm').onsubmit=e=>{
      e.preventDefault(); const f=new FormData(e.target);
      const prog=Math.max(0,Math.min(100,+f.get('progress')||0)),start=f.get('start'),end=f.get('end');
      if(start && end && end<start){toast('Finish date cannot be before the start date');return}
      const duration=Math.max(1,+f.get('duration')||daysBetweenInclusive(start,end));
      const values={code:String(f.get('code')||'').trim(),name:String(f.get('name')||'').trim(),start,end,duration,progress:prog,status:prog===100?'done':prog>0?'current':statusForImportedTask(false,start,end)};
      if(editing)Object.assign(task,values); else p.tasks.push({id:uid('t'),...values});
      p.tasks.sort((a,b)=>(a.start||'9999').localeCompare(b.start||'9999') || String(a.code||'').localeCompare(String(b.code||'')));
      p.completion=scheduleCompletion(p.tasks); p.lastUpdate=todayISO(); saveState(); close(); renderView(); toast(editing?'Phase updated':'Phase added');
    };
  });
}

function openPhotoModal(photo=null){
  const p=currentProject(); if(!p)return;
  const editing=!!photo;
  const phaseOptions=p.tasks.map(t=>t.name).filter(Boolean);
  modal(editing?'Edit project photo':'Add project photo',`<form id="photoForm"><div class="form-grid">
    ${editing&&photo.url?`<div class="field full"><label>Current image</label><img class="modal-photo-preview" src="${photo.url}" alt=""></div>`:''}
    <div class="field full"><label>Photo title</label><input class="input" name="title" value="${attr(photo?.title||'')}" required></div>
    <div class="field"><label>Date</label><input class="input" type="date" name="date" value="${photo?.date||todayISO()}" required></div>
    <div class="field"><label>Project phase</label><input class="input" name="phase" list="phaseNames" value="${attr(photo?.phase||'')}" placeholder="Framing, HVAC, Exterior…"><datalist id="phaseNames">${phaseOptions.map(x=>`<option value="${attr(x)}"></option>`).join('')}</datalist></div>
    <div class="field full"><label>${editing?'Replace image (optional)':'Image file'}</label><input class="input" type="file" name="file" accept="image/*" ${editing?'':'required'}><small class="muted">${editing?'Leave empty to keep the current image. ':''}In this prototype, photos are stored in your browser. Production storage should use private cloud object storage.</small></div>
  </div><div class="form-actions"><button class="btn btn-primary">${editing?'Save photo':'Upload photo'}</button></div></form>`,(w,close)=>{
    w.querySelector('#photoForm').onsubmit=e=>{
      e.preventDefault(); const f=new FormData(e.target),file=f.get('file');
      const savePhoto=(url)=>{
        const values={title:String(f.get('title')||'').trim(),date:String(f.get('date')||''),phase:String(f.get('phase')||'').trim(),url:url||photo?.url||''};
        if(editing)Object.assign(photo,values); else p.photos.push({id:uid('ph'),...values});
        p.lastUpdate=todayISO();
        try{saveState();}catch(err){toast('Image is too large for browser demo storage');return}
        close(); renderView(); toast(editing?'Photo updated':'Photo uploaded');
      };
      if(file && file.size){
        const reader=new FileReader(); reader.onload=()=>savePhoto(reader.result); reader.readAsDataURL(file);
      } else savePhoto(photo?.url||'');
    };
  });
}

function openExpenseModal(expense=null){
  const p=currentProject(); if(!p)return;
  const editing=!!expense;
  modal(editing?'Edit project expense':'Add project expense',`<form id="expenseForm"><div class="form-grid">
    <div class="field"><label>Category</label><input class="input" name="cat" value="${attr(expense?.cat||'')}" placeholder="Windows / Exterior" required></div>
    <div class="field"><label>Amount</label><input class="input" type="number" name="amount" min="0" step="0.01" value="${expense?.amount??''}" required></div>
    <div class="field"><label>Date</label><input class="input" type="date" name="date" value="${expense?.date||todayISO()}"></div>
    <div class="field"><label>Vendor / payee</label><input class="input" name="vendor" value="${attr(expense?.vendor||'')}" placeholder="Contractor or supplier"></div>
    <div class="field full"><label>Notes</label><textarea class="textarea" name="notes" placeholder="Invoice, draw, scope, or payment note">${escapeHtml(expense?.notes||'')}</textarea></div>
  </div><div class="form-actions"><button class="btn btn-primary">${editing?'Save expense':'Add expense'}</button></div></form>`,(w,close)=>{
    w.querySelector('#expenseForm').onsubmit=e=>{
      e.preventDefault(); const f=new FormData(e.target);
      const values={cat:String(f.get('cat')||'').trim(),amount:+f.get('amount')||0,date:String(f.get('date')||''),vendor:String(f.get('vendor')||'').trim(),notes:String(f.get('notes')||'').trim()};
      if(editing)Object.assign(expense,values); else p.expenses.push({id:uid('ex'),...values});
      recalcProjectInvestment(p); saveState(); close(); renderView(); toast(editing?'Expense updated':'Expense added');
    };
  });
}

function escapeHtml(s=''){ return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function attr(s=''){ return escapeHtml(s); }

render();
