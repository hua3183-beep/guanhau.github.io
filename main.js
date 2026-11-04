var GH_FORM_ENDPOINT='';/* 串接表單服務（如 Formspree）時，將表單網址填在這裡 */
(function(){
var n=document.querySelector('.gh-nav'),b=document.querySelector('.gh-burger');
b.onclick=function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)};
var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.15});
window.ghObs=function(){document.querySelectorAll('.rv,.bar').forEach(function(el){io.observe(el)})};ghObs();
document.querySelectorAll('.pic').forEach(function(p){p.onclick=function(){p.classList.toggle('alt')}});
var tb=document.querySelector('.tabs');
if(tb)tb.onclick=function(e){var b=e.target.closest('button');if(!b)return;
 tb.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)});
 document.querySelectorAll('#pt tbody tr').forEach(function(r){r.hidden=b.dataset.g!=='all'&&r.dataset.g!==b.dataset.g})};
var f=document.getElementById('cf');
if(f)f.onsubmit=function(e){e.preventDefault();
 var d=new FormData(f),o={};d.forEach(function(v,k){o[k]=v});
 var st=document.getElementById('st'),bt=f.querySelector('button[type=submit]');
 if(o._gotcha)return;
 var body='公司名稱：'+o.co+'\n姓名：'+o.name+'\n電話：'+o.tel+'\nEmail：'+(o.email||'')+'\n需求類型：'+o.type+'\n\n'+o.msg;
 var subj='【網站詢問】'+o.co+'－'+o.type+'－'+o.name;
 function mail(){location.href='mailto:janchan.steel@msa.hinet.net?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
  st.textContent='已為您開啟郵件程式，請在郵件程式中按「寄出」；若沒有開啟，請改用「複製 Email」或來電。'}
 if(GH_FORM_ENDPOINT){bt.disabled=true;bt.textContent='送出中…';
  fetch(GH_FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
   body:JSON.stringify({公司名稱:o.co,姓名:o.name,電話:o.tel,Email:o.email,需求類型:o.type,內容:o.msg,_subject:subj})})
  .then(function(r){if(!r.ok)throw 0;st.textContent='已送出，我們會盡快與您聯絡。';f.reset()})
  .catch(function(){mail()}).then(function(){bt.disabled=false;bt.textContent='寄出詢問'})}
 else mail()};
var c=document.getElementById('cp');
if(c)c.onclick=function(){var t='janchan.steel@msa.hinet.net';
 (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){c.textContent='已複製 ✓'},function(){c.textContent=t})};
})();