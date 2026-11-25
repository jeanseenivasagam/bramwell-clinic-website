import './styles/tokens.css';
import './styles/base.css';
import './styles/header-hero.css';
import './styles/wait-comparison.css';
import './styles/sections.css';

import { ACCEPTED_INSURERS, CLINICIANS, SELF_PAY_FEES } from './data/clinic';
import { ICONS } from './lib/icons';
import { initBookingForm } from './sections/booking';
import { initCareIndex } from './sections/care-index';
import { initNav } from './sections/nav';
import { initWaitComparison } from './sections/wait-comparison';

function renderTrustStrip(): void {
  const list = document.querySelector<HTMLElement>('[data-trust-insurers]');
  if (!list) return;
  list.innerHTML = ACCEPTED_INSURERS.map((plan) => `<li>${plan}</li>`).join('');
}

function renderClinicians(onSelectClinician: (value: string) => void): void {
  const grid = document.querySelector<HTMLElement>('[data-clinicians-grid]');
  if (!grid) return;

  grid.innerHTML = CLINICIANS.map(
    (clinician) => `
      <article class="clinician-card">
        <div class="clinician-card__portrait-wrap">
          <img
            class="clinician-card__portrait"
            src="${clinician.portrait}"
            alt="${clinician.portraitAlt}"
            width="896"
            height="1152"
            loading="lazy"
          />
          <span class="clinician-card__availability">
            <span class="clinician-card__dot" aria-hidden="true"></span>
            ${clinician.availability}
          </span>
        </div>
        <div class="clinician-card__body">
          <div>
            <h3 class="clinician-card__name">${clinician.name}</h3>
            <p class="clinician-card__role">${clinician.role}</p>
          </div>
          <p class="clinician-card__bio">${clinician.bio}</p>
          <div class="clinician-card__meta">
            <span class="clinician-card__meta-row">${ICONS.graduation}<span>${clinician.training}</span></span>
            <span class="clinician-card__meta-row">${ICONS.globe}<span>Languages: ${clinician.languages}</span></span>
          </div>
          <div class="clinician-card__cta">
            <button class="btn btn--secondary btn--sm" type="button" data-choose-clinician="${clinician.bookingValue}" style="width: 100%;">
              Book with ${clinician.name.split(',')[0]}
            </button>
          </div>
        </div>
      </article>
    `
  ).join('');

  grid.querySelectorAll<HTMLButtonElement>('[data-choose-clinician]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = btn.dataset.chooseClinician;
      if (value) onSelectClinician(value);
    });
  });
}

function renderPracticals(): void {
  const feeBody = document.querySelector<HTMLElement>('[data-fee-rows]');
  if (!feeBody) return;

  feeBody.innerHTML = SELF_PAY_FEES.map(
    (row) => `
      <tr>
        <td>
          <span class="fee-table__service">${row.service}</span>
          <span class="fee-table__note">${row.note}</span>
        </td>
        <td class="fee-table__price tabular">${row.price}</td>
      </tr>
    `
  ).join('');
}

function bootstrap(): void {
  initNav();
  renderTrustStrip();
  initWaitComparison();
  initCareIndex();

  const booking = initBookingForm();
  renderClinicians((clinicianValue) => booking.preselectClinician(clinicianValue));
  renderPracticals();
}

bootstrap();
