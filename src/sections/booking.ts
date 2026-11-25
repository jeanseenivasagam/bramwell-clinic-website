export function initBookingForm(): { preselectClinician: (clinicianValue: string) => void } {
  const container = document.querySelector<HTMLElement>('[data-booking-container]');
  const form = document.querySelector<HTMLFormElement>('[data-booking-form]');
  if (!container || !form) {
    return { preselectClinician: () => undefined };
  }

  const initialFormMarkup = container.innerHTML;

  const bindForm = (activeForm: HTMLFormElement): void => {
    const nameInput = activeForm.querySelector<HTMLInputElement>('#patient-name');
    const emailInput = activeForm.querySelector<HTMLInputElement>('#patient-email');
    const nameError = activeForm.querySelector<HTMLElement>('[data-error-for="name"]');
    const emailError = activeForm.querySelector<HTMLElement>('[data-error-for="email"]');

    const clearErrors = (): void => {
      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';
      nameInput?.removeAttribute('aria-invalid');
      emailInput?.removeAttribute('aria-invalid');
    };

    nameInput?.addEventListener('input', () => {
      if (nameError) nameError.textContent = '';
      nameInput.removeAttribute('aria-invalid');
    });

    emailInput?.addEventListener('input', () => {
      if (emailError) emailError.textContent = '';
      emailInput.removeAttribute('aria-invalid');
    });

    activeForm.addEventListener('submit', (event) => {
      event.preventDefault();
      clearErrors();

      const formData = new FormData(activeForm);
      const name = String(formData.get('name') ?? '').trim();
      const email = String(formData.get('email') ?? '').trim();
      const reason = String(formData.get('reason') ?? '');
      const clinician = String(formData.get('clinician') ?? '');
      const slot = String(formData.get('window') ?? '');
      const insurance = String(formData.get('insurance') ?? '').trim() || 'To be confirmed at check-in';

      let firstInvalid: HTMLElement | null = null;

      if (name.length < 2) {
        if (nameError) nameError.textContent = 'Enter your full name so our front desk can address you.';
        nameInput?.setAttribute('aria-invalid', 'true');
        firstInvalid = nameInput;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        if (emailError) emailError.textContent = 'Enter a valid email address for your visit confirmation.';
        emailInput?.setAttribute('aria-invalid', 'true');
        firstInvalid ??= emailInput;
      }

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      const confirmation = document.createElement('div');
      confirmation.className = 'booking-confirmation';
      confirmation.setAttribute('role', 'status');
      confirmation.setAttribute('aria-live', 'polite');

      const heading = document.createElement('h3');
      heading.className = 'display-h3';
      heading.style.color = 'var(--color-ink)';
      heading.textContent = 'First-visit request received.';

      const note = document.createElement('p');
      note.className = 'body-copy';
      note.style.fontSize = 'var(--text-sm)';
      note.textContent = `Our Portland front desk will email ${email} within one business day with exact open times and a benefits check.`;

      const dl = document.createElement('dl');
      dl.className = 'booking-confirmation__summary';

      const rows: Array<[string, string]> = [
        ['Patient', name],
        ['Visit type', reason],
        ['Clinician', clinician],
        ['Preferred window', slot],
        ['Coverage', insurance]
      ];

      rows.forEach(([label, value]) => {
        const dt = document.createElement('dt');
        dt.textContent = label;
        const dd = document.createElement('dd');
        dd.textContent = value;
        dl.append(dt, dd);
      });

      const resetBtn = document.createElement('button');
      resetBtn.type = 'button';
      resetBtn.className = 'btn btn--secondary';
      resetBtn.textContent = 'Submit another request';
      resetBtn.addEventListener('click', () => {
        container.innerHTML = initialFormMarkup;
        const freshForm = container.querySelector<HTMLFormElement>('[data-booking-form]');
        if (freshForm) {
          bindForm(freshForm);
          freshForm.querySelector<HTMLInputElement>('#patient-name')?.focus();
        }
      });

      const demoNote = document.createElement('p');
      demoNote.className = 'booking-form__note';
      demoNote.textContent = 'Portfolio demonstration: this request stays in your browser and is not transmitted.';

      confirmation.append(heading, note, dl, resetBtn, demoNote);
      container.innerHTML = '';
      container.append(confirmation);
      resetBtn.focus();
    });
  };

  bindForm(form);

  return {
    preselectClinician(clinicianValue: string): void {
      let select = container.querySelector<HTMLSelectElement>('#clinician-pref');
      if (!select) {
        container.innerHTML = initialFormMarkup;
        const freshForm = container.querySelector<HTMLFormElement>('[data-booking-form]');
        if (freshForm) bindForm(freshForm);
        select = container.querySelector<HTMLSelectElement>('#clinician-pref');
      }
      if (select) {
        select.value = clinicianValue;
      }
      document.querySelector('#book')?.scrollIntoView({ behavior: 'smooth' });
      container.querySelector<HTMLInputElement>('#patient-name')?.focus();
    }
  };
}
