// Synapse Flotte — interactions (reveal au scroll, animation du workflow hero, formulaire)

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.rv').forEach((el) => io.observe(el));

// Hero workflow animation
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const steps = [...document.querySelectorAll('#flow .step')];
const line = document.getElementById('flowLine');

function setStage(i) {
  steps.forEach((s, idx) => {
    s.classList.toggle('on', idx <= i);
    s.classList.toggle('done', idx < i);
  });
  const last = steps[Math.min(i, steps.length - 1)];
  const top = steps[0].offsetTop + 14;
  line.style.height = Math.max(0, last.offsetTop + 14 - top) + 'px';
}

if (reduce) {
  setStage(steps.length - 1);
} else {
  let i = 0;
  setStage(0);
  setInterval(() => {
    i = (i + 1) % (steps.length + 1);
    if (i === steps.length) {
      setStage(-1);
    } else {
      setStage(i);
    }
  }, 1500);
}

// Formulaire (front-end uniquement — brancher sur un backend / CRM)
const form = document.getElementById('auditForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  // TODO: envoyer les données (fetch vers un endpoint, Formspree, HubSpot...)
  form.style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
});
