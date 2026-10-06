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
    user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg>'
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
function loadState(){ try{ return JSON.parse(localStorage.getItem(STORE_KEY)) || deepClone(seed); } catch { return deepClone(seed); } }
function saveState(){ localStorage.setItem(STORE_KEY,JSON.stringify(state)); }
function loadSession(){ try{return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || null}catch{return null} }
function saveSession(){ sessionStorage.setItem(SESSION_KEY,JSON.stringify(session)); }
function money(n){ return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(Number(n||0)); }
function fmtDate(s){ if(!s)return '—'; return new Date(s+'T12:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}); }
function initials(name){return name.split(/\s|&/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase()}
function toast(msg){ const t=document.getElementById('toast'); t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200); }
function uid(prefix='id'){ return prefix+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7); }

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

function overviewTemplate(p){ const remaining=Math.max(p.budget-p.invested,0); const next=p.tasks.find(t=>t.progress<100); return `<div class="page-head"><div><h1>Project overview</h1><p>A clear snapshot of schedule, construction progress, and investment activity.</p></div><div class="head-actions"><button class="btn btn-outline" data-goto="photos">View latest photos</button><button class="btn btn-primary" data-goto="schedule">Open schedule</button></div></div>
<div class="hero-card card"><div class="eyebrow">${p.status}</div><h2>${p.name}</h2><p>${p.summary}</p><div class="hero-meta"><div><strong>${p.address}</strong><span>Project location</span></div><div><strong>${fmtDate(p.start)}</strong><span>Construction start</span></div><div><strong>${fmtDate(p.target)}</strong><span>Target completion</span></div><div><strong>${fmtDate(p.lastUpdate)}</strong><span>Last project update</span></div></div></div>
<div class="grid grid-4" style="margin-top:18px"><div class="card metric"><span class="label">Project completion</span><div class="value">${p.completion}%</div><div class="progress"><span style="width:${p.completion}%"></span></div><div class="metric-icon">${svgIcon('schedule')}</div></div><div class="card metric"><span class="label">Invested to date</span><div class="value">${money(p.invested)}</div><div class="delta">${Math.round((p.invested/p.budget)*100)}% of project budget</div><div class="metric-icon">${svgIcon('money')}</div></div><div class="card metric"><span class="label">Remaining budget</span><div class="value">${money(remaining)}</div><div class="muted" style="font-size:12px">Total budget ${money(p.budget)}</div></div><div class="card metric"><span class="label">Current / next phase</span><div class="value" style="font-size:19px;line-height:1.3">${next?.name || 'Project Complete'}</div><div class="muted" style="font-size:12px">${next?`${next.progress}% complete`:'All milestones complete'}</div></div></div>
<div class="grid grid-2" style="margin-top:18px"><div class="card"><div class="card-head"><h3>Construction phases</h3><span class="muted">${p.tasks.filter(x=>x.progress===100).length} of ${p.tasks.length} completed</span></div>${p.tasks.slice(0,6).map((t,i)=>phaseRow(t,i)).join('')}</div><div class="card"><div class="card-head"><h3>Latest project photos</h3><button class="btn btn-soft" data-goto="photos">View all</button></div><div class="gallery" style="grid-template-columns:1fr 1fr">${p.photos.slice(-4).reverse().map(photoCard).join('')||'<div class="empty">No photos uploaded yet.</div>'}</div></div></div>`; }

function phaseRow(t,i){ const cls=t.progress===100?'status-done':t.progress>0?'status-live':'status-plan'; const label=t.progress===100?'Complete':t.progress>0?'In progress':'Upcoming'; return `<div class="phase-row"><div class="phase-num">${t.code||String(i+1).padStart(2,'0')}</div><div class="phase-title"><strong>${t.name}</strong><span>${fmtDate(t.start)} – ${fmtDate(t.end)}</span></div><div class="progress"><span style="width:${t.progress}%"></span></div><div class="phase-status ${cls}">${label}</div></div>`; }

function scheduleTemplate(p){ return `<div class="page-head"><div><h1>Construction schedule</h1><p>Follow major phases and planned work from start through turnover.</p></div><div class="tabs"><button data-smode="gantt" class="${scheduleMode==='gantt'?'active':''}">Gantt</button><button data-smode="list" class="${scheduleMode==='list'?'active':''}">List</button></div></div><div class="card">${scheduleMode==='gantt'?ganttTemplate(p):listScheduleTemplate(p)}</div>`; }
function ganttTemplate(p){ const months=['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul']; return `<div class="timeline"><div class="gantt"><div class="gantt-head"><div>Phase / trade</div>${months.map(m=>`<div>${m}</div>`).join('')}</div>${p.tasks.map((t,i)=>{const start=Math.min(12,Math.max(1,monthPos(t.start)));const end=Math.min(12,Math.max(start,monthPos(t.end)));return `<div class="gantt-row"><div class="label"><strong>${t.code} · ${t.name}</strong><span>${t.progress}% complete</span></div><div class="gantt-grid">${Array(12).fill('<i></i>').join('')}</div><div class="bar ${t.progress===100?'done':t.progress>0?'current':'upcoming'}" style="grid-column:${start+1}/${end+2};grid-row:1" title="${fmtDate(t.start)} – ${fmtDate(t.end)}"></div></div>`}).join('')}</div></div>`; }
function monthPos(date){ const d=new Date(date+'T12:00:00'),m=d.getMonth(); return ((m-7+12)%12)+1; }
function listScheduleTemplate(p){ return `<div class="table-wrap"><table class="table"><thead><tr><th>Code</th><th>Phase</th><th>Start</th><th>Finish</th><th>Progress</th><th>Status</th></tr></thead><tbody>${p.tasks.map(t=>`<tr><td>${t.code}</td><td><strong>${t.name}</strong></td><td>${fmtDate(t.start)}</td><td>${fmtDate(t.end)}</td><td style="min-width:180px"><div class="progress"><span style="width:${t.progress}%"></span></div></td><td><span class="pill">${t.progress===100?'Complete':t.progress>0?'In progress':'Upcoming'}</span></td></tr>`).join('')}</tbody></table></div>`; }

function photosTemplate(p){ const admin=currentUser().role==='admin'; return `<div class="page-head"><div><h1>Project photos</h1><p>Progress documentation organized by project and phase.</p></div>${admin?`<button class="btn btn-primary" id="addPhotoBtn">${svgIcon('plus')} Add photo</button>`:''}</div><div class="card"><div class="gallery">${p.photos.slice().reverse().map(photoCard).join('')||'<div class="empty">No photos have been uploaded for this project yet.</div>'}</div></div>`; }
function photoCard(ph){return `<div class="photo"><img src="${ph.url}" alt="${escapeHtml(ph.title)}"><div class="photo-overlay"><strong>${escapeHtml(ph.title)}</strong><span>${escapeHtml(ph.phase||'Project update')} · ${fmtDate(ph.date)}</span></div></div>`}

function financialTemplate(p){ const pct=Math.min(100,Math.round((p.invested/p.budget)*100)); const max=Math.max(...p.expenses.map(e=>e.amount),1); return `<div class="page-head"><div><h1>Investment & budget</h1><p>Investor-friendly visibility into budget utilization and project cost categories.</p></div></div><div class="grid grid-3"><div class="card metric"><span class="label">Approved project budget</span><div class="value">${money(p.budget)}</div><div class="muted" style="font-size:12px">Current authorized budget</div></div><div class="card metric"><span class="label">Invested to date</span><div class="value">${money(p.invested)}</div><div class="delta">${pct}% utilized</div></div><div class="card metric"><span class="label">Remaining capital</span><div class="value">${money(Math.max(0,p.budget-p.invested))}</div><div class="muted" style="font-size:12px">Based on current budget</div></div></div><div class="card" style="margin-top:18px"><div class="card-head"><h3>Capital utilization</h3><span class="muted">Updated ${fmtDate(p.lastUpdate)}</span></div><div class="finance-wrap"><div><div class="donut" style="--pct:${pct}%"><div class="center"><strong>${pct}%</strong><span>budget utilized</span></div></div><div class="progress gold"><span style="width:${pct}%"></span></div></div><div><h3 style="margin:5px 0 18px;font-size:15px">Spend by category</h3><div class="spend-bars">${p.expenses.map(e=>`<div class="spend-item"><span>${escapeHtml(e.cat)}</span><div class="spend-track"><span style="width:${Math.round(e.amount/max*100)}%"></span></div><b>${money(e.amount)}</b></div>`).join('')}</div></div></div></div><div class="card pad" style="margin-top:18px"><strong style="font-size:13px">Investor note</strong><p class="muted" style="font-size:12px;line-height:1.7;margin-bottom:0">This dashboard is designed for transparency and project tracking. Production deployment can also include invoice documents, draw requests, payment history, change orders, and lender-specific reporting.</p></div>`; }

function adminTemplate(){ const users=state.users.filter(u=>u.role==='client'); return `<div class="page-head"><div><h1>Admin center</h1><p>Create client logins, assign projects, and manage project-specific schedules, photos, and financial updates.</p></div><div class="head-actions"><button class="btn btn-outline" id="newClientBtn">${svgIcon('user')} New client</button><button class="btn btn-primary" id="newProjectBtn">${svgIcon('plus')} New project</button></div></div><div class="grid grid-4"><div class="card metric"><span class="label">Client accounts</span><div class="value">${users.length}</div></div><div class="card metric"><span class="label">Active projects</span><div class="value">${state.projects.length}</div></div><div class="card metric"><span class="label">Portfolio budget</span><div class="value">${money(state.projects.reduce((a,p)=>a+p.budget,0))}</div></div><div class="card metric"><span class="label">Capital deployed</span><div class="value">${money(state.projects.reduce((a,p)=>a+p.invested,0))}</div></div></div><div class="admin-split" style="margin-top:18px"><div class="card list-card"><div class="card-head"><h3>Projects</h3><span class="muted">Select to manage</span></div>${state.projects.map(p=>`<div class="list-item ${p.id===selectedProjectId?'active':''}" data-admin-project="${p.id}"><strong>${escapeHtml(p.name)}</strong><span>${escapeHtml(p.address)} · ${p.completion}% complete</span></div>`).join('')}</div><div class="card" id="adminEditor">${adminEditorTemplate(currentProject())}</div></div><div class="card" style="margin-top:18px"><div class="card-head"><h3>Client login accounts</h3><span class="muted">Project access is segregated by assignment</span></div><div class="table-wrap"><table class="table"><thead><tr><th>Client</th><th>Email</th><th>Assigned project(s)</th><th>Role</th><th></th></tr></thead><tbody>${users.map(u=>`<tr><td><strong>${escapeHtml(u.name)}</strong></td><td>${escapeHtml(u.email)}</td><td>${u.projectIds.map(id=>state.projects.find(p=>p.id===id)?.name).filter(Boolean).join(', ')||'None'}</td><td><span class="pill">Client</span></td><td><button class="danger-link" data-delete-user="${u.id}">Delete</button></td></tr>`).join('')}</tbody></table></div></div>`; }

function adminEditorTemplate(p){ if(!p)return '<div class="empty">Create a project to begin.</div>'; const client=state.users.find(u=>u.id===p.clientId); return `<div class="card-head"><div><h3>${escapeHtml(p.name)}</h3><span class="muted">${escapeHtml(p.address)}</span></div><button class="btn btn-soft" id="editProjectBtn">Edit project</button></div><div class="pad"><div class="grid grid-3"><div><div class="muted" style="font-size:10px;text-transform:uppercase">Assigned client</div><strong style="font-size:13px">${escapeHtml(client?.name||'Unassigned')}</strong></div><div><div class="muted" style="font-size:10px;text-transform:uppercase">Budget</div><strong style="font-size:13px">${money(p.budget)}</strong></div><div><div class="muted" style="font-size:10px;text-transform:uppercase">Completion</div><strong style="font-size:13px">${p.completion}%</strong></div></div><div class="progress" style="margin:18px 0 22px"><span style="width:${p.completion}%"></span></div><div style="display:flex;gap:9px;flex-wrap:wrap"><button class="btn btn-outline" id="addTaskBtn">${svgIcon('plus')} Add phase</button><button class="btn btn-outline" id="adminAddPhotoBtn">${svgIcon('plus')} Add photo</button><button class="btn btn-outline" id="addExpenseBtn">${svgIcon('plus')} Add expense</button></div></div><div class="card-head"><h3>Project phases</h3><span class="muted">${p.tasks.length} schedule items</span></div><div class="table-wrap"><table class="table"><thead><tr><th>Code</th><th>Phase</th><th>Dates</th><th>Progress</th><th></th></tr></thead><tbody>${p.tasks.map(t=>`<tr><td>${escapeHtml(t.code)}</td><td><strong>${escapeHtml(t.name)}</strong></td><td>${fmtDate(t.start)} → ${fmtDate(t.end)}</td><td>${t.progress}%</td><td><button class="danger-link" data-delete-task="${t.id}">Delete</button></td></tr>`).join('')}</tbody></table></div>`; }

function bindView(){
  document.querySelectorAll('[data-goto]').forEach(b=>b.onclick=()=>{currentView=b.dataset.goto;render();});
  document.querySelectorAll('[data-smode]').forEach(b=>b.onclick=()=>{scheduleMode=b.dataset.smode;renderView();});
  const addPhoto=document.getElementById('addPhotoBtn'); if(addPhoto)addPhoto.onclick=()=>openPhotoModal();
  if(currentView==='admin') bindAdmin();
}

function bindAdmin(){
  document.querySelectorAll('[data-admin-project]').forEach(x=>x.onclick=()=>{selectedProjectId=x.dataset.adminProject;renderView();});
  const nc=document.getElementById('newClientBtn'); if(nc)nc.onclick=openClientModal;
  const np=document.getElementById('newProjectBtn'); if(np)np.onclick=()=>openProjectModal();
  const ep=document.getElementById('editProjectBtn'); if(ep)ep.onclick=()=>openProjectModal(currentProject());
  const at=document.getElementById('addTaskBtn'); if(at)at.onclick=openTaskModal;
  const ap=document.getElementById('adminAddPhotoBtn'); if(ap)ap.onclick=openPhotoModal;
  const ae=document.getElementById('addExpenseBtn'); if(ae)ae.onclick=openExpenseModal;
  document.querySelectorAll('[data-delete-user]').forEach(b=>b.onclick=()=>{if(confirm('Delete this client login?')){state.users=state.users.filter(u=>u.id!==b.dataset.deleteUser);saveState();render();}});
  document.querySelectorAll('[data-delete-task]').forEach(b=>b.onclick=()=>{const p=currentProject();p.tasks=p.tasks.filter(t=>t.id!==b.dataset.deleteTask);saveState();renderView();});
}

function modal(title,body,onBind){ const wrap=document.createElement('div');wrap.className='modal-backdrop';wrap.innerHTML=`<div class="modal"><div class="modal-head"><h3>${title}</h3><button class="close">×</button></div><div class="modal-body">${body}</div></div>`;document.body.appendChild(wrap);const close=()=>wrap.remove();wrap.querySelector('.close').onclick=close;wrap.onclick=e=>{if(e.target===wrap)close()};onBind?.(wrap,close); }

function openClientModal(){ modal('Create client login',`<form id="clientForm"><div class="form-grid"><div class="field full"><label>Client / investor name</label><input class="input" name="name" required></div><div class="field"><label>Email</label><input class="input" type="email" name="email" required></div><div class="field"><label>Temporary password</label><input class="input" name="password" required></div><div class="field full"><label>Assign project(s)</label><select class="select" name="projectId"><option value="">No project yet</option>${state.projects.map(p=>`<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('')}</select></div></div><div class="form-actions"><button class="btn btn-primary">Create account</button></div></form>`,(w,close)=>{w.querySelector('#clientForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);if(state.users.some(u=>u.email.toLowerCase()===f.get('email').toLowerCase())){toast('Email already exists');return}const projectId=f.get('projectId');const u={id:uid('u'),name:f.get('name'),email:f.get('email'),password:f.get('password'),role:'client',projectIds:projectId?[projectId]:[]};state.users.push(u);if(projectId){const p=state.projects.find(x=>x.id===projectId);p.clientId=u.id}saveState();close();render();toast('Client account created');};}); }

function openProjectModal(p=null){ const clients=state.users.filter(u=>u.role==='client'); modal(p?'Edit project':'Create project',`<form id="projectForm"><div class="form-grid"><div class="field full"><label>Project name</label><input class="input" name="name" value="${attr(p?.name||'')}" required></div><div class="field full"><label>Project address / location</label><input class="input" name="address" value="${attr(p?.address||'')}" required></div><div class="field"><label>Client account</label><select class="select" name="clientId"><option value="">Unassigned</option>${clients.map(u=>`<option value="${u.id}" ${p?.clientId===u.id?'selected':''}>${escapeHtml(u.name)}</option>`).join('')}</select></div><div class="field"><label>Status</label><select class="select" name="status">${['Pre-Construction','In Construction','Punch List','Complete'].map(x=>`<option ${p?.status===x?'selected':''}>${x}</option>`).join('')}</select></div><div class="field"><label>Start date</label><input class="input" type="date" name="start" value="${p?.start||''}" required></div><div class="field"><label>Target completion</label><input class="input" type="date" name="target" value="${p?.target||''}" required></div><div class="field"><label>Total budget</label><input class="input" type="number" name="budget" value="${p?.budget||0}" required></div><div class="field"><label>Invested to date</label><input class="input" type="number" name="invested" value="${p?.invested||0}" required></div><div class="field"><label>Completion %</label><input class="input" type="number" min="0" max="100" name="completion" value="${p?.completion||0}" required></div><div class="field full"><label>Project summary</label><textarea class="textarea" name="summary">${escapeHtml(p?.summary||'')}</textarea></div></div><div class="form-actions"><button class="btn btn-primary">${p?'Save changes':'Create project'}</button></div></form>`,(w,close)=>{w.querySelector('#projectForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);const clientId=f.get('clientId');if(p){Object.assign(p,{name:f.get('name'),address:f.get('address'),clientId,status:f.get('status'),start:f.get('start'),target:f.get('target'),budget:+f.get('budget'),invested:+f.get('invested'),completion:+f.get('completion'),summary:f.get('summary'),lastUpdate:new Date().toISOString().slice(0,10)});}else{p={id:uid('p'),name:f.get('name'),address:f.get('address'),clientId,status:f.get('status'),start:f.get('start'),target:f.get('target'),budget:+f.get('budget'),invested:+f.get('invested'),completion:+f.get('completion'),summary:f.get('summary'),lastUpdate:new Date().toISOString().slice(0,10),tasks:[],photos:[],expenses:[]};state.projects.push(p);selectedProjectId=p.id}state.users.filter(u=>u.role==='client').forEach(u=>{u.projectIds=u.projectIds.filter(id=>id!==p.id);if(u.id===clientId&&!u.projectIds.includes(p.id))u.projectIds.push(p.id)});saveState();close();render();toast(p?'Project updated':'Project created');};}); }

function openTaskModal(){ const p=currentProject(); modal('Add construction phase',`<form id="taskForm"><div class="form-grid"><div class="field"><label>Phase code</label><input class="input" name="code" placeholder="e.g. 340" required></div><div class="field"><label>Phase / trade name</label><input class="input" name="name" required></div><div class="field"><label>Start date</label><input class="input" type="date" name="start" required></div><div class="field"><label>Finish date</label><input class="input" type="date" name="end" required></div><div class="field"><label>Progress %</label><input class="input" type="number" min="0" max="100" name="progress" value="0" required></div></div><div class="form-actions"><button class="btn btn-primary">Add phase</button></div></form>`,(w,close)=>{w.querySelector('#taskForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),prog=+f.get('progress');p.tasks.push({id:uid('t'),code:f.get('code'),name:f.get('name'),start:f.get('start'),end:f.get('end'),progress:prog,status:prog===100?'done':prog>0?'current':'upcoming'});saveState();close();renderView();toast('Phase added');};}); }

function openPhotoModal(){ const p=currentProject(); modal('Add project photo',`<form id="photoForm"><div class="form-grid"><div class="field full"><label>Photo title</label><input class="input" name="title" required></div><div class="field"><label>Date</label><input class="input" type="date" name="date" value="${new Date().toISOString().slice(0,10)}" required></div><div class="field"><label>Project phase</label><input class="input" name="phase" placeholder="Framing, HVAC, Exterior…"></div><div class="field full"><label>Image file</label><input class="input" type="file" name="file" accept="image/*" required><small class="muted">In this prototype, photos are stored in your browser. Production storage would use private cloud object storage.</small></div></div><div class="form-actions"><button class="btn btn-primary">Upload photo</button></div></form>`,(w,close)=>{w.querySelector('#photoForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),file=f.get('file');const reader=new FileReader();reader.onload=()=>{p.photos.push({id:uid('ph'),title:f.get('title'),date:f.get('date'),phase:f.get('phase'),url:reader.result});p.lastUpdate=new Date().toISOString().slice(0,10);try{saveState();}catch(err){toast('Image is too large for browser demo storage');return}close();render();toast('Photo uploaded');};reader.readAsDataURL(file);};}); }

function openExpenseModal(){ const p=currentProject(); modal('Add project expense',`<form id="expenseForm"><div class="form-grid"><div class="field"><label>Category</label><input class="input" name="cat" placeholder="Windows / Exterior" required></div><div class="field"><label>Amount</label><input class="input" type="number" name="amount" min="0" required></div></div><div class="form-actions"><button class="btn btn-primary">Add expense</button></div></form>`,(w,close)=>{w.querySelector('#expenseForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);p.expenses.push({cat:f.get('cat'),amount:+f.get('amount')});p.invested=p.expenses.reduce((a,x)=>a+x.amount,0);p.lastUpdate=new Date().toISOString().slice(0,10);saveState();close();render();toast('Expense added');};}); }

function escapeHtml(s=''){ return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function attr(s=''){ return escapeHtml(s); }

render();
