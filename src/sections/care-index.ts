import { CARE_TRACKS, type CareTrack } from '../data/clinic';
import { ICONS } from '../lib/icons';

function renderCarePanel(panel: HTMLElement, track: CareTrack): void {
  panel.setAttribute('aria-labelledby', `care-tab-${track.id}`);
  panel.id = `care-panel-${track.id}`;

  const coveredItems = track.covered
    .map((item) => `<li>${ICONS.checkCircle}<span>${item}</span></li>`)
    .join('');

  const labItems = track.onSiteLabs
    .map((item) => `<li>${ICONS.flask}<span>${item}</span></li>`)
    .join('');

  panel.innerHTML = `
    <div class="care-detail__intro">
      <div class="care-detail__meta">
        <span>${ICONS.clock}${track.visitLength}</span>
        <span>${ICONS.stethoscope}${track.leadClinician}</span>
      </div>
      <h3 class="display-h3">${track.title}</h3>
      <p class="body-copy" style="font-size: var(--text-sm);">${track.description}</p>
      <p class="body-copy" style="font-size: var(--text-xs);">${track.cadence}</p>
      <a class="btn btn--primary btn--sm" href="#book">Book a first visit</a>
    </div>

    <div class="care-detail__columns">
      <div class="care-detail__box">
        <p class="care-detail__subheading">What visits cover</p>
        <ul class="care-detail__list">${coveredItems}</ul>
      </div>
      <div class="care-detail__box">
        <p class="care-detail__subheading">Drawn or run on site</p>
        <ul class="care-detail__list">${labItems}</ul>
      </div>
    </div>
  `;
}

export function initCareIndex(): void {
  const tablist = document.querySelector<HTMLElement>('[data-care-tablist]');
  const panel = document.querySelector<HTMLElement>('[data-care-panel]');
  if (!tablist || !panel) return;

  const buttons: HTMLButtonElement[] = CARE_TRACKS.map((track, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'care-card';
    button.id = `care-tab-${track.id}`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    button.setAttribute('aria-controls', `care-panel-${track.id}`);
    button.tabIndex = index === 0 ? 0 : -1;

    button.innerHTML = `
      <div class="care-card__top">
        <span class="icon-badge icon-badge--accent">${ICONS[track.icon]}</span>
        <span class="care-card__chip tabular">${track.chip}</span>
      </div>
      <div>
        <span class="care-card__title" style="display: block;">${track.title}</span>
        <span class="care-card__summary" style="display: block; margin-top: 0.35rem;">${track.shortSummary}</span>
      </div>
    `;

    tablist.append(button);
    return button;
  });

  const selectTrack = (index: number, moveFocus = false): void => {
    const track = CARE_TRACKS[index];
    if (!track) return;

    buttons.forEach((btn, idx) => {
      const selected = idx === index;
      btn.setAttribute('aria-selected', selected ? 'true' : 'false');
      btn.tabIndex = selected ? 0 : -1;
    });

    renderCarePanel(panel, track);
    if (moveFocus) {
      buttons[index]?.focus();
    }
  };

  buttons.forEach((btn, idx) => {
    btn.addEventListener('click', () => selectTrack(idx));
    btn.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        selectTrack((idx + 1) % buttons.length, true);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        selectTrack((idx - 1 + buttons.length) % buttons.length, true);
      } else if (event.key === 'Home') {
        event.preventDefault();
        selectTrack(0, true);
      } else if (event.key === 'End') {
        event.preventDefault();
        selectTrack(buttons.length - 1, true);
      }
    });
  });

  selectTrack(0);
}
