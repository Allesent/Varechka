const nav=document.querySelector('#nav');
const menuToggle=document.querySelector('.menu-toggle');
menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.textContent=open?'×':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰'}));

const openLetter=document.querySelector('#openLetter');
openLetter.addEventListener('click',()=>{const el=document.querySelector('#letterContent');el.hidden=!el.hidden;openLetter.innerHTML=el.hidden?'Открыть письмо <span>↗</span>':'Закрыть письмо <span>↗</span>'});

const lightbox=document.querySelector('#lightbox');
const lightboxImage=document.querySelector('#lightboxImage');
document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{lightboxImage.src=item.dataset.full;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false')}));
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightboxImage.src=''}
document.querySelector('#closeLightbox').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});

const audio=document.querySelector('#favoriteAudio');
const playButton=document.querySelector('#playTrack');
const playIcon=playButton.querySelector('.play-icon');
const trackCard=document.querySelector('#trackCard');
const playerMessage=document.querySelector('#playerMessage');
const seek=document.querySelector('#seekTrack');
const currentTime=document.querySelector('#currentTime');
const duration=document.querySelector('#duration');
const formatTime=value=>{if(!Number.isFinite(value))return '0:00';const m=Math.floor(value/60);const s=Math.floor(value%60).toString().padStart(2,'0');return `${m}:${s}`};
playButton.addEventListener('click',async()=>{
  if(audio.paused){try{await audio.play();playerMessage.textContent='Сейчас играет её любимая песня.'}catch(error){playerMessage.textContent='Аудиофайл «Amy» ещё не добавлен. Пришли его — и плеер заработает.'}}else{audio.pause();}
});
audio.addEventListener('play',()=>{trackCard.classList.add('playing');playIcon.textContent='Ⅱ';playButton.setAttribute('aria-label','Поставить песню на паузу')});
audio.addEventListener('pause',()=>{trackCard.classList.remove('playing');playIcon.textContent='▶';playButton.setAttribute('aria-label','Воспроизвести песню')});
audio.addEventListener('loadedmetadata',()=>{duration.textContent=formatTime(audio.duration);seek.max=audio.duration||100});
audio.addEventListener('timeupdate',()=>{currentTime.textContent=formatTime(audio.currentTime);if(!seek.matches(':active'))seek.value=audio.currentTime});
seek.addEventListener('input',()=>{if(Number.isFinite(audio.duration))audio.currentTime=Number(seek.value)});
audio.addEventListener('ended',()=>{playerMessage.textContent='Песня закончилась. Можно послушать ещё раз.';seek.value=0});
