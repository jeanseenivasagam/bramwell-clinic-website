import { WAIT_SCENARIOS, type WaitScenario, type WaitSegment } from '../data/clinic';
import { ICONS } from '../lib/icons';

function renderTimeBar(segments: WaitSegment[], maxMinutes: number): string {
  return segments
    .map((seg) => {
      const weight = Math.max(10, Math.round((seg.minutes / maxMinutes) * 100));
      return `
        <div class="time-seg time-seg--${seg.kind}" style="flex-grow: ${weight};">
          <span class="time-seg__text">${seg.label}</span>
          <span class="time-seg__min tabular">${seg.minutes}m</span>
        </div>
      `;
    })
    .join('');
}

function renderScenarioPanel(panel: HTMLElement, scenario: WaitScenario): void {
  panel.id = `scenario-panel-${scenario.id}`;
  panel.setAttribute('aria-labelledby', `scenario-tab-${scenario.id}`);

  const stdSum = scenario.standardSegments.reduce((acc, s) => acc + s.minutes, 0);
  const brSum = scenario.bramwellSegments.reduce((acc, s) => acc + s.minutes, 0);
  const scaleMax = Math.max(stdSum, brSum);

  const painMetricsHtml = scenario.painMetrics
    .map(
      (m) => `
        <div class="metric-chip metric-chip--pain">
          <p class="metric-chip__value tabular">${m.value}</p>
          <p class="metric-chip__label">${m.label}</p>
        </div>
      `
    )
    .join('');

  const bramwellMetricsHtml = scenario.bramwellMetrics
    .map(
      (m) => `
        <div class="metric-chip">
          <p class="metric-chip__value tabular">${m.value}</p>
          <p class="metric-chip__label">${m.label}</p>
        </div>
      `
    )
    .join('');

  const painListHtml = scenario.painPoints
    .map((pt) => `<li>${ICONS.alertCircle}<span>${pt}</span></li>`)
    .join('');

  const bramwellListHtml = scenario.bramwellPoints
    .map((pt) => `<li>${ICONS.checkCircle}<span>${pt}</span></li>`)
    .join('');

  panel.innerHTML = `
    <div class="timeline-card">
      <div class="timeline-row">
        <div class="timeline-row__meta">
          <div class="timeline-row__title">
            <span>Typical primary care clinic</span>
            <span class="timeline-row__badge timeline-row__badge--wait">Long wait, rushed care</span>
          </div>
          <span class="timeline-row__total tabular">${scenario.standardTotal}</span>
        </div>
        <div class="time-bar" role="img" aria-label="Typical clinic time breakdown: ${scenario.standardSegments.map((s) => `${s.minutes} minutes ${s.label}`).join(', ')}">
          ${renderTimeBar(scenario.standardSegments, scaleMax)}
        </div>
      </div>

      <div class="timeline-row">
        <div class="timeline-row__meta">
          <div class="timeline-row__title">
            <span>Bramwell Clinic</span>
            <span class="timeline-row__badge timeline-row__badge--bramwell">Fast check-in, full visit</span>
          </div>
          <span class="timeline-row__total tabular">${scenario.bramwellTotal}</span>
        </div>
        <div class="time-bar" role="img" aria-label="Bramwell Clinic time breakdown: ${scenario.bramwellSegments.map((s) => `${s.minutes} minutes ${s.label}`).join(', ')}">
          ${renderTimeBar(scenario.bramwellSegments, scaleMax)}
        </div>
      </div>

      <div class="time-legend" aria-hidden="true">
        <span class="time-legend__item"><span class="time-legend__swatch" style="background: var(--color-wait-bar)"></span>Waiting room delay</span>
        <span class="time-legend__item"><span class="time-legend__swatch" style="background: var(--color-rush-bar)"></span>Rushed slot</span>
        <span class="time-legend__item"><span class="time-legend__swatch" style="background: var(--color-ink)"></span>Unhurried doctor time</span>
        <span class="time-legend__item"><span class="time-legend__swatch" style="background: var(--color-accent)"></span>In-house labs &amp; written plan</span>
      </div>
    </div>

    <div class="contrast-cards">
      <article class="contrast-card contrast-card--pain">
        <div class="contrast-card__head">
          <div>
            <h3 class="display-h3">What a 50-minute wait costs you</h3>
            <p class="body-copy" style="font-size: var(--text-sm); margin-top: var(--space-1);">
              Most of your morning disappears before a doctor ever opens the door.
            </p>
          </div>
          <span class="icon-badge icon-badge--warm">${ICONS.clock}</span>
        </div>

        <div class="contrast-card__metric-row">${painMetricsHtml}</div>

        <ul class="contrast-list">${painListHtml}</ul>
      </article>

      <article class="contrast-card contrast-card--bramwell">
        <img
          class="contrast-card__photo"
          src="./media/clinic-consultation-listening.jpg"
          alt="Dr. Nadia Chen sitting at eye level listening attentively to a patient across a sunlit oak consultation desk"
          width="1408"
          height="768"
          loading="lazy"
        />

        <div class="contrast-card__head">
          <div>
            <h3 class="display-h3">What changes at Bramwell Clinic</h3>
            <p class="body-copy" style="font-size: var(--text-sm); margin-top: var(--space-1);">
              Your appointment starts on time and covers everything in one calm stop.
            </p>
          </div>
          <span class="icon-badge icon-badge--emerald">${ICONS.stethoscope}</span>
        </div>

        <div class="contrast-card__metric-row">${bramwellMetricsHtml}</div>

        <ul class="contrast-list">${bramwellListHtml}</ul>

        <div>
          <a class="btn btn--primary" href="#book">Book a first visit</a>
        </div>
      </article>
    </div>
  `;
}

export function initWaitComparison(): void {
  const tablist = document.querySelector<HTMLElement>('[data-scenario-tabs]');
  const panel = document.querySelector<HTMLElement>('[data-scenario-panel]');
  if (!tablist || !panel) return;

  const buttons = WAIT_SCENARIOS.map((scenario, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'scenario-btn';
    btn.id = `scenario-tab-${scenario.id}`;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    btn.setAttribute('aria-controls', `scenario-panel-${scenario.id}`);
    btn.tabIndex = index === 0 ? 0 : -1;
    btn.textContent = scenario.label;
    tablist.append(btn);
    return btn;
  });

  const selectScenario = (index: number, moveFocus = false): void => {
    const scenario = WAIT_SCENARIOS[index];
    if (!scenario) return;

    buttons.forEach((btn, idx) => {
      const selected = idx === index;
      btn.setAttribute('aria-selected', selected ? 'true' : 'false');
      btn.tabIndex = selected ? 0 : -1;
    });

    renderScenarioPanel(panel, scenario);
    if (moveFocus) {
      buttons[index]?.focus();
    }
  };

  buttons.forEach((btn, idx) => {
    btn.addEventListener('click', () => selectScenario(idx));
    btn.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        selectScenario((idx + 1) % buttons.length, true);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        selectScenario((idx - 1 + buttons.length) % buttons.length, true);
      } else if (event.key === 'Home') {
        event.preventDefault();
        selectScenario(0, true);
      } else if (event.key === 'End') {
        event.preventDefault();
        selectScenario(buttons.length - 1, true);
      }
    });
  });

  selectScenario(0);
}
