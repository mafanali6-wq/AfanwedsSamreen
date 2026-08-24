const cover = document.getElementById('cover');
const openBtn = document.getElementById('openBtn');
const main = document.getElementById('mainContent');
const bgm = document.getElementById('bgm');
const musicBtn = document.getElementById('musicBtn');
bgm.volume = 0.22;

function startInvitation(){
  cover.classList.add('hidden');
  main.setAttribute('aria-hidden','false');
  setTimeout(()=>{cover.style.display='none'; window.scrollTo({top:0,behavior:'smooth'}); revealVisible();},900);
  bgm.play().then(()=>musicBtn.classList.add('playing')).catch(()=>{});
}
openBtn.addEventListener('click', startInvitation);

musicBtn.addEventListener('click',()=>{
  if(bgm.paused){ bgm.play().then(()=>musicBtn.classList.add('playing')).catch(()=>{}); }
  else { bgm.pause(); musicBtn.classList.remove('playing'); }
});

const weddingTime = new Date('2026-09-13T11:30:00+05:30').getTime();
function updateCountdown(){
  const gap = weddingTime - Date.now();
  const els = ['days','hours','minutes','seconds'].map(id=>document.getElementById(id));
  if(gap<=0){ els[0].textContent='0'; els[1].textContent='0'; els[2].textContent='0'; els[3].textContent='0'; return; }
  const d=Math.floor(gap/86400000), h=Math.floor((gap%86400000)/3600000), m=Math.floor((gap%3600000)/60000), s=Math.floor((gap%60000)/1000);
  [d,h,m,s].forEach((v,i)=>els[i].textContent=String(v).padStart(2,'0'));
}
updateCountdown(); setInterval(updateCountdown,1000);

const observer = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));
function revealVisible(){document.querySelectorAll('.fade-in').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight*.95)el.classList.add('visible')})}

const wishForm=document.getElementById('wishForm'), wishList=document.getElementById('wishList');
function getWishes(){try{return JSON.parse(localStorage.getItem('afanSamreenWishes')||'[]')}catch{return[]}}
function renderWishes(){wishList.innerHTML='';getWishes().slice().reverse().forEach(w=>{const div=document.createElement('div');div.className='wish';const strong=document.createElement('strong');strong.textContent=w.name;const p=document.createElement('p');p.textContent=w.text;div.append(strong,p);wishList.appendChild(div)})}
wishForm.addEventListener('submit',e=>{e.preventDefault();const name=document.getElementById('wishName').value.trim(),text=document.getElementById('wishText').value.trim();if(!name||!text)return;const wishes=getWishes();wishes.push({name,text,ts:Date.now()});localStorage.setItem('afanSamreenWishes',JSON.stringify(wishes.slice(-50)));wishForm.reset();renderWishes()});
renderWishes();
