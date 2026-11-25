export function initNav(): void {
  const toggleBtn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const drawer = document.querySelector<HTMLElement>('[data-mobile-drawer]');
  const drawerLinks = document.querySelectorAll<HTMLAnchorElement>('[data-drawer-link]');

  const closeDrawer = (): void => {
    if (!drawer || !toggleBtn) return;
    drawer.classList.remove('is-open');
    drawer.hidden = true;
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
  };

  const openDrawer = (): void => {
    if (!drawer || !toggleBtn) return;
    drawer.hidden = false;
    drawer.classList.add('is-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';
  };

  toggleBtn?.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => closeDrawer());
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggleBtn?.getAttribute('aria-expanded') === 'true') {
      closeDrawer();
      toggleBtn.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 960 && toggleBtn?.getAttribute('aria-expanded') === 'true') {
      closeDrawer();
    }
  });
}
