'use strict';
(() => {
  const button = document.querySelector('#install-app');
  const dialog = document.querySelector('#install-dialog');
  const message = document.querySelector('#connection-status');
  let installPrompt;
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const refresh = () => {
    button.hidden = standalone();
    message.hidden = navigator.onLine;
  };
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
  });
  window.addEventListener('appinstalled', () => { installPrompt = null; refresh(); });
  window.addEventListener('online', refresh);
  window.addEventListener('offline', refresh);
  matchMedia('(display-mode: standalone)').addEventListener('change', refresh);
  button.addEventListener('click', async () => {
    if (!installPrompt) { dialog.showModal(); return; }
    const prompt = installPrompt;
    installPrompt = null;
    try { await prompt.prompt(); await prompt.userChoice; }
    catch { dialog.showModal(); }
  });
  refresh();
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {
        document.querySelector('#offline-note').textContent = '離線功能目前無法啟用，請保持網路連線使用。';
      });
    });
  } else {
    document.querySelector('#offline-note').textContent = '此瀏覽器不支援離線開啟，請保持網路連線使用。';
  }
})();
