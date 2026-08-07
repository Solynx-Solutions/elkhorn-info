const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.primary-nav');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav?.toggleAttribute('data-open', !open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    toggle.setAttribute('aria-expanded', 'false'); nav?.removeAttribute('data-open'); toggle.focus();
  }
});
const slider = document.querySelector('#guestSlider');
const output = document.querySelector('#guestCountValue');
slider?.addEventListener('input', () => { output.value = slider.value; output.textContent = slider.value; });
const form = document.querySelector('#eventForm');
form?.addEventListener('submit', async event => {
  event.preventDefault();
  const status = document.querySelector('#formStatus');
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true; status.textContent = 'Submitting…';
  try {
    const response = await fetch('https://services.leadconnectorhq.com/hooks/dqx7xejokriuUHqNrGvU/webhook-trigger/bac0de25-7a7c-433c-8312-f54d9abcc1f7', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
    if (!response.ok) throw new Error('Submission failed');
    form.reset(); status.textContent = 'Thank you! Our events team will contact you shortly.';
  } catch { status.textContent = 'We could not submit your request. Please try again.'; }
  finally { button.disabled = false; }
});
