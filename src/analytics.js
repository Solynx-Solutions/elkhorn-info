(() => {
  if (document.body?.dataset.analyticsMode !== 'development') return;

  const queue = window.__ELKHORN_ANALYTICS__ = window.__ELKHORN_ANALYTICS__ || [];
  const emit = (event, detail = {}) => {
    const payload = { event, route: window.location.pathname, ...detail };
    queue.push(payload);
    window.dispatchEvent(new CustomEvent('elkhorn:conversion', { detail: payload }));
  };

  emit('page_view_dev');

  document.addEventListener('click', event => {
    const target = event.target.closest('[data-conversion-event]');
    if (!target) return;
    emit(target.dataset.conversionEvent || 'cta_click', {
      destination: target.getAttribute('href') || null,
      label: (target.textContent || '').trim().slice(0, 80)
    });
  });

  document.querySelector('#eventForm')?.addEventListener('submit', () => {
    emit('event_inquiry_submit_intent');
  });
})();
