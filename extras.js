// Bottom navigation: Home, Inspire (quotes and fun facts) and Profile (name, photo, stats).
// bottom navigation
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const QUOTES=[
['Scripture','“And be not conformed to this world: but be ye transformed by the renewing of your mind.”','Romans 12:2'],
['Scripture','“I can do all things through Christ which strengtheneth me.”','Philippians 4:13'],
['Scripture','“For as he thinketh in his heart, so is he.”','Proverbs 23:7'],
['Scripture','“Be strong and of a good courage; be not afraid, neither be thou dismayed.”','Joshua 1:9'],
['Scripture','“They that wait upon the LORD shall renew their strength.”','Isaiah 40:31'],
['Scripture','“For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.”','2 Timothy 1:7'],
['Scripture','“Trust in the LORD with all thine heart; and lean not unto thine own understanding.”','Proverbs 3:5'],
['Scripture','“Let us not be weary in well doing: for in due season we shall reap, if we faint not.”','Galatians 6:9'],
['Scripture','“With God all things are possible.”','Matthew 19:26'],
['Mindset','“Change your thoughts, and you change your direction.”',''],
['Mindset','“Small steps taken daily build a life you can be proud of.”',''],
['Mindset','“Your past is a lesson, not a life sentence.”',''],
['Mindset','“Discipline today is freedom tomorrow.”',''],
['Mindset','“Do not wait to feel motivated. Start, and motivation will follow.”',''],
['Mindset','“A renewed mind sees possibilities where fear sees walls.”',''],
['Mindset','“You are not behind. You are on your own path, at your own pace.”',''],
['Mindset','“Failure is not the end. Quitting is.”','']
];
const FACTS=[
'The Bible was written over about 1,500 years by around 40 different authors.',
'Psalm 117 is the shortest chapter in the Bible, and Psalm 119 is the longest.',
'“Jesus wept” (John 11:35) is the shortest verse in most English Bibles.',
'The book of Esther never mentions God by name.',
'Methuselah lived 969 years, the longest life recorded in the Bible.',
'Zacchaeus climbed a sycamore tree to get a better view of Jesus (Luke 19).',
'Paul is credited with writing 13 letters of the New Testament.',
'Turning water into wine at Cana was the first miracle recorded in John’s Gospel.',
'Noah was 600 years old when the flood came (Genesis 7:6).',
'Solomon is traditionally credited with Proverbs, Ecclesiastes and the Song of Solomon.',
'The Dead Sea Scrolls include some of the oldest known copies of Old Testament books.',
'Daniel was thrown into the lions’ den for praying to God (Daniel 6).'
];
const dayIdx=n=>Math.floor(Date.now()/864e5)%n;
let qi=dayIdx(QUOTES.length),fi=dayIdx(FACTS.length);
function tab(n){track('tab-'+n,'Tab '+n);['home','inspire','profile'].forEach(k=>{document.getElementById('v-'+k).hidden=k!==n});document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.t===n));if(n==='inspire')inspire();if(n==='profile')profile();window.scrollTo(0,0)}
document.querySelectorAll('#nav button').forEach(b=>b.onclick=()=>tab(b.dataset.t));
function inspire(){
 const q=QUOTES[qi],f=FACTS[fi];
 document.getElementById('v-inspire').innerHTML=`<span class="tag">Daily inspiration</span><div class="qt">${q[1]}</div><p>${q[0]}${q[2]?' · '+q[2]:''}</p>
 <button class="btn" id="nq">New quote ↻</button><a class="btn wa" target="_blank" rel="noopener" href="${waLink(q[1]+(q[2]?' ('+q[2]+')':'')+' · Mindset Changer '+location.href)}">💬 Share on WhatsApp</a>
 <hr class="sep"><span class="tag">Fun fact</span><p style="color:var(--tx);font-size:17px;margin-top:12px">${f}</p><button class="btn ghost" id="nf">Another fun fact ↻</button>`;
 document.getElementById('nq').onclick=()=>{qi=(qi+1+Math.floor(Math.random()*(QUOTES.length-1)))%QUOTES.length;inspire()};
 document.getElementById('nf').onclick=()=>{fi=(fi+1+Math.floor(Math.random()*(FACTS.length-1)))%FACTS.length;inspire()};
}
const ST=()=>{try{return JSON.parse(localStorage.getItem('mc_stats'))||{g:0,c:0,a:0,s:0}}catch(e){return{g:0,c:0,a:0,s:0}}};
const getName=()=>{try{return localStorage.getItem('mc_name')||''}catch(e){return ''}};
function recStats(){const s=ST();s.g++;s.c+=right;s.a+=N;s.s=Math.max(s.s,best);try{localStorage.setItem('mc_stats',JSON.stringify(s))}catch(e){}}
const getPic=()=>{try{return localStorage.getItem('mc_pic')||''}catch(e){return ''}};
function setPic(f){
 if(!f||!/^image\//.test(f.type))return;
 const r=new FileReader();
 r.onload=()=>{const im=new Image();im.onload=()=>{const z=256,c=document.createElement('canvas');c.width=c.height=z;const m=Math.min(im.width,im.height);c.getContext('2d').drawImage(im,(im.width-m)/2,(im.height-m)/2,m,m,0,0,z,z);try{localStorage.setItem('mc_pic',c.toDataURL('image/jpeg',.82))}catch(e){}profile()};im.src=r.result};
 r.readAsDataURL(f);
}
function profile(){
 const s=ST(),n=getName(),pic=getPic();
 document.getElementById('v-profile').innerHTML=`<div id="av" style="width:96px;height:96px;border-radius:50%;border:2px solid var(--gold);margin:0 auto;display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:40px;cursor:pointer;background:${pic?`url('${pic}') center/cover`:'transparent'}">${pic?'':(n?esc([...n][0].toUpperCase()):'🙂')}</div>
 <input type="file" id="pf" accept="image/*" hidden>
 <div style="text-align:center"><button class="btn ghost" id="pb" style="width:auto;display:inline-block;padding:8px 16px;font-size:14px;margin:10px 4px 0">📷 ${pic?'Change photo':'Add profile photo'}</button>${pic?'<button class="btn ghost" id="pr" style="width:auto;display:inline-block;padding:8px 16px;font-size:14px;margin:10px 4px 0">Remove</button>':''}</div>
 <h1 style="font-size:26px;margin:12px 0 14px">${n?esc(n):'My Profile'}</h1>
 <input type="text" id="pn" placeholder="Enter your name" value="${esc(n)}" maxlength="24"><button class="btn" id="sv">Save name</button>
 <div class="stats"><div><b>${s.g}</b><span>Games</span></div><div><b>${hi}</b><span>High score</span></div><div><b>${s.s}</b><span>Best streak</span></div></div>
 <p style="text-align:center">${s.a?Math.round(s.c/s.a*100)+'% of your answers are correct.':'Play a challenge to see your progress here.'}</p>
 ${CHANNEL_URL?`<a class="btn ghost" style="text-align:center;text-decoration:none" target="_blank" rel="noopener" href="${CHANNEL_URL}">📲 Join our WhatsApp channel</a>`:''}
 <a class="btn ghost" style="text-align:center;text-decoration:none" href="mailto:mindsetchanger123@gmail.com?subject=Bible%20Challenge%20Feedback">✉️ Send us feedback</a>
 <button class="btn ghost" id="rs">Reset my stats</button><p id="pm" style="text-align:center;margin:10px 0 0"></p>`;
 document.getElementById('sv').onclick=()=>{try{localStorage.setItem('mc_name',document.getElementById('pn').value.trim())}catch(e){}profile();document.getElementById('pm').textContent='Saved ✓'};
 document.getElementById('av').onclick=document.getElementById('pb').onclick=()=>document.getElementById('pf').click();
 document.getElementById('pf').onchange=e=>setPic(e.target.files[0]);
 const pr=document.getElementById('pr');if(pr)pr.onclick=()=>{try{localStorage.removeItem('mc_pic')}catch(e){}profile()};
 document.getElementById('rs').onclick=()=>{try{localStorage.removeItem('mc_stats');localStorage.removeItem('mc_bible_hi')}catch(e){}hi=0;if(document.getElementById('go'))home();profile()};
}
