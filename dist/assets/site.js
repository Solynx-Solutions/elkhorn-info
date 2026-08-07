const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.primary-nav');
const closeButton = document.querySelector('.drawer-close');
const backdrop = document.querySelector('[data-drawer-backdrop]');
const header = document.querySelector('[data-site-header]');
const focusable = () => [...(nav?.querySelectorAll('a,button') ?? [])];
function setMenu(open) { toggle?.setAttribute('aria-expanded', String(open)); nav?.toggleAttribute('data-open', open); backdrop?.toggleAttribute('hidden', !open); document.body.toggleAttribute('data-menu-open', open); if (open) closeButton?.focus(); else toggle?.focus(); }
toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
closeButton?.addEventListener('click', () => setMenu(false));
backdrop?.addEventListener('click', () => setMenu(false));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') setMenu(false);
  if (event.key === 'Tab' && toggle?.getAttribute('aria-expanded') === 'true') { const items=focusable(), first=items[0], last=items.at(-1); if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()} else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()} }
});
const updateHeader = () => { header?.toggleAttribute('data-scrolled', window.scrollY > 24); };
updateHeader(); window.addEventListener('scroll', updateHeader, { passive: true });
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.responsive-video video').forEach(video => video.play().catch(() => {}));
}
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
