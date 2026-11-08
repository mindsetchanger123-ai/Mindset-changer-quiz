// Resting hours (optional). When switched ON, visitors see an "Admin is resting" message
// during the hours below (Zambia time) and the quiz reopens automatically afterwards.
// TO SWITCH ON: change  on:false  to  on:true  and save.   TO SWITCH OFF: change it back to false.
window.REST={
  on:false,   // false = quiz always open, true = resting hours active
  from:23,    // rest starts at this hour (23 = 11 PM)
  to:5        // quiz reopens at this hour (5 = 5 AM)
};
(function(){
  const R=window.REST||{};
  if(!R.on)return;
  const FROM=R.from!=null?R.from:23,TO=R.to!=null?R.to:5;
  const hour=()=>{try{return +new Intl.DateTimeFormat('en-GB',{hour:'numeric',hour12:false,timeZone:'Africa/Lusaka'}).format(new Date())%24}catch(e){return new Date().getHours()}};
  const resting=()=>{const h=hour();return FROM>TO?(h>=FROM||h<TO):(h>=FROM&&h<TO)};
  let isRest=false;
  function chk(){
    const r=resting();
    if(r&&!isRest){
      isRest=true;clearInterval(timer);
      $.innerHTML=`<div class="big">😴</div><h1>Admin is resting</h1><p style="text-align:center">Kindly try again tomorrow. The Bible Challenge reopens at ${TO}:00 AM (Zambia time). Thank you for your patience and God bless you.</p>${CHANNEL_URL?`<a class="btn" style="text-align:center;text-decoration:none" target="_blank" rel="noopener" href="${CHANNEL_URL}">📲 Join our WhatsApp channel meanwhile</a>`:''}`;
    }else if(!r&&isRest){isRest=false;home();}
  }
  chk();setInterval(chk,60000);
})();
