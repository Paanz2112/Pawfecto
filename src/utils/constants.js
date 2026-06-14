export const INITIAL_PETS = [
  {
    id: '1',
    name: 'Luna',
    species: 'Dog',
    breed: 'Golden Retriever',
    birthdate: '2023-08-15',
    photo: '', // Base64 or empty for placeholder avatar
    notes: 'Very energetic, allergic to chicken.',
    weightLogs: [
      { date: '2025-06-10', weight: 22.0 },
      { date: '2025-07-12', weight: 22.5 },
      { date: '2025-08-15', weight: 23.1 },
      { date: '2025-09-11', weight: 23.8 },
      { date: '2025-10-14', weight: 24.2 },
      { date: '2025-11-12', weight: 24.9 },
      { date: '2025-12-10', weight: 25.3 },
      { date: '2026-01-15', weight: 25.8 },
      { date: '2026-02-12', weight: 26.2 },
      { date: '2026-03-14', weight: 26.7 },
      { date: '2026-04-16', weight: 27.1 },
      { date: '2026-05-15', weight: 27.4 },
      { date: '2026-06-12', weight: 27.8 }
    ],
    vaccineLogs: [
      { id: 'v1', date: '2025-06-15', vaccineName: 'DHPP Core Vaccine', brand: 'Nobivac', notes: 'First booster given' },
      { id: 'v2', date: '2026-06-05', vaccineName: 'Rabies Vaccine', brand: 'Defensor 3', notes: 'Annual renewal' }
    ]
  },
  {
    id: '2',
    name: 'Milo',
    species: 'Cat',
    breed: 'British Shorthair',
    birthdate: '2024-02-10',
    photo: '',
    notes: 'Loves sleeping in boxes. Regular dental checkup recommended.',
    weightLogs: [
      { date: '2025-06-10', weight: 3.8 },
      { date: '2025-07-12', weight: 3.9 },
      { date: '2025-08-15', weight: 4.1 },
      { date: '2025-09-11', weight: 4.2 },
      { date: '2025-10-14', weight: 4.2 },
      { date: '2025-11-12', weight: 4.3 },
      { date: '2025-12-10', weight: 4.4 },
      { date: '2026-01-15', weight: 4.5 },
      { date: '2026-02-12', weight: 4.6 },
      { date: '2026-03-14', weight: 4.6 },
      { date: '2026-04-16', weight: 4.7 },
      { date: '2026-05-15', weight: 4.8 },
      { date: '2026-06-10', weight: 4.8 }
    ],
    vaccineLogs: [
      { id: 'v3', date: '2025-08-20', vaccineName: 'Feline Leukemia Vaccine', brand: 'Purevax', notes: 'Well tolerated' }
    ]
  }
];

export const INITIAL_EXPENSES = [
  // Luna Food (Monthly)
  { id: 'e_l1', petId: '1', category: 'Food', amount: 850, date: '2025-06-05', description: 'Premium Kibble 12kg' },
  { id: 'e_l2', petId: '1', category: 'Food', amount: 850, date: '2025-07-05', description: 'Premium Kibble 12kg' },
  { id: 'e_l3', petId: '1', category: 'Food', amount: 850, date: '2025-08-05', description: 'Premium Kibble 12kg' },
  { id: 'e_l4', petId: '1', category: 'Food', amount: 850, date: '2025-09-05', description: 'Premium Kibble 12kg' },
  { id: 'e_l5', petId: '1', category: 'Food', amount: 850, date: '2025-10-05', description: 'Premium Kibble 12kg' },
  { id: 'e_l6', petId: '1', category: 'Food', amount: 850, date: '2025-11-05', description: 'Premium Kibble 12kg' },
  { id: 'e_l7', petId: '1', category: 'Food', amount: 850, date: '2025-12-05', description: 'Premium Kibble 12kg' },
  { id: 'e_l8', petId: '1', category: 'Food', amount: 850, date: '2026-01-05', description: 'Premium Kibble 12kg' },
  { id: 'e_l9', petId: '1', category: 'Food', amount: 850, date: '2026-02-05', description: 'Premium Kibble 12kg' },
  { id: 'e_la', petId: '1', category: 'Food', amount: 850, date: '2026-03-05', description: 'Premium Kibble 12kg' },
  { id: 'e_lb', petId: '1', category: 'Food', amount: 850, date: '2026-04-05', description: 'Premium Kibble 12kg' },
  { id: 'e_lc', petId: '1', category: 'Food', amount: 850, date: '2026-05-05', description: 'Premium Kibble 12kg' },
  { id: 'e_ld', petId: '1', category: 'Food', amount: 850, date: '2026-06-05', description: 'Premium Kibble 12kg' },

  // Milo Food (Monthly)
  { id: 'e_m1', petId: '2', category: 'Food', amount: 450, date: '2025-06-12', description: 'Wet Canned Food (Case)' },
  { id: 'e_m2', petId: '2', category: 'Food', amount: 450, date: '2025-07-12', description: 'Wet Canned Food (Case)' },
  { id: 'e_m3', petId: '2', category: 'Food', amount: 450, date: '2025-08-12', description: 'Wet Canned Food (Case)' },
  { id: 'e_m4', petId: '2', category: 'Food', amount: 450, date: '2025-09-12', description: 'Wet Canned Food (Case)' },
  { id: 'e_m5', petId: '2', category: 'Food', amount: 450, date: '2025-10-12', description: 'Wet Canned Food (Case)' },
  { id: 'e_m6', petId: '2', category: 'Food', amount: 450, date: '2025-11-12', description: 'Wet Canned Food (Case)' },
  { id: 'e_m7', petId: '2', category: 'Food', amount: 450, date: '2025-12-12', description: 'Wet Canned Food (Case)' },
  { id: 'e_m8', petId: '2', category: 'Food', amount: 450, date: '2026-01-12', description: 'Wet Canned Food (Case)' },
  { id: 'e_m9', petId: '2', category: 'Food', amount: 450, date: '2026-02-12', description: 'Wet Canned Food (Case)' },
  { id: 'e_ma', petId: '2', category: 'Food', amount: 450, date: '2026-03-12', description: 'Wet Canned Food (Case)' },
  { id: 'e_mb', petId: '2', category: 'Food', amount: 450, date: '2026-04-12', description: 'Wet Canned Food (Case)' },
  { id: 'e_mc', petId: '2', category: 'Food', amount: 450, date: '2026-05-12', description: 'Wet Canned Food (Case)' },
  { id: 'e_md', petId: '2', category: 'Food', amount: 450, date: '2026-06-12', description: 'Wet Canned Food (Case)' },

  // Medical
  { id: 'e_med1', petId: '1', category: 'Medical', amount: 1200, date: '2025-06-15', description: 'Annual DHPP Vaccination' },
  { id: 'e_med2', petId: '2', category: 'Medical', amount: 800, date: '2025-08-20', description: 'Feline Leukemia Vaccine & Checkup' },
  { id: 'e_med3', petId: '1', category: 'Medical', amount: 1500, date: '2025-12-05', description: 'Dental Scaling & Polish' },
  { id: 'e_med4', petId: '2', category: 'Medical', amount: 900, date: '2026-02-18', description: 'Deworming & Ear Mite Treatment' },
  { id: 'e_med5', petId: '1', category: 'Medical', amount: 1200, date: '2026-06-05', description: 'Annual Booster Vaccine' },

  // Grooming (Every 2-3 months)
  { id: 'e_gr1', petId: '1', category: 'Grooming', amount: 600, date: '2025-07-20', description: 'Summer Spa & De-shedding' },
  { id: 'e_gr2', petId: '1', category: 'Grooming', amount: 600, date: '2025-10-15', description: 'Nail Trim & De-shedding' },
  { id: 'e_gr3', petId: '1', category: 'Grooming', amount: 600, date: '2026-01-20', description: 'Winter Grooming & Ear Cleaning' },
  { id: 'e_gr4', petId: '1', category: 'Grooming', amount: 600, date: '2026-04-15', description: 'Spring Trim & Spa' },
  { id: 'e_gr5', petId: '2', category: 'Grooming', amount: 400, date: '2025-11-02', description: 'Milo Claws & Bath' },

  // Litter for Milo
  { id: 'e_lit1', petId: '2', category: 'Litter', amount: 280, date: '2025-07-02', description: 'Tofu Litter 6L' },
  { id: 'e_lit2', petId: '2', category: 'Litter', amount: 280, date: '2025-09-02', description: 'Tofu Litter 6L' },
  { id: 'e_lit3', petId: '2', category: 'Litter', amount: 280, date: '2025-11-02', description: 'Tofu Litter 6L' },
  { id: 'e_lit4', petId: '2', category: 'Litter', amount: 280, date: '2026-01-02', description: 'Tofu Litter 6L' },
  { id: 'e_lit5', petId: '2', category: 'Litter', amount: 280, date: '2026-03-02', description: 'Tofu Litter 6L' },
  { id: 'e_lit6', petId: '2', category: 'Litter', amount: 280, date: '2026-05-02', description: 'Tofu Litter 6L' },

  // Toys & Other
  { id: 'e_t1', petId: '1', category: 'Toys', amount: 500, date: '2025-07-05', description: 'Chew Toys & Rope' },
  { id: 'e_t2', petId: '2', category: 'Toys', amount: 1200, date: '2025-10-10', description: 'Multi-level Cat Tree' },
  { id: 'e_t3', petId: '1', category: 'Toys', amount: 750, date: '2025-12-24', description: 'Christmas Outfits & Treats' },
  { id: 'e_t4', petId: '2', category: 'Toys', amount: 350, date: '2026-03-15', description: 'Interactive Laser & Feathers' }
];

export const INITIAL_REMINDERS = [
  { id: 'r1', petId: '1', type: 'Vaccine', title: 'Annual Booster Vaccine', date: '2026-06-25', time: '10:00', recurrence: 'yearly', completed: false },
  { id: 'r2', petId: '2', type: 'Medication', title: 'Monthly Deworming', date: '2026-06-20', time: '09:00', recurrence: 'monthly', completed: false },
  { id: 'r3', petId: '1', type: 'Grooming', title: 'Spa & Nail Trim', date: '2026-06-28', time: '15:30', recurrence: 'none', completed: false },
  { id: 'r4', petId: '2', type: 'Checkup', title: 'Annual Vet Visit', date: '2026-08-15', time: '11:00', recurrence: 'yearly', completed: false }
];

export const CURRENCIES = {
  THB: '฿',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥'
};

export const categoryColors = {
  Food: '#6366f1',
  Medical: '#ef4444',
  Toys: '#ec4899',
  Litter: '#f59e0b',
  Grooming: '#10b981',
  Other: '#64748b'
};
