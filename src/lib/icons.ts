const iconAttrs =
  'width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

export const ICONS = {
  checkCircle: `<svg ${iconAttrs}><circle cx="12" cy="12" r="9.5"/><path d="m8.5 12.2 2.3 2.3 4.8-5"/></svg>`,
  clock: `<svg ${iconAttrs}><circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3.2 2"/></svg>`,
  alertCircle: `<svg ${iconAttrs}><circle cx="12" cy="12" r="9.5"/><path d="M12 8v4.5"/><path d="M12 16h.01"/></svg>`,
  stethoscope: `<svg ${iconAttrs}><path d="M4.5 3.5v5a5.5 5.5 0 0 0 11 0v-5"/><path d="M8 3.5h-3.5"/><path d="M15.5 3.5H12"/><path d="M10 14v2.5a4.5 4.5 0 0 0 9 0V14"/><circle cx="19" cy="12" r="2"/></svg>`,
  flask: `<svg ${iconAttrs}><path d="M9 3h6"/><path d="M10 3v5.2L5.2 17a2.5 2.5 0 0 0 2.2 3.7h9.2a2.5 2.5 0 0 0 2.2-3.7L14 8.2V3"/><path d="M7.8 14h8.4"/></svg>`,
  heartPulse: `<svg ${iconAttrs}><path d="M19.5 12.6 12 20l-7.5-7.4a5.2 5.2 0 0 1 7.5-7.2 5.2 5.2 0 0 1 7.5 7.2Z"/><path d="M5 12h3.5l1.6-2.8 2.6 5.2 1.8-2.4H19"/></svg>`,
  users: `<svg ${iconAttrs}><path d="M16 20v-1.5a4 4 0 0 0-4-4H6.5a4 4 0 0 0-4 4V20"/><circle cx="9.25" cy="7.5" r="3.5"/><path d="M21.5 20v-1.5a4 4 0 0 0-3-3.85"/><path d="M15.5 4.15a3.5 3.5 0 0 1 0 6.7"/></svg>`,
  moon: `<svg ${iconAttrs}><path d="M20.2 14.5A8.5 8.5 0 0 1 9.5 3.8a8.5 8.5 0 1 0 10.7 10.7Z"/></svg>`,
  calendar: `<svg ${iconAttrs}><rect x="3.5" y="4.5" width="17" height="16" rx="2.5"/><path d="M8 2.5v4"/><path d="M16 2.5v4"/><path d="M3.5 9.5h17"/><path d="m9.5 14.5 1.8 1.8 3.5-3.6"/></svg>`,
  shieldCheck: `<svg ${iconAttrs}><path d="M12 2.8 4.5 6v5.7c0 4.6 3.2 8.8 7.5 9.8 4.3-1 7.5-5.2 7.5-9.8V6L12 2.8Z"/><path d="m9 12.2 2 2 4.2-4.4"/></svg>`,
  mapPin: `<svg ${iconAttrs}><path d="M12 21s-6.5-5.4-6.5-11a6.5 6.5 0 1 1 13 0c0 5.6-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.2"/></svg>`,
  phone: `<svg ${iconAttrs}><path d="M6.5 3.5h3l1.4 4-1.8 1.4a13 13 0 0 0 6 6l1.4-1.8 4 1.4v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z"/></svg>`,
  message: `<svg ${iconAttrs}><path d="M5 18.5 3.5 21V6.5A2.5 2.5 0 0 1 6 4h12a2.5 2.5 0 0 1 2.5 2.5v8A2.5 2.5 0 0 1 18 17H7.5L5 18.5Z"/><path d="M8 9.5h8"/><path d="M8 13h5"/></svg>`,
  car: `<svg ${iconAttrs}><path d="M4.5 14.5 6.2 9a2 2 0 0 1 1.9-1.4h7.8a2 2 0 0 1 1.9 1.4l1.7 5.5"/><rect x="3" y="14" width="18" height="4.5" rx="1.5"/><circle cx="7" cy="18.5" r="1.5"/><circle cx="17" cy="18.5" r="1.5"/></svg>`,
  graduation: `<svg ${iconAttrs}><path d="M2.5 9.5 12 5l9.5 4.5L12 14 2.5 9.5Z"/><path d="M6.5 11.5v4.8c0 1.4 2.5 2.7 5.5 2.7s5.5-1.3 5.5-2.7v-4.8"/></svg>`,
  globe: `<svg ${iconAttrs}><circle cx="12" cy="12" r="9"/><path d="M3.5 9.5h17"/><path d="M3.5 14.5h17"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></svg>`
} as const;

export type IconName = keyof typeof ICONS;
