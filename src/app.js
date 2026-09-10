(() => {
  const music=document.querySelector('#background-music');
  const musicButton=document.querySelector('#music-toggle');
  if(music&&musicButton){
    const volume=document.querySelector('#music-volume');
    const status=document.querySelector('#music-status');
    music.volume=Math.min(1,Math.max(0,Number(volume.value)/100));
    const sync=()=>{musicButton.setAttribute('aria-pressed',String(!music.paused));musicButton.textContent=music.paused?'♫ Ativar música':'Ⅱ Pausar música';};
    musicButton.addEventListener('click',async()=>{if(!music.paused){music.pause();return;}musicButton.disabled=true;status.textContent='';try{await music.play();}catch{status.textContent='Não foi possível tocar a música. Tente novamente.';}finally{musicButton.disabled=false;sync();}});
    music.addEventListener('play',sync);music.addEventListener('pause',sync);
    music.addEventListener('error',()=>{status.textContent='Música indisponível no momento.';sync();});
    volume.addEventListener('input',()=>{music.volume=Number(volume.value)/100;});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)music.pause();});
    window.addEventListener('pagehide',()=>music.pause());
  }
  const toggle=document.querySelector('.menu-toggle');
  const nav=document.querySelector('#navigation');
  function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');}
  toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
  nav?.querySelectorAll('a,button').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();toggle.focus();}});
  document.addEventListener('click',event=>{if(!event.target.closest('.header'))closeMenu();});
  const filters=[...document.querySelectorAll('[data-filter]')];
  const cards=[...document.querySelectorAll('#catalog-grid .product-card')];
  function filter(value){if(!filters.some(b=>b.dataset.filter===value))value='todos';filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===value)));let count=0;cards.forEach(card=>{const show=value==='todos'||card.dataset.category.split(' ').includes(value);card.hidden=!show;if(show)count++;});const status=document.querySelector('.result-count');if(status)status.textContent=`${count} ${count===1?'modelo':'modelos'}`;const empty=document.querySelector('#empty-state');if(empty)empty.hidden=count>0;}
  filters.forEach(b=>b.addEventListener('click',()=>{filter(b.dataset.filter);const url=new URL(location.href);if(b.dataset.filter==='todos')url.searchParams.delete('categoria');else url.searchParams.set('categoria',b.dataset.filter);history.replaceState({},'',url);}));
  if(filters.length)filter(new URLSearchParams(location.search).get('categoria')||'todos');
  const contactDialog=document.querySelector('#contact-dialog');
  document.querySelectorAll('[data-contact-pending],[data-instagram-pending]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#contact-title').textContent=button.hasAttribute('data-instagram-pending')?'Nosso Instagram':'Nosso WhatsApp';document.querySelector('#contact-message').textContent=button.hasAttribute('data-instagram-pending')?'O perfil oficial da Mariella será disponibilizado em breve. Enquanto isso, conheça as inspirações do nosso catálogo.':'O WhatsApp oficial da Mariella será disponibilizado em breve. Enquanto isso, explore os modelos e escolha sua inspiração.';contactDialog.showModal();}));
  document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelectorAll('.dialog-close,.dialog-dismiss').forEach(b=>b.addEventListener('click',()=>dialog.close()));dialog.addEventListener('keydown',event=>{if(event.key!=='Tab')return;const focusable=[...dialog.querySelectorAll('button:not([disabled]),a[href],[tabindex="0"]')].filter(el=>el.getClientRects().length);const first=focusable[0],last=focusable.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}});dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});});
  const data=document.querySelector('#gallery-data');
  if(!data)return;
  const images=JSON.parse(data.textContent),dialog=document.querySelector('.lightbox'),main=document.querySelector('.main-photo img'),large=dialog.querySelector('img');
  let index=0;
  function select(next){index=(next+images.length)%images.length;const im=images[index];main.src=im.src;main.srcset=im.srcset;main.alt=im.alt;main.width=im.width;main.height=im.height;large.src=im.full;large.alt=im.alt;large.width=im.width;large.height=im.height;document.querySelectorAll('[data-image-index]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));dialog.querySelector('.lightbox-count').textContent=`Foto ${index+1} de ${images.length}`;}
  document.querySelectorAll('[data-image-index]').forEach(b=>b.addEventListener('click',()=>select(Number(b.dataset.imageIndex))));
  document.querySelector('.main-photo').addEventListener('click',()=>{select(index);dialog.showModal();});
  dialog.querySelector('.lightbox-prev').addEventListener('click',()=>select(index-1));dialog.querySelector('.lightbox-next').addEventListener('click',()=>select(index+1));
  dialog.querySelectorAll('.lightbox-prev,.lightbox-next').forEach(b=>b.hidden=images.length===1);
  dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();select(index-1);}if(event.key==='ArrowRight'){event.preventDefault();select(index+1);}});
  let touchX=null;large.addEventListener('touchstart',event=>{touchX=event.changedTouches[0].clientX;},{passive:true});large.addEventListener('touchend',event=>{if(touchX!==null){const delta=event.changedTouches[0].clientX-touchX;if(Math.abs(delta)>50)select(index+(delta<0?1:-1));touchX=null;}},{passive:true});
})();
