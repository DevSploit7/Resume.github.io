// Minimal JS: copy email to clipboard with graceful fallback
(function(){
  const btn = document.getElementById('copyBtn');
  const email = document.getElementById('email');
  if(!btn || !email) return;

  btn.addEventListener('click', async function(){
    const text = email.textContent.trim();
    if(navigator.clipboard){
      try{
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied ✓';
        setTimeout(()=> btn.textContent = 'Copy', 1200);
      }catch(e){
        fallbackCopy(text);
      }
    } else {
      fallbackCopy(text);
    }
  });

  function fallbackCopy(text){
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta);
    ta.select();
    try{ document.execCommand('copy'); btn.textContent = 'Copied ✓'; setTimeout(()=> btn.textContent = 'Copy', 1200); }catch(e){ alert('Copy failed — select & copy manually'); }
    ta.remove();
  }
})();
