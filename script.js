const bootLines = [
  {p:true, t:'whoami'},
  {o:true, t:'amit-sain · full-stack engineer · bhiwadi, in'},
  {p:true, t:'cat skills.json | head -4'},
  {o:true, t:'["react", "javascript", "node", "SQL", ...]'},
  {p:true, t:'./run --status'},
  {o:true, t:'> 3 production apps shipped'},
  {o:true, t:'> open to senior full-stack roles'},
  {p:true, t:'echo $WELCOME'},
  {o:true, t:'Thanks for stopping by — scroll to see the work.'},
];

const termBody = document.getElementById('termBody');
let lineIdx = 0;

function renderLine(line){
  const div = document.createElement('div');
  div.className = 'term-line';
  if(line.p){
    div.innerHTML = '<span class="term-prompt">➜</span> <span class="term-key">~</span> ';
    const span = document.createElement('span');
    span.className = 'term-out';
    div.appendChild(span);
    termBody.appendChild(div);
    typeInto(span, line.t, ()=>{ lineIdx++; setTimeout(nextLine, 260); });
  } else {
    div.innerHTML = '<span class="term-comment">' + escapeHtml(line.t) + '</span>';
    termBody.appendChild(div);
    lineIdx++;
    setTimeout(nextLine, 320);
  }
}

function typeInto(el, text, done){
  let i = 0;
  const speed = 28;
  function step(){
    if(i <= text.length){
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(step, speed);
    } else {
      done();
    }
  }
  step();
}

function escapeHtml(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function nextLine(){
  if(lineIdx < bootLines.length){
    renderLine(bootLines[lineIdx]);
  }
}

// kick off boot once hero is in view (immediately, it's above the fold)
window.addEventListener('DOMContentLoaded', ()=>{
  setTimeout(nextLine, 500);
});

// ---------- Hero subtitle typing loop ----------
const roles = [
  'Building products end-to-end, frontend to infra.',
  'React + Node, shipped with tests and CI.',
];
const typeText = document.getElementById('typeText');
let roleIdx = 0;

function typeRole(){
  const text = roles[roleIdx];
  let i = 0;
  typeText.textContent = '';
  function typeStep(){
    if(i <= text.length){
      typeText.textContent = text.slice(0, i);
      i++;
      requestAnimationFrame(()=> setTimeout(typeStep, 32));
    } else {
      setTimeout(eraseRole, 2400);
    }
  }
  typeStep();
}

function eraseRole(){
  const text = typeText.textContent;
  let i = text.length;
  function eraseStep(){
    if(i >= 0){
      typeText.textContent = text.slice(0, i);
      i--;
      setTimeout(eraseStep, 16);
    } else {
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(typeRole, 300);
    }
  }
  eraseStep();
}

typeRole();

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
revealEls.forEach(el=>observer.observe(el));

// ---------- Active nav tab on scroll ----------
const sections = ['about','projects','experience','contact'].map(id=>document.getElementById(id));
const tabs = document.querySelectorAll('.nav-tab');

function updateActiveTab(){
  let current = sections[0];
  const scrollPos = window.scrollY + 140;
  sections.forEach(sec=>{
    if(sec && sec.offsetTop <= scrollPos){ current = sec; }
  });
  tabs.forEach(tab=>{
    tab.classList.toggle('active', current && tab.dataset.tab === current.id);
  });
}
window.addEventListener('scroll', updateActiveTab, {passive:true});
updateActiveTab();

// ---------- Contact form (front-end only demo) ----------
// function handleSubmit(e){
//   e.preventDefault();
//   const btn = document.getElementById('submitBtn');
//   const note = document.getElementById('formNote');
//   const original = btn.textContent;
//   btn.textContent = 'Sending…';
//   btn.disabled = true;
//   setTimeout(()=>{
//     btn.textContent = 'Message sent ✓';
//     note.textContent = '// wire this up to Formspree, Resend, or your backend of choice';
//     setTimeout(()=>{
//       btn.textContent = original;
//       btn.disabled = false;
//       e.target.reset();
//     }, 2400);
//   }, 900);
//   return false;
// }

function handleSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const whatsappNumber = "9610841282"; // Your WhatsApp number

  const whatsappMessage =
    `New Portfolio Contact

    Name: ${name}
    Email: ${email}

    Message:
    ${message}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(url, "_blank");

    // Show success message
    document.getElementById("successMessage").style.display = "block";

    // Clear form
    document.getElementById("contactForm").reset();

    // Hide message after 4 seconds
    setTimeout(() => {
      document.getElementById("successMessage").style.display = "none";
    }, 4000);

  return false;
}