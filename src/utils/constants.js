const isDev = !!import.meta.env.DEV;

export const INITIAL_PETS = isDev ? [
  {
    id: 'pet_1',
    name: 'Bella',
    species: 'Dog',
    breed: 'Golden Retriever',
    birthdate: '2021-05-10',
    notes: 'Very friendly, loves swimming and fetching balls.',
    photo: '',
    weightLogs: [
      { date: '2022-03-10', weight: 24.5 },
      { date: '2022-09-10', weight: 27.2 },
      { date: '2023-03-10', weight: 29.8 },
      { date: '2023-09-10', weight: 30.5 },
      { date: '2024-03-10', weight: 31.0 },
      { date: '2024-09-10', weight: 30.8 },
      { date: '2025-03-10', weight: 31.2 },
      { date: '2025-09-10', weight: 31.5 },
      { date: '2026-03-10', weight: 31.1 }
    ],
    vaccineLogs: [
      { id: 'v1_1', date: '2022-05-12', vaccineName: 'Rabies', brand: 'Defensor', notes: 'First annual shot' },
      { id: 'v1_2', date: '2023-05-15', vaccineName: 'Rabies', brand: 'Defensor', notes: 'Booster shot' },
      { id: 'v1_3', date: '2024-05-10', vaccineName: 'Rabies', brand: 'Defensor', notes: 'Booster shot' },
      { id: 'v1_4', date: '2025-05-14', vaccineName: 'Rabies', brand: 'Defensor', notes: 'Booster shot' },
      { id: 'v1_5', date: '2026-05-11', vaccineName: 'Rabies', brand: 'Defensor', notes: 'Latest booster shot' }
    ]
  },
  {
    id: 'pet_2',
    name: 'Luna',
    species: 'Cat',
    breed: 'Siamese',
    birthdate: '2022-03-15',
    notes: 'Loves climbing, very vocal, eats dry food.',
    photo: '',
    weightLogs: [
      { date: '2022-06-15', weight: 1.8 },
      { date: '2022-12-15', weight: 3.2 },
      { date: '2023-06-15', weight: 4.1 },
      { date: '2023-12-15', weight: 4.3 },
      { date: '2024-06-15', weight: 4.4 },
      { date: '2024-12-15', weight: 4.6 },
      { date: '2025-06-15', weight: 4.5 },
      { date: '2025-12-15', weight: 4.7 },
      { date: '2026-06-15', weight: 4.6 }
    ],
    vaccineLogs: [
      { id: 'v2_1', date: '2022-06-20', vaccineName: 'FVRCP', brand: 'Felocell', notes: 'Kitten series 1' },
      { id: 'v2_2', date: '2023-06-22', vaccineName: 'FVRCP', brand: 'Felocell', notes: 'Booster' },
      { id: 'v2_3', date: '2024-06-25', vaccineName: 'FVRCP', brand: 'Felocell', notes: 'Booster' },
      { id: 'v2_4', date: '2025-06-20', vaccineName: 'FVRCP', brand: 'Felocell', notes: 'Booster' }
    ]
  },
  {
    id: 'pet_3',
    name: 'Charlie',
    species: 'Dog',
    breed: 'French Bulldog',
    birthdate: '2023-01-20',
    notes: 'Sensitive stomach. Playful and lazy.',
    photo: '',
    weightLogs: [
      { date: '2023-05-20', weight: 6.2 },
      { date: '2023-11-20', weight: 9.5 },
      { date: '2024-05-20', weight: 11.2 },
      { date: '2024-11-20', weight: 12.0 },
      { date: '2025-05-20', weight: 12.3 },
      { date: '2025-11-20', weight: 12.1 },
      { date: '2026-05-20', weight: 12.4 }
    ],
    vaccineLogs: [
      { id: 'v3_1', date: '2023-04-20', vaccineName: 'DHPP', brand: 'Nobivac', notes: 'First puppy dose' },
      { id: 'v3_2', date: '2024-04-22', vaccineName: 'DHPP', brand: 'Nobivac', notes: 'First booster' },
      { id: 'v3_3', date: '2025-04-18', vaccineName: 'DHPP', brand: 'Nobivac', notes: 'Booster' },
      { id: 'v3_4', date: '2026-04-20', vaccineName: 'DHPP', brand: 'Nobivac', notes: 'Latest booster' }
    ]
  },
  {
    id: 'pet_4',
    name: 'Milo',
    species: 'Cat',
    breed: 'Maine Coon',
    birthdate: '2023-08-05',
    notes: 'Very large and fluffy, friendly, likes running water.',
    photo: '',
    weightLogs: [
      { date: '2023-11-05', weight: 2.5 },
      { date: '2024-05-05', weight: 5.1 },
      { date: '2024-11-05', weight: 7.2 },
      { date: '2025-05-05', weight: 8.5 },
      { date: '2025-11-05', weight: 9.1 },
      { date: '2026-05-05', weight: 9.4 }
    ],
    vaccineLogs: [
      { id: 'v4_1', date: '2023-11-10', vaccineName: 'FeLV', brand: 'Purevax', notes: 'Initial dose' },
      { id: 'v4_2', date: '2024-11-12', vaccineName: 'FeLV', brand: 'Purevax', notes: 'Booster' },
      { id: 'v4_3', date: '2025-11-08', vaccineName: 'FeLV', brand: 'Purevax', notes: 'Booster' }
    ]
  },
  {
    id: 'pet_5',
    name: 'Coco',
    species: 'Dog',
    breed: 'Poodle',
    birthdate: '2024-04-12',
    notes: 'Highly intelligent, loves tricks, hypo-allergenic coat.',
    photo: '',
    weightLogs: [
      { date: '2024-08-12', weight: 3.1 },
      { date: '2024-12-12', weight: 5.2 },
      { date: '2025-04-12', weight: 6.5 },
      { date: '2025-08-12', weight: 7.0 },
      { date: '2025-12-12', weight: 7.2 },
      { date: '2026-04-12', weight: 7.5 }
    ],
    vaccineLogs: [
      { id: 'v5_1', date: '2024-07-15', vaccineName: 'Bordetella', brand: 'Bronchi-Shield', notes: 'First dose' },
      { id: 'v5_2', date: '2025-07-15', vaccineName: 'Bordetella', brand: 'Bronchi-Shield', notes: 'Annual booster' }
    ]
  }
] : [];

export const INITIAL_EXPENSES = isDev ? [
  { id: 'exp_1', petId: 'pet_1', category: 'Food', amount: 1200, date: '2022-04-10', description: 'Premium large breed kibble' },
  { id: 'exp_2', petId: 'pet_1', category: 'Medical', amount: 850, date: '2023-05-15', description: 'Rabies booster and exam' },
  { id: 'exp_3', petId: 'pet_1', category: 'Grooming', amount: 1500, date: '2024-08-20', description: 'Summer de-shedding package' },
  { id: 'exp_4', petId: 'pet_1', category: 'Food', amount: 1400, date: '2025-12-05', description: 'Premium kibble & wet food' },
  { id: 'exp_5', petId: 'pet_1', category: 'Medical', amount: 950, date: '2026-05-11', description: 'Rabies booster' },
  { id: 'exp_6', petId: 'pet_2', category: 'Medical', amount: 600, date: '2022-06-20', description: 'Kitten first vaccination' },
  { id: 'exp_7', petId: 'pet_2', category: 'Toys', amount: 450, date: '2023-01-15', description: 'Cat tree scratching tower' },
  { id: 'exp_8', petId: 'pet_2', category: 'Medical', amount: 750, date: '2024-06-25', description: 'FVRCP vaccination booster' },
  { id: 'exp_9', petId: 'pet_2', category: 'Litter', amount: 350, date: '2025-09-10', description: 'Clumping tofu litter' },
  { id: 'exp_10', petId: 'pet_2', category: 'Food', amount: 900, date: '2026-03-22', description: 'Salmon wet food 24-pack' },
  { id: 'exp_11', petId: 'pet_3', category: 'Medical', amount: 1100, date: '2023-04-20', description: 'DHPP vaccine & health checkup' },
  { id: 'exp_12', petId: 'pet_3', category: 'Toys', amount: 500, date: '2024-02-14', description: 'Tough rubber chew toys' },
  { id: 'exp_13', petId: 'pet_3', category: 'Medical', amount: 800, date: '2025-05-20', description: 'DHPP booster' },
  { id: 'exp_14', petId: 'pet_3', category: 'Food', amount: 1100, date: '2026-01-10', description: 'Bulldog-specific dry food' },
  { id: 'exp_15', petId: 'pet_4', category: 'Medical', amount: 900, date: '2023-11-10', description: 'FeLV vaccination' },
  { id: 'exp_16', petId: 'pet_4', category: 'Food', amount: 1300, date: '2024-12-01', description: 'High protein wet/dry food bundle' },
  { id: 'exp_17', petId: 'pet_4', category: 'Grooming', amount: 1200, date: '2025-08-15', description: 'Maine Coon coat de-tangling' },
  { id: 'exp_18', petId: 'pet_4', category: 'Medical', amount: 850, date: '2026-05-05', description: 'Flea/tick treatment' },
  { id: 'exp_19', petId: 'pet_5', category: 'Medical', amount: 800, date: '2024-07-15', description: 'Bordetella vaccine' },
  { id: 'exp_20', petId: 'pet_5', category: 'Food', amount: 950, date: '2025-03-10', description: 'Puppy kibble bags' },
  { id: 'exp_21', petId: 'pet_5', category: 'Toys', amount: 400, date: '2026-04-18', description: 'Interactive treat dispenser' }
] : [];

export const INITIAL_REMINDERS = isDev ? [
  { id: 'rem_1', petId: 'pet_1', type: 'Grooming', title: 'Bella Summer Grooming', date: '2026-07-10', time: '10:00', recurrence: 'none', earlyReminder: '0', completed: false },
  { id: 'rem_2', petId: 'pet_1', type: 'Checkup', title: 'Log Bella Weight Record', date: '2026-09-10', time: '09:00', recurrence: 'none', earlyReminder: '0', completed: false },
  { id: 'rem_3', petId: 'pet_2', type: 'Vaccine', title: 'Luna FVRCP Booster', date: '2026-06-25', time: '11:00', recurrence: 'none', earlyReminder: '0', completed: false },
  { id: 'rem_4', petId: 'pet_3', type: 'Medication', title: 'Heartworm Medication Chewable', date: '2026-08-20', time: '08:00', recurrence: 'monthly', earlyReminder: '0', completed: false },
  { id: 'rem_5', petId: 'pet_4', type: 'Vaccine', title: 'Milo FeLV Annual Booster', date: '2026-11-08', time: '14:30', recurrence: 'none', earlyReminder: '0', completed: false },
  { id: 'rem_6', petId: 'pet_5', type: 'Vaccine', title: 'Coco Bordetella Booster', date: '2026-07-15', time: '09:30', recurrence: 'none', earlyReminder: '0', completed: false }
] : [];

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
