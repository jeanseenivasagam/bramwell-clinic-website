import type { IconName } from '../lib/icons';

export interface WaitSegment {
  label: string;
  minutes: number;
  kind: 'wait' | 'rush' | 'offsite' | 'checkin' | 'doctor' | 'labs';
}

export interface WaitScenario {
  id: string;
  label: string;
  standardTotal: string;
  bramwellTotal: string;
  standardSegments: WaitSegment[];
  bramwellSegments: WaitSegment[];
  painMetrics: Array<{ value: string; label: string }>;
  bramwellMetrics: Array<{ value: string; label: string }>;
  painPoints: string[];
  bramwellPoints: string[];
}

export interface CareTrack {
  id: string;
  icon: IconName;
  chip: string;
  title: string;
  shortSummary: string;
  visitLength: string;
  leadClinician: string;
  description: string;
  covered: string[];
  onSiteLabs: string[];
  cadence: string;
}

export interface Clinician {
  id: string;
  name: string;
  role: string;
  portrait: string;
  portraitAlt: string;
  bio: string;
  training: string;
  languages: string;
  availability: string;
  bookingValue: string;
}

export interface FeeRow {
  service: string;
  note: string;
  price: string;
}

export const WAIT_SCENARIOS: WaitScenario[] = [
  {
    id: 'new-patient',
    label: 'New patient visit',
    standardTotal: '87 min spent for 12 min of care',
    bramwellTotal: '55 min total, all under one roof',
    standardSegments: [
      { label: 'Waiting room & clipboards', minutes: 50, kind: 'wait' },
      { label: 'Rushed exam', minutes: 12, kind: 'rush' },
      { label: 'Drive to off-site lab', minutes: 25, kind: 'offsite' }
    ],
    bramwellSegments: [
      { label: 'Calm check-in', minutes: 5, kind: 'checkin' },
      { label: 'Doctor listening & full exam', minutes: 40, kind: 'doctor' },
      { label: 'On-site draw & plan', minutes: 10, kind: 'labs' }
    ],
    painMetrics: [
      { value: '50 min', label: 'Average lobby & exam-room wait' },
      { value: '12 min', label: 'Actual face-to-face doctor time' }
    ],
    bramwellMetrics: [
      { value: '4.8 min', label: 'Average check-in before your visit' },
      { value: '3.3x', label: 'More uninterrupted clinician time' }
    ],
    painPoints: [
      'Double-booked schedules leave you sitting in a crowded lobby past your slot.',
      'Asked to pick only one concern so the provider does not fall further behind.',
      'Sent across town with a paper lab order and left guessing what results mean.'
    ],
    bramwellPoints: [
      'We book fewer patients per day, so your room is ready when you arrive.',
      'Your doctor reviews prior records ahead of time and covers your full list.',
      'Baseline labs are drawn down the hall and posted with plain written notes.'
    ]
  },
  {
    id: 'sick-visit',
    label: 'Same-week sick visit',
    standardTotal: '74 min spent across urgent care',
    bramwellTotal: '34 min with your own clinician',
    standardSegments: [
      { label: 'Urgent care lobby wait', minutes: 48, kind: 'wait' },
      { label: 'Brief stranger consult', minutes: 10, kind: 'rush' },
      { label: 'Pharmacy & follow-up chase', minutes: 16, kind: 'offsite' }
    ],
    bramwellSegments: [
      { label: 'Check-in', minutes: 4, kind: 'checkin' },
      { label: 'Visit with your primary doctor', minutes: 22, kind: 'doctor' },
      { label: 'Rapid strep/flu + Rx', minutes: 8, kind: 'labs' }
    ],
    painMetrics: [
      { value: '3 weeks', label: 'Typical primary care wait for sick slots' },
      { value: '48 min', label: 'Average walk-in urgent care wait' }
    ],
    bramwellMetrics: [
      { value: 'Same week', label: 'Protected daily slots for urgent needs' },
      { value: '4 min', label: 'Straight into a private exam room' }
    ],
    painPoints: [
      'Primary clinic says next opening is three weeks out, forcing an urgent care visit.',
      'You explain your allergies and history from scratch to a clinician you will never see again.',
      'Your regular doctor never sees the follow-up chart.'
    ],
    bramwellPoints: [
      'Every clinician holds daily same-week openings for established patients.',
      'Rapid strep, flu, COVID, and urinalysis run on site during your appointment.',
      'One chart, one clinician, and a direct message check-in two days later.'
    ]
  },
  {
    id: 'annual-labs',
    label: 'Annual physical & labs',
    standardTotal: '92 min across two separate trips',
    bramwellTotal: '55 min in one morning visit',
    standardSegments: [
      { label: 'Clinic wait + second lab wait', minutes: 52, kind: 'wait' },
      { label: 'Quick checklist exam', minutes: 15, kind: 'rush' },
      { label: 'Separate draw-center trip', minutes: 25, kind: 'offsite' }
    ],
    bramwellSegments: [
      { label: 'Check-in', minutes: 5, kind: 'checkin' },
      { label: 'Preventive exam & risk map', minutes: 40, kind: 'doctor' },
      { label: 'On-site draw', minutes: 10, kind: 'labs' }
    ],
    painMetrics: [
      { value: '2 trips', label: 'Clinic appointment plus separate lab visit' },
      { value: 'Raw PDF', label: 'Confusing lab ranges with no explanation' }
    ],
    bramwellMetrics: [
      { value: '1 visit', label: 'Physical, EKG, and blood draw together' },
      { value: '48 hrs', label: 'Doctor-annotated lab notes in plain English' }
    ],
    painPoints: [
      'Fasting all morning only to wait 35+ minutes at a busy off-site draw chain.',
      'Lab results appear in a portal with alarming red arrows and zero guidance.',
      'Preventive risks get missed when nobody tracks trends year over year.'
    ],
    bramwellPoints: [
      'Book an early 7:30 AM fasting visit and complete exam plus draw in one stop.',
      'Our phlebotomist is steps away from your exam room.',
      'Your doctor writes a clear note explaining every number and next step.'
    ]
  }
];

export const CARE_TRACKS: CareTrack[] = [
  {
    id: 'preventive',
    icon: 'stethoscope',
    chip: '50 min visit',
    title: 'Preventive primary care',
    shortSummary: 'Annual physicals, baseline risk mapping, and protected same-week sick visits.',
    visitLength: '50-minute intake or annual visit',
    leadClinician: 'Your assigned primary clinician',
    description:
      'Preventive care works when your doctor knows your baseline across years instead of reacting to isolated lab flags.',
    covered: [
      'Comprehensive annual physical and family risk mapping',
      'Cardiovascular, metabolic, and age-based cancer screening',
      'Same-week sick visits for sudden infections or injuries',
      'Adult vaccines and routine preventive prescriptions'
    ],
    onSiteLabs: [
      'Complete metabolic panel and CBC',
      'Lipid panel with ApoB and Lp(a) when indicated',
      'HbA1c, fasting insulin, and thyroid markers',
      'Rapid strep, flu, COVID, and urinalysis checks'
    ],
    cadence: 'Annual baseline physical plus in-person or video follow-ups whenever needed.'
  },
  {
    id: 'diagnostics',
    icon: 'flask',
    chip: '48 hr results',
    title: 'In-house diagnostics',
    shortSummary: 'Blood draws, 12-lead EKGs, spirometry, and plain-English annotated lab notes.',
    visitLength: 'Completed during your visit',
    leadClinician: 'Doctor-reviewed within 48 hours',
    description:
      'Skip the crowded off-site draw center. We collect specimens down the hall and explain every lab marker in plain language.',
    covered: [
      '12-lead resting electrocardiogram (EKG)',
      'Office spirometry for asthma and shortness of breath',
      'Home blood pressure monitor loan program',
      'Written clinician commentary on every lab report'
    ],
    onSiteLabs: [
      'Iron, ferritin, B12, folate, and vitamin D',
      'Hormone and reproductive baseline panels',
      'Inflammatory and autoimmune screening markers',
      'Point-of-care glucose and hemoglobin checks'
    ],
    cadence: 'Annotated lab summaries post within two business days.'
  },
  {
    id: 'chronic',
    icon: 'heartPulse',
    chip: 'Quarterly care',
    title: 'Chronic condition care',
    shortSummary: 'Steady management for blood pressure, diabetes, thyroid, and asthma.',
    visitLength: '30- to 50-minute check-ins',
    leadClinician: 'Warm referrals to Portland specialists',
    description:
      'Long-term conditions improve with steady adjustments between visits and direct coordination with OHSU and Legacy specialists.',
    covered: [
      'Hypertension and cholesterol medication titration',
      'Type 2 diabetes, prediabetes, and CGM review',
      'Hypothyroidism and Hashimoto monitoring',
      'Direct coordination with local cardiologists and endocrinologists'
    ],
    onSiteLabs: [
      'Quarterly HbA1c and kidney function checks',
      'TSH, Free T4, and antibody follow-ups',
      'Electrolyte and liver safety panels for medications',
      'Structured home blood pressure log reviews'
    ],
    cadence: 'Every 3 to 6 months, with message check-ins after dose changes.'
  },
  {
    id: 'womens-family',
    icon: 'users',
    chip: 'Ages 14+',
    title: 'Women and family health',
    shortSummary: 'Perimenopause, reproductive care, postpartum recovery, and teen primary care.',
    visitLength: '50-minute unhurried visits',
    leadClinician: 'Dr. Nadia Chen & Claire Lindholm, FNP',
    description:
      'Symptoms around hormones, fatigue, or pelvic health deserve thorough listening and clear, evidence-based options.',
    covered: [
      'Perimenopause and menopause symptom care',
      'Contraception counseling and routine gynecologic exams',
      'Postpartum primary care and iron/thyroid recovery',
      'Sports physicals and primary care for teens 14 and older'
    ],
    onSiteLabs: [
      'Cervical screening and confidential STI testing',
      'Ferritin, thyroid, and anemia panels',
      'Bone density imaging coordination',
      'Pregnancy confirmation and early baseline labs'
    ],
    cadence: 'Annual preventive visits with dedicated symptom follow-ups as needed.'
  },
  {
    id: 'mental-sleep',
    icon: 'moon',
    chip: 'Integrated care',
    title: 'Sleep, stress, and mood',
    shortSummary: 'Anxiety, depression, and insomnia care connected to your medical health.',
    visitLength: '50-minute initial evaluation',
    leadClinician: 'Primary care + local therapy referrals',
    description:
      'Poor sleep and burnout show up physically first. We rule out medical drivers like thyroid shifts or sleep apnea alongside thoughtful care.',
    covered: [
      'Screening and treatment for anxiety and depression',
      'Insomnia workups and home sleep apnea test coordination',
      'Careful medication starts with two-week check-ins',
      'Vetted referrals to Portland therapists and psychiatrists'
    ],
    onSiteLabs: [
      'Thyroid and B12 deficiency rule-outs',
      'Ferritin and metabolic screening',
      'Baseline EKG before specific prescriptions when needed',
      'Simple sleep and mood tracking between visits'
    ],
    cadence: 'Two-week check-in after any new plan, then monthly until steady.'
  }
];

export const CLINICIANS: Clinician[] = [
  {
    id: 'chen',
    name: 'Dr. Nadia Chen, MD',
    role: 'Medical Director, Internal Medicine',
    portrait: './media/clinician-nadia.jpg',
    portraitAlt: 'Portrait of Dr. Nadia Chen standing by a sunlit oak doorway at Bramwell Clinic',
    bio: 'Practiced eleven years in community internal medicine after UCSF before founding Bramwell Clinic to bring back unhurried adult care.',
    training: 'MD, OHSU; Residency, UCSF',
    languages: 'English, Mandarin',
    availability: 'Openings next month',
    bookingValue: 'Dr. Nadia Chen, MD'
  },
  {
    id: 'okafor',
    name: 'Dr. David Okafor, MD',
    role: 'Preventive & Cardiometabolic Physician',
    portrait: './media/clinician-david.jpg',
    portraitAlt: 'Portrait of Dr. David Okafor in a pale oak corridor at Bramwell Clinic',
    bio: 'Focuses on preventive cardiology, blood pressure, complex medication reviews, and practical long-term plans for busy adults.',
    training: 'MD, Univ. of Washington; Swedish Cherry Hill',
    languages: 'English',
    availability: 'Openings this week',
    bookingValue: 'Dr. David Okafor, MD'
  },
  {
    id: 'lindholm',
    name: 'Claire Lindholm, MSN, FNP-BC',
    role: 'Primary Care & Women\'s Health Clinician',
    portrait: './media/clinician-claire.jpg',
    portraitAlt: 'Portrait of Claire Lindholm near frosted architectural glass at Bramwell Clinic',
    bio: 'Nine years in outpatient primary care and perimenopause care, known for clear written visit summaries and thoughtful lab walkthroughs.',
    training: 'MSN, Univ. of Portland; OHSU Fellowship',
    languages: 'English, Spanish',
    availability: 'Openings this week',
    bookingValue: 'Claire Lindholm, FNP-BC'
  }
];

export const SELF_PAY_FEES: FeeRow[] = [
  {
    service: 'New patient visit (50 min)',
    note: 'Full history, physical exam, written care plan, and lab review',
    price: '$240'
  },
  {
    service: 'Follow-up or sick visit (30 min)',
    note: 'In person at NW 11th Ave or by video',
    price: '$145'
  },
  {
    service: 'Annual preventive exam (50 min)',
    note: 'Covered at $0 with most in-network commercial plans',
    price: '$240'
  },
  {
    service: 'In-house baseline blood panel',
    note: 'CBC, CMP, lipids, HbA1c, and TSH drawn on site',
    price: '$48'
  },
  {
    service: 'Resting 12-lead EKG',
    note: 'Performed and read during your appointment',
    price: '$55'
  }
];

export const ACCEPTED_INSURERS: string[] = [
  'Regence BlueCross',
  'Moda Health',
  'Providence Health Plan',
  'PacificSource',
  'Aetna',
  'Cigna',
  'UnitedHealthcare',
  'Medicare'
];
