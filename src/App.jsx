import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  PawPrint, 
  Heart, 
  DollarSign, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Calendar, 
  Bell, 
  TrendingUp, 
  FileText, 
  Download, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  X, 
  User, 
  Search,
  Scale,
  Sun,
  Moon,
  Info,
  ShieldAlert
} from 'lucide-react';

// --- MOCK INITIAL DATA ---
const INITIAL_PETS = [
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

const INITIAL_EXPENSES = [
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

const INITIAL_REMINDERS = [
  { id: 'r1', petId: '1', type: 'Vaccine', title: 'Annual Booster Vaccine', date: '2026-06-25', time: '10:00', recurrence: 'yearly', completed: false },
  { id: 'r2', petId: '2', type: 'Medication', title: 'Monthly Deworming', date: '2026-06-20', time: '09:00', recurrence: 'monthly', completed: false },
  { id: 'r3', petId: '1', type: 'Grooming', title: 'Spa & Nail Trim', date: '2026-06-28', time: '15:30', recurrence: 'none', completed: false },
  { id: 'r4', petId: '2', type: 'Checkup', title: 'Annual Vet Visit', date: '2026-08-15', time: '11:00', recurrence: 'yearly', completed: false }
];

export default function App() {
  const [pets, setPets] = useState(() => {
    const saved = localStorage.getItem('pawfecto_pets') || localStorage.getItem('pawsome_pets');
    return saved ? JSON.parse(saved) : INITIAL_PETS;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('pawfecto_expenses') || localStorage.getItem('pawsome_expenses');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('pawfecto_reminders') || localStorage.getItem('pawsome_reminders');
    return saved ? JSON.parse(saved) : INITIAL_REMINDERS;
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('pawfecto_theme') || localStorage.getItem('pawsome_theme');
    return saved || 'light';
  });

  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('pawfecto_currency') || localStorage.getItem('pawsome_currency') || 'THB';
  });

  const CURRENCIES = {
    THB: '฿',
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥'
  };
  const currencySymbol = CURRENCIES[currency] || '$';

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPetId, setSelectedPetId] = useState('all');
  const [timeframe, setTimeframe] = useState('month'); // 'week' | 'month' | 'year' | 'specific' | 'custom'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [specificDate, setSpecificDate] = useState('');
  const [weightSort, setWeightSort] = useState('date-desc'); // 'date-desc' | 'date-asc' | 'weight-desc' | 'weight-asc'

  // Modal states
  const [showPetModal, setShowPetModal] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editingWeight, setEditingWeight] = useState(null);

  const [showReminderModal, setShowReminderModal] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);

  const [showWeightModal, setShowWeightModal] = useState(false);
  
  const [showVaccineModal, setShowVaccineModal] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState(null);

  // Form states
  const [petForm, setPetForm] = useState({ name: '', species: 'Dog', breed: '', birthdate: '', notes: '', photo: '' });
  const [expenseForm, setExpenseForm] = useState({ petId: '', category: 'Food', amount: '', date: '', description: '' });
  const [reminderForm, setReminderForm] = useState({ petId: '', type: 'Vaccine', title: '', date: '', time: '09:00', recurrence: 'none' });
  const [weightForm, setWeightForm] = useState({ petId: '', date: '', weight: '' });
  const [vaccineForm, setVaccineForm] = useState({ petId: '', date: '', vaccineName: '', brand: '', notes: '' });

  // Notifications / Feedback toasts
  const [toast, setToast] = useState(null);
  const [alertPopup, setAlertPopup] = useState(null);

  // Background alert trigger logic
  const triggerAlert = (reminder) => {
    const pet = pets.find(p => p.id === reminder.petId);
    const petName = pet ? pet.name : 'your pet';
    const message = `${reminder.title} scheduled for ${petName}!`;

    // 1. Native Desktop Notification
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('Pawfecto Reminder 🐾', {
          body: message,
          icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐾</text></svg>'
        });
      } catch (e) {
        console.error('Notification constructor error', e);
      }
    }

    // 2. Play beautiful ascending chime
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const playTone = (freq, time, duration) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.08, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        osc.start(time);
        osc.stop(time + duration);
      };

      const now = audioCtx.currentTime;
      for (let i = 0; i < 6; i++) {
        const start = now + (i * 0.8);
        playTone(523.25, start, 0.12);       // C5
        playTone(659.25, start + 0.1, 0.12);  // E5
        playTone(783.99, start + 0.2, 0.12);  // G5
        playTone(1046.50, start + 0.3, 0.25); // C6
      }
    } catch (e) {
      console.log('Audio chime blocked or unsupported', e);
    }

    // 3. Set visual screen pop-up state
    setAlertPopup({
      id: reminder.id,
      title: reminder.title,
      petName: petName,
      type: reminder.type,
      date: reminder.date,
      time: reminder.time
    });
  };

  useEffect(() => {
    // Request permission once on load
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Interaction handler to unlock Web Audio API Context
    const unlockAudio = () => {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };

    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      const now = new Date();
      // Get local time strings
      const localDate = now.getFullYear() + '-' + 
        String(now.getMonth() + 1).padStart(2, '0') + '-' + 
        String(now.getDate()).padStart(2, '0');
      const localTime = String(now.getHours()).padStart(2, '0') + ':' + 
        String(now.getMinutes()).padStart(2, '0');

      let updated = false;
      const nextReminders = reminders.map(rem => {
        if (!rem.completed && !rem.notified) {
          // If past or equal date
          if (rem.date < localDate) {
            triggerAlert(rem);
            updated = true;
            return { ...rem, notified: true };
          } else if (rem.date === localDate) {
            const remTime = rem.time || '09:00';
            if (remTime <= localTime) {
              triggerAlert(rem);
              updated = true;
              return { ...rem, notified: true };
            }
          }
        }
        return rem;
      });

      if (updated) {
        setReminders(nextReminders);
      }
    }, 4000); // Check every 4 seconds

    return () => clearInterval(checkInterval);
  }, [reminders, pets]);

  useEffect(() => {
    localStorage.setItem('pawfecto_pets', JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    localStorage.setItem('pawfecto_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('pawfecto_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('pawfecto_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('pawfecto_currency', currency);
  }, [currency]);

  const showFeedback = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Safe input handler (prevents any prototype pollution or HTML injections via input sanitization)
  const sanitizeInput = (val) => {
    if (typeof val !== 'string') return val;
    return val.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
  };

  // Age Calculator
  const getAge = (birthdateString) => {
    if (!birthdateString) return 'Unknown age';
    const today = new Date();
    const birthDate = new Date(birthdateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age === 0) {
      const months = (today.getFullYear() - birthDate.getFullYear()) * 12 + today.getMonth() - birthDate.getMonth();
      return months <= 0 ? 'Newborn' : `${months} mo`;
    }
    return `${age} years`;
  };

  // --- PHOTO LOADER ---
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showFeedback('Image must be under 2MB to ensure local storage operates efficiently.', 'danger');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPetForm(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- PET CRUD ---
  const openAddPet = () => {
    setEditingPet(null);
    setPetForm({ name: '', species: 'Dog', breed: '', birthdate: '', notes: '', photo: '' });
    setShowPetModal(true);
  };

  const openEditPet = (pet) => {
    setEditingPet(pet);
    setPetForm({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      birthdate: pet.birthdate,
      notes: pet.notes || '',
      photo: pet.photo || ''
    });
    setShowPetModal(true);
  };

  const savePet = (e) => {
    e.preventDefault();
    if (!petForm.name.trim()) return showFeedback('Pet name is required.', 'danger');
    
    const sanitizedName = sanitizeInput(petForm.name);
    const sanitizedBreed = sanitizeInput(petForm.breed);
    const sanitizedNotes = sanitizeInput(petForm.notes);

    if (editingPet) {
      setPets(pets.map(p => p.id === editingPet.id ? { 
        ...p, 
        name: sanitizedName, 
        species: petForm.species, 
        breed: sanitizedBreed, 
        birthdate: petForm.birthdate, 
        notes: sanitizedNotes,
        photo: petForm.photo
      } : p));
      showFeedback(`Successfully updated ${sanitizedName}!`);
    } else {
      const newPet = {
        id: Date.now().toString(),
        name: sanitizedName,
        species: petForm.species,
        breed: sanitizedBreed,
        birthdate: petForm.birthdate,
        notes: sanitizedNotes,
        photo: petForm.photo,
        weightLogs: [],
        vaccineLogs: []
      };
      setPets([...pets, newPet]);
      showFeedback(`Added ${sanitizedName} to your family!`);
    }
    setShowPetModal(false);
  };

  const deletePet = (petId, petName) => {
    if (confirm(`Are you sure you want to remove ${petName}? This will delete all their tracking history.`)) {
      setPets(pets.filter(p => p.id !== petId));
      setExpenses(expenses.filter(e => e.petId !== petId));
      setReminders(reminders.filter(r => r.petId !== petId));
      if (selectedPetId === petId) setSelectedPetId('all');
      showFeedback(`Removed ${petName} from the database.`, 'info');
    }
  };

  // --- EXPENSE CRUD ---
  const openAddExpense = () => {
    setEditingExpense(null);
    setExpenseForm({ 
      petId: pets[0]?.id || '', 
      category: 'Food', 
      amount: '', 
      date: new Date().toISOString().split('T')[0], 
      description: '' 
    });
    setShowExpenseModal(true);
  };

  const openEditExpense = (expense) => {
    setEditingExpense(expense);
    setExpenseForm({
      petId: expense.petId,
      category: expense.category,
      amount: expense.amount.toString(),
      date: expense.date,
      description: expense.description || ''
    });
    setShowExpenseModal(true);
  };

  const saveExpense = (e) => {
    e.preventDefault();
    const amountVal = parseFloat(expenseForm.amount);
    if (!expenseForm.petId) return showFeedback('Please select a pet.', 'danger');
    if (isNaN(amountVal) || amountVal <= 0) return showFeedback('Please enter a valid expense amount.', 'danger');
    
    const sanitizedDesc = sanitizeInput(expenseForm.description);

    const expenseData = {
      id: editingExpense ? editingExpense.id : Date.now().toString(),
      petId: expenseForm.petId,
      category: expenseForm.category,
      amount: amountVal,
      date: expenseForm.date || new Date().toISOString().split('T')[0],
      description: sanitizedDesc
    };

    if (editingExpense) {
      setExpenses(expenses.map(exp => exp.id === editingExpense.id ? expenseData : exp));
      showFeedback('Expense updated successfully!');
    } else {
      setExpenses([expenseData, ...expenses]);
      showFeedback('Expense tracked successfully!');
    }
    setShowExpenseModal(false);
  };

  const adjustExpense = (amount) => {
    const currentVal = parseFloat(expenseForm.amount) || 0;
    const newVal = Math.max(0, currentVal + amount);
    setExpenseForm(prev => ({ ...prev, amount: Number(newVal.toFixed(2)).toString() }));
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
    showFeedback('Expense entry deleted.', 'info');
  };

  // --- REMINDERS RECURRENCE HELPER ---
  const getNextOccurrence = (dateStr, timeStr, recurrence) => {
    if (!recurrence || recurrence === 'none') return null;
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    const dateObj = new Date(year, month - 1, day, hours, minutes);

    switch (recurrence) {
      case 'hourly':
        dateObj.setHours(dateObj.getHours() + 1);
        break;
      case 'daily':
        dateObj.setDate(dateObj.getDate() + 1);
        break;
      case 'monthly':
        dateObj.setMonth(dateObj.getMonth() + 1);
        break;
      case 'yearly':
        dateObj.setFullYear(dateObj.getFullYear() + 1);
        break;
      default:
        return null;
    }

    const nextDate = dateObj.getFullYear() + '-' +
      String(dateObj.getMonth() + 1).padStart(2, '0') + '-' +
      String(dateObj.getDate()).padStart(2, '0');
    const nextTime = String(dateObj.getHours()).padStart(2, '0') + ':' +
      String(dateObj.getMinutes()).padStart(2, '0');

    return { nextDate, nextTime };
  };

  // --- REMINDERS CRUD ---
  const openAddReminder = () => {
    setEditingReminder(null);
    setReminderForm({
      petId: pets[0]?.id || '',
      type: 'Vaccine',
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      recurrence: 'none'
    });
    setShowReminderModal(true);
  };

  const saveReminder = (e) => {
    e.preventDefault();
    if (!reminderForm.petId) return showFeedback('Please select a pet.', 'danger');
    if (!reminderForm.title.trim()) return showFeedback('Please specify reminder details.', 'danger');

    const sanitizedTitle = sanitizeInput(reminderForm.title);

    const reminderData = {
      id: editingReminder ? editingReminder.id : Date.now().toString(),
      petId: reminderForm.petId,
      type: reminderForm.type,
      title: sanitizedTitle,
      date: reminderForm.date || new Date().toISOString().split('T')[0],
      time: reminderForm.time || '09:00',
      recurrence: reminderForm.recurrence || 'none',
      completed: editingReminder ? editingReminder.completed : false
    };

    if (editingReminder) {
      setReminders(reminders.map(rem => rem.id === editingReminder.id ? reminderData : rem));
      showFeedback('Reminder updated!');
    } else {
      setReminders([...reminders, reminderData]);
      showFeedback('Reminder scheduled!');
    }
    setShowReminderModal(false);
  };

  const toggleReminderCompleted = (id) => {
    setReminders(reminders.map(rem => {
      if (rem.id === id) {
        const nextState = !rem.completed;
        
        if (nextState && rem.recurrence && rem.recurrence !== 'none') {
          const nextOccur = getNextOccurrence(rem.date, rem.time || '09:00', rem.recurrence);
          if (nextOccur) {
            showFeedback(`Task completed! Rescheduled for ${nextOccur.nextDate} at ${nextOccur.nextTime}`, 'success');
            return {
              ...rem,
              date: nextOccur.nextDate,
              time: nextOccur.nextTime,
              notified: false,
              completed: false
            };
          }
        }
        
        showFeedback(nextState ? 'Task marked as completed!' : 'Task returned to active status.', 'info');
        return { ...rem, completed: nextState };
      }
      return rem;
    }));
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(rem => rem.id !== id));
    showFeedback('Reminder cancelled.', 'info');
  };

  // --- WEIGHT TRACKING ---
  const openAddWeight = () => {
    setEditingWeight(null);
    setWeightForm({
      petId: selectedPetId === 'all' ? (pets[0]?.id || '') : selectedPetId,
      date: new Date().toISOString().split('T')[0],
      weight: ''
    });
    setShowWeightModal(true);
  };

  const openEditWeight = (petId, log) => {
    setEditingWeight({ petId, ...log });
    setWeightForm({
      petId: petId,
      date: log.date,
      weight: log.weight.toString()
    });
    setShowWeightModal(true);
  };

  const saveWeight = (e) => {
    e.preventDefault();
    const weightVal = parseFloat(weightForm.weight);
    if (!weightForm.petId) return showFeedback('Please select a pet.', 'danger');
    if (isNaN(weightVal) || weightVal <= 0) return showFeedback('Please enter a valid weight.', 'danger');

    setPets(pets.map(p => {
      if (p.id === weightForm.petId) {
        let nextLogs = [...(p.weightLogs || [])];
        if (editingWeight) {
          nextLogs = nextLogs.filter(l => l.date !== editingWeight.date);
        }
        nextLogs = [...nextLogs, { date: weightForm.date, weight: weightVal }]
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        return { ...p, weightLogs: nextLogs };
      }
      return p;
    }));

    if (editingWeight) {
      showFeedback('Weight record updated successfully!');
    } else {
      showFeedback('Weight logged successfully!');
    }
    setShowWeightModal(false);
    setEditingWeight(null);
  };

  const adjustWeight = (amount) => {
    const currentVal = parseFloat(weightForm.weight) || 0;
    const newVal = Math.max(0, currentVal + amount);
    setWeightForm(prev => ({ ...prev, weight: Number(newVal.toFixed(2)).toString() }));
  };

  const deleteWeightLog = (petId, dateStr) => {
    setPets(pets.map(p => {
      if (p.id === petId) {
        return {
          ...p,
          weightLogs: (p.weightLogs || []).filter(l => l.date !== dateStr)
        };
      }
      return p;
    }));
    showFeedback('Weight record deleted.', 'info');
  };

  // --- VACCINATION LOGGING ---
  const openAddVaccine = () => {
    setEditingVaccine(null);
    setVaccineForm({
      petId: selectedPetId === 'all' ? (pets[0]?.id || '') : selectedPetId,
      date: new Date().toISOString().split('T')[0],
      vaccineName: '',
      brand: '',
      notes: ''
    });
    setShowVaccineModal(true);
  };

  const openEditVaccine = (petId, log) => {
    setEditingVaccine({ petId, ...log });
    setVaccineForm({
      petId: petId,
      date: log.date,
      vaccineName: log.vaccineName,
      brand: log.brand || '',
      notes: log.notes || ''
    });
    setShowVaccineModal(true);
  };

  const saveVaccine = (e) => {
    e.preventDefault();
    if (!vaccineForm.petId) return showFeedback('Please select a pet.', 'danger');
    if (!vaccineForm.vaccineName.trim()) return showFeedback('Please enter vaccine name.', 'danger');
    if (!vaccineForm.date) return showFeedback('Please specify vaccine date.', 'danger');

    const nameClean = sanitizeInput(vaccineForm.vaccineName);
    const brandClean = sanitizeInput(vaccineForm.brand);
    const notesClean = sanitizeInput(vaccineForm.notes);

    setPets(pets.map(p => {
      if (p.id === vaccineForm.petId) {
        let nextLogs = [...(p.vaccineLogs || [])];
        if (editingVaccine) {
          nextLogs = nextLogs.filter(l => l.id !== editingVaccine.id);
        }
        const logData = {
          id: editingVaccine ? editingVaccine.id : Date.now().toString(),
          date: vaccineForm.date,
          vaccineName: nameClean,
          brand: brandClean,
          notes: notesClean
        };
        nextLogs = [...nextLogs, logData].sort((a, b) => new Date(b.date) - new Date(a.date)); // descending date order for vaccinations
        return { ...p, vaccineLogs: nextLogs };
      }
      return p;
    }));

    if (editingVaccine) {
      showFeedback('Vaccination record updated successfully!');
    } else {
      showFeedback('Vaccination logged successfully!');
    }
    setShowVaccineModal(false);
    setEditingVaccine(null);
  };

  const deleteVaccine = (petId, id) => {
    setPets(pets.map(p => {
      if (p.id === petId) {
        return {
          ...p,
          vaccineLogs: (p.vaccineLogs || []).filter(l => l.id !== id)
        };
      }
      return p;
    }));
    showFeedback('Vaccination record deleted.', 'info');
  };

  // --- BACKUP & RESTORE ---
  const exportBackup = () => {
    const backupData = {
      pets,
      expenses,
      reminders,
      theme,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pawfecto_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    showFeedback('Backup file generated and downloaded successfully!');
  };

  const importBackup = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const imported = JSON.parse(evt.target.result);
        if (imported.pets && imported.expenses && imported.reminders) {
          setPets(imported.pets);
          setExpenses(imported.expenses);
          setReminders(imported.reminders);
          if (imported.theme) setTheme(imported.theme);
          showFeedback('Backup database imported successfully! All records loaded.');
        } else {
          showFeedback('Invalid backup file structure.', 'danger');
        }
      } catch (err) {
        showFeedback('Error parsing JSON backup file.', 'danger');
      }
    };
    reader.readAsText(file);
  };

  const resetToFactory = () => {
    if (confirm('Are you sure you want to reset Pawfecto? This will delete all currently saved pet records.')) {
      setPets(INITIAL_PETS);
      setExpenses(INITIAL_EXPENSES);
      setReminders(INITIAL_REMINDERS);
      setTheme('light');
      showFeedback('App reset to demo data.', 'info');
    }
  };

  // --- COMPUTED DATA FOR RENDER ---
  const currentPet = pets.find(p => p.id === selectedPetId);

  // Safe local date parser to avoid timezone offset bugs
  const parseLocalDate = (dateStr) => {
    if (!dateStr) return null;
    const cleanStr = dateStr.split('T')[0];
    const parts = cleanStr.split('-');
    if (parts.length !== 3) return null;
    const [year, month, day] = parts.map(Number);
    return new Date(year, month - 1, day);
  };

  // Sort weight logs helper
  const getSortedWeightLogs = (logs) => {
    const filtered = getFilteredByTimeframe(logs || [], 'date');
    return [...filtered].sort((a, b) => {
      if (weightSort === 'date-asc') {
        return parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime();
      } else if (weightSort === 'date-desc') {
        return parseLocalDate(b.date).getTime() - parseLocalDate(a.date).getTime();
      } else if (weightSort === 'weight-asc') {
        return a.weight - b.weight;
      } else if (weightSort === 'weight-desc') {
        return b.weight - a.weight;
      }
      return 0;
    });
  };

  // Timeframe filtering helper
  const getFilteredByTimeframe = (items, dateField) => {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return items.filter(item => {
      if (!item[dateField]) return false;
      const itemDate = parseLocalDate(item[dateField]);
      if (!itemDate) return false;

      if (timeframe === 'week') {
        const diffTime = startOfToday.getTime() - itemDate.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 7;
      } else if (timeframe === 'month') {
        return itemDate.getFullYear() === today.getFullYear() && itemDate.getMonth() === today.getMonth();
      } else if (timeframe === 'year') {
        return itemDate.getFullYear() === today.getFullYear();
      } else if (timeframe === 'specific') {
        if (!specificDate) return true;
        const spec = parseLocalDate(specificDate);
        return spec && itemDate.getTime() === spec.getTime();
      } else if (timeframe === 'custom') {
        if (!startDate && !endDate) return true;
        const start = parseLocalDate(startDate);
        const end = parseLocalDate(endDate);

        if (start && itemDate.getTime() < start.getTime()) return false;
        if (end && itemDate.getTime() > end.getTime()) return false;
        return true;
      }
      return true;
    });
  };

  const filteredExpenses = getFilteredByTimeframe(
    expenses.filter(e => selectedPetId === 'all' || e.petId === selectedPetId),
    'date'
  );
  const totalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  const filteredReminders = reminders.filter(r => selectedPetId === 'all' || r.petId === selectedPetId)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Category expense breakdown
  const categoryTotals = filteredExpenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  // Weight Analysis Helpers
  const getWeightAnalysis = (logs) => {
    if (!logs || logs.length === 0) return { avg: 0, min: 0, max: 0, changeText: 'N/A', text: 'No logs for this period.', isPositive: false };
    const weights = logs.map(l => l.weight);
    const avg = (weights.reduce((s, w) => s + w, 0) / weights.length).toFixed(1);
    const min = Math.min(...weights).toFixed(1);
    const max = Math.max(...weights).toFixed(1);
    
    let text = '';
    let changeText = 'Stable';
    let isPositive = false;
    
    if (logs.length >= 2) {
      const first = logs[0].weight;
      const last = logs[logs.length - 1].weight;
      const diff = (last - first).toFixed(1);
      const pct = ((diff / first) * 100).toFixed(1);
      
      if (diff > 0) {
        changeText = `+${diff} kg (+${pct}%)`;
        isPositive = true;
        text = 'Weight shows an upward growth trend for this period. Great progress!';
      } else if (diff < 0) {
        changeText = `${diff} kg (${pct}%)`;
        text = 'Weight decreased over this period. Monitor food portion sizes and consult your vet if unexpected.';
      } else {
        changeText = 'Stable (0.0 kg)';
        text = 'Weight is stable. Perfect weight maintenance!';
      }
    } else {
      text = 'Log at least 2 weight records to analyze weight change trends.';
    }
    
    return { avg, min, max, changeText, text, isPositive };
  };

  // Expense Analysis Helpers
  const getExpenseAnalysis = (filteredExps) => {
    if (filteredExps.length === 0) return { topCategory: 'N/A', pct: 0, text: 'No expenses recorded for this period.' };
    const total = filteredExps.reduce((s, e) => s + e.amount, 0);
    
    const catTotals = filteredExps.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});
    
    let topCat = 'N/A';
    let topVal = 0;
    Object.keys(catTotals).forEach(cat => {
      if (catTotals[cat] > topVal) {
        topVal = catTotals[cat];
        topCat = cat;
      }
    });
    
    const pct = total > 0 ? ((topVal / total) * 100).toFixed(0) : 0;
    
    let text = '';
    if (topCat === 'Food') {
      text = `Food is your primary expense (${pct}%). Buying in bulk can help save money in the long run.`;
    } else if (topCat === 'Medical') {
      text = `Medical costs dominate this period (${pct}%). Essential for your pet's health and wellness.`;
    } else if (topCat === 'Grooming') {
      text = `Grooming is your largest category (${pct}%). Regular brushing at home can reduce professional costs.`;
    } else if (topCat !== 'N/A') {
      text = `${topCat} makes up the majority of spending (${pct}%). Monitor these discretionary costs.`;
    } else {
      text = 'No category data available.';
    }
    
    return { topCategory: topCat, topValue: topVal, pct, text };
  };

  const categoryColors = {
    Food: '#6366f1',
    Medical: '#ef4444',
    Toys: '#ec4899',
    Litter: '#f59e0b',
    Grooming: '#10b981',
    Other: '#64748b'
  };

  // --- CUSTOM SVG CHARTS IMPLEMENTATION ---
  
  // 1. Expense Donut Chart
  const renderExpenseDonut = () => {
    const categories = Object.keys(categoryTotals);
    if (categories.length === 0) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
          <Info size={32} style={{ marginBottom: '0.5rem' }} />
          <p>No expense data recorded.</p>
        </div>
      );
    }

    const radius = 65;
    const strokeWidth = 16;
    const circum = 2 * Math.PI * radius;
    let accumulatedAngle = 0;

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
          {categories.map((cat) => {
            const amount = categoryTotals[cat];
            const percentage = amount / totalExpenses;
            const strokeDashoffset = circum - (percentage * circum);
            const rotation = accumulatedAngle;
            accumulatedAngle += percentage * 360;

            return (
              <circle
                key={cat}
                cx="90"
                cy="90"
                r={radius}
                fill="transparent"
                stroke={categoryColors[cat] || '#64748b'}
                strokeWidth={strokeWidth}
                strokeDasharray={circum}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transformOrigin: '90px 90px',
                  transform: `rotate(${rotation}deg)`,
                  transition: 'stroke-dashoffset 0.6s ease'
                }}
              />
            );
          })}
          {/* Inner ring for glass effect */}
          <circle cx="90" cy="90" r={radius - strokeWidth / 2 - 1} fill="transparent" stroke="var(--border-color)" strokeWidth="1" />
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '150px' }}>
          {categories.map(cat => (
            <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: categoryColors[cat] || '#64748b' }}></span>
              <span style={{ fontWeight: '500' }}>{cat}:</span>
              <span style={{ marginLeft: 'auto', fontWeight: '700' }}>{currencySymbol}{categoryTotals[cat].toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 2. Weight SVG Line Chart
  const renderWeightChart = () => {
    let activePet = pets[0];
    if (selectedPetId !== 'all') {
      activePet = pets.find(p => p.id === selectedPetId);
    }

    if (!activePet || !activePet.weightLogs || activePet.weightLogs.length === 0) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '160px', color: 'var(--text-muted)' }}>
          <Scale size={32} style={{ marginBottom: '0.5rem' }} />
          <p>No weight logs yet for {activePet?.name || 'this pet'}.</p>
          <button className="btn btn-secondary" style={{ marginTop: '0.75rem', padding: '0.4rem 1rem', fontSize: '0.8rem' }} onClick={openAddWeight}>
            Log First Weight
          </button>
        </div>
      );
    }

    const logs = getFilteredByTimeframe(activePet.weightLogs || [], 'date');
    const padding = 30;
    const chartWidth = 500;
    const chartHeight = 160;

    const weights = logs.map(l => l.weight);
    const maxWeight = Math.max(...weights) * 1.15;
    const minWeight = Math.min(...weights) * 0.85;
    const weightRange = maxWeight - minWeight === 0 ? 1 : maxWeight - minWeight;

    const points = logs.map((log, index) => {
      const x = padding + (index * (chartWidth - 2 * padding)) / (logs.length - 1 || 1);
      const y = chartHeight - padding - ((log.weight - minWeight) * (chartHeight - 2 * padding)) / weightRange;
      return { x, y, ...log };
    });

    const pathD = points.reduce((acc, p, index) => {
      return index === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, '');

    // Area helper under the curve
    const areaD = points.length > 0 
      ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`
      : '';

    return (
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" height="100%">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="var(--border-color)" strokeWidth="1" />
          <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="var(--border-color)" strokeDasharray="3 3" strokeWidth="1" />

          {/* Area Path */}
          {areaD && <path d={areaD} fill="url(#chartGrad)" />}

          {/* Line Path */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data Points */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle
                cx={p.x}
                cy={p.y}
                r="5"
                fill="var(--bg-card)"
                stroke="var(--primary)"
                strokeWidth="3"
              />
              <text
                x={p.x}
                y={p.y - 10}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill="var(--text-main)"
              >
                {p.weight} kg
              </text>
              <text
                x={p.x}
                y={chartHeight - 10}
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-muted)"
              >
                {p.date.split('-').slice(1).join('/')}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* Toast Feedback */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          padding: '1rem 1.5rem',
          borderRadius: '12px',
          backgroundColor: toast.type === 'danger' ? 'var(--danger)' : toast.type === 'info' ? 'var(--secondary)' : 'var(--success)',
          color: 'white',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          zIndex: 1000,
          fontWeight: '600',
          display: 'flex',
          alignHeight: 'center',
          gap: '0.75rem',
          animation: 'slideUp 0.3s ease'
        }}>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo-container">
          <div style={{ backgroundColor: 'var(--primary-glow)', padding: '0.5rem', borderRadius: '12px' }}>
            <PawPrint size={24} style={{ color: 'var(--primary)' }} />
          </div>
          <span className="logo-text">Pawfecto</span>
        </div>

        <nav style={{ flexGrow: 1 }}>
          <ul className="nav-links">
            <li>
              <button 
                onClick={() => setActiveTab('dashboard')} 
                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
              >
                <LayoutDashboard size={20} />
                Dashboard
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('pets')} 
                className={`nav-item ${activeTab === 'pets' ? 'active' : ''}`}
                style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
              >
                <PawPrint size={20} />
                Pets Family
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('health')} 
                className={`nav-item ${activeTab === 'health' ? 'active' : ''}`}
                style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
              >
                <Scale size={20} />
                Weight Logs
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('reminders')} 
                className={`nav-item ${activeTab === 'reminders' ? 'active' : ''}`}
                style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
              >
                <Bell size={20} />
                Reminders
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('vaccination')} 
                className={`nav-item ${activeTab === 'vaccination' ? 'active' : ''}`}
                style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
              >
                <ShieldAlert size={20} />
                Vaccinations
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('expenses')} 
                className={`nav-item ${activeTab === 'expenses' ? 'active' : ''}`}
                style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
              >
                <DollarSign size={20} />
                Expenses
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('settings')} 
                className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
              >
                <Settings size={20} />
                Backup & Settings
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('guide')} 
                className={`nav-item ${activeTab === 'guide' ? 'active' : ''}`}
                style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
              >
                <Sparkles size={20} />
                App Guide & Tour
              </button>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              className="btn-icon" 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              style={{ width: '38px', height: '38px', borderRadius: '50%' }}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <div style={{ fontSize: '0.85rem' }}>
              <p style={{ fontWeight: '600' }}>Local Database</p>
              <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Secured Offline</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="main-wrapper">
        <header className="header-bar">
          <div className="page-title">
            <h1 style={{ textTransform: 'capitalize' }}>{activeTab}</h1>
            <p>Keep track of your furry companions and their logs.</p>
          </div>

          <div className="header-actions">
            {/* Contextual Pet Selector */}
            <div style={{ position: 'relative' }}>
              <select 
                value={selectedPetId} 
                onChange={(e) => setSelectedPetId(e.target.value)} 
                className="form-select"
                style={{ paddingRight: '2.5rem', minWidth: '160px', fontWeight: '600' }}
              >
                <option value="all">🐾 All Pets</option>
                {pets.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Global Timeframe Selector */}
            {['dashboard', 'health', 'expenses'].includes(activeTab) && (
              <div style={{ position: 'relative' }}>
                <select 
                  value={timeframe} 
                  onChange={(e) => setTimeframe(e.target.value)} 
                  className="form-select"
                  style={{ paddingRight: '2.5rem', minWidth: '140px', fontWeight: '600' }}
                >
                  <option value="week">📅 This Week</option>
                  <option value="month">📅 This Month</option>
                  <option value="year">📅 This Year</option>
                  <option value="specific">📅 Specific Date</option>
                  <option value="custom">📅 Custom Range</option>
                </select>
              </div>
            )}

            {/* Contextual Date Range / Specific Date Inputs */}
            {['dashboard', 'health', 'expenses'].includes(activeTab) && timeframe === 'custom' && (
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'nowrap' }}>
                <input 
                  type="date" 
                  className="form-input" 
                  style={{ padding: '0.35rem 0.5rem', fontSize: '0.85rem', width: '120px', minWidth: '110px', fontWeight: '500' }}
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)} 
                />
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '600' }}>to</span>
                <input 
                  type="date" 
                  className="form-input" 
                  style={{ padding: '0.35rem 0.5rem', fontSize: '0.85rem', width: '120px', minWidth: '110px', fontWeight: '500' }}
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)} 
                />
              </div>
            )}

            {['dashboard', 'health', 'expenses'].includes(activeTab) && timeframe === 'specific' && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input 
                  type="date" 
                  className="form-input" 
                  style={{ padding: '0.35rem 0.5rem', fontSize: '0.85rem', width: '140px', minWidth: '120px', fontWeight: '500' }}
                  value={specificDate} 
                  onChange={(e) => setSpecificDate(e.target.value)} 
                />
              </div>
            )}

            {activeTab === 'pets' && (
              <button className="btn btn-primary" onClick={openAddPet}>
                <Plus size={18} /> Add Pet
              </button>
            )}
            {activeTab === 'health' && (
              <button className="btn btn-primary" onClick={openAddWeight}>
                <Plus size={18} /> Log Weight
              </button>
            )}
            {activeTab === 'reminders' && (
              <button className="btn btn-primary" onClick={openAddReminder}>
                <Plus size={18} /> Add Reminder
              </button>
            )}
            {activeTab === 'vaccination' && (
              <button className="btn btn-primary" onClick={openAddVaccine}>
                <Plus size={18} /> Log Vaccination
              </button>
            )}
            {activeTab === 'expenses' && (
              <button className="btn btn-primary" onClick={openAddExpense}>
                <Plus size={18} /> Track Expense
              </button>
            )}
          </div>
        </header>

        {/* --- VIEW TABS CONTAINER --- */}
        
        {/* 1. DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-grid">
            <div className="col-12">
              <div className="quick-stats-row">
                <div className="glass-card stat-card" onClick={() => setActiveTab('pets')} style={{ cursor: 'pointer' }}>
                  <div className="stat-icon icon-purple">
                    <PawPrint size={24} />
                  </div>
                  <div>
                    <div className="stat-value">{pets.length}</div>
                    <div className="stat-label">Registered Pets</div>
                  </div>
                </div>

                <div className="glass-card stat-card" onClick={() => setActiveTab('expenses')} style={{ cursor: 'pointer' }}>
                  <div className="stat-icon icon-pink">
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <div className="stat-value">{currencySymbol}{totalExpenses.toLocaleString()}</div>
                    <div className="stat-label">Total Expenses</div>
                  </div>
                </div>

                <div className="glass-card stat-card" onClick={() => setActiveTab('health')} style={{ cursor: 'pointer' }}>
                  <div className="stat-icon icon-amber">
                    <Bell size={24} />
                  </div>
                  <div>
                    <div className="stat-value">{filteredReminders.filter(r => !r.completed).length}</div>
                    <div className="stat-label">Active Reminders</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Left side: Reminders & weight graph */}
            <div className="col-8">
              <div className="glass-card" style={{ marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3>Weight Timeline</h3>
                  <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={openAddWeight}>
                    + Log Weight
                  </button>
                </div>
                {renderWeightChart()}
              </div>

              <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3>Upcoming Tasks & Vaccines</h3>
                  <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={openAddReminder}>
                    Schedule Task
                  </button>
                </div>
                {filteredReminders.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem' }}>No scheduled reminders found.</p>
                ) : (
                  <div className="reminders-list">
                    {filteredReminders.slice(0, 5).map(rem => {
                      const pet = pets.find(p => p.id === rem.petId);
                      return (
                        <div key={rem.id} className="reminder-item">
                          <button 
                            onClick={() => toggleReminderCompleted(rem.id)} 
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: rem.completed ? 'var(--success)' : 'var(--text-muted)' }}
                          >
                            <CheckCircle2 size={24} fill={rem.completed ? 'var(--success-glow)' : 'transparent'} />
                          </button>
                          <div className="reminder-content">
                            <span className="reminder-title" style={{ textDecoration: rem.completed ? 'line-through' : 'none', color: rem.completed ? 'var(--text-muted)' : 'var(--text-main)' }}>
                              {rem.title}
                            </span>
                            <div className="reminder-meta">
                              <span className="badge badge-primary" style={{ marginRight: '0.5rem' }}>{pet ? pet.name : 'Unknown Pet'}</span>
                              <span>Due: {rem.date} {rem.time ? `@ ${rem.time}` : ''}</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                            <span className="badge badge-secondary">{rem.type}</span>
                            {rem.recurrence && rem.recurrence !== 'none' && (
                              <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '0.1rem 0.5rem' }}>🔁 {rem.recurrence}</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Expense breakdown */}
            <div className="col-4">
              <div className="glass-card" style={{ height: '100%', minHeight: '380px' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Expense Breakdown</h3>
                {renderExpenseDonut()}
              </div>
            </div>
          </div>
        )}

        {/* 2. PETS LIST VIEW */}
        {activeTab === 'pets' && (
          <div className="pets-grid">
            {pets.map(pet => {
              const latestWeight = pet.weightLogs && pet.weightLogs.length > 0 
                ? `${pet.weightLogs[pet.weightLogs.length - 1].weight} kg` 
                : 'No weight logged';

              return (
                <div key={pet.id} className="glass-card pet-card">
                  <div className="pet-card-header">
                    {pet.photo ? (
                      <img src={pet.photo} alt={pet.name} className="pet-card-avatar" />
                    ) : (
                      <div className="pet-card-avatar" style={{ 
                        backgroundColor: 'var(--primary-glow)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: 'var(--primary)',
                        fontWeight: '800',
                        fontSize: '2rem'
                      }}>
                        {pet.name[0]}
                      </div>
                    )}
                    <div className="pet-card-info">
                      <h3>{pet.name}</h3>
                      <span className="badge badge-primary">{pet.species}</span>
                      <p style={{ marginTop: '0.25rem' }}>{pet.breed}</p>
                    </div>
                  </div>

                  <div className="pet-card-stats">
                    <div className="pet-card-stat-item">
                      <span className="stat-label">Age</span>
                      <span style={{ fontWeight: '600' }}>{getAge(pet.birthdate)}</span>
                    </div>
                    <div className="pet-card-stat-item">
                      <span className="stat-label">Current Weight</span>
                      <span style={{ fontWeight: '600' }}>{latestWeight}</span>
                    </div>
                  </div>

                  <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: pet.notes ? 'normal' : 'italic' }}>
                      {pet.notes || 'No notes added yet.'}
                    </p>
                  </div>

                  <div className="pet-card-actions">
                    <button className="btn btn-secondary" style={{ padding: '0.5rem' }} onClick={() => openEditPet(pet)}>
                      <Edit3 size={16} />
                    </button>
                    <button className="btn btn-danger" style={{ padding: '0.5rem', color: 'white' }} onClick={() => deletePet(pet.id, pet.name)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. HEALTH LOGS (WEIGHT LOGS ONLY) VIEW */}
        {activeTab === 'health' && (
          <div className="dashboard-grid">
            <div className="col-12">
              <div className="glass-card">
                <h3 style={{ marginBottom: '1.5rem' }}>Weight Logs</h3>
                {selectedPetId === 'all' ? (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                    Please select a specific pet from the header to manage weight logs.
                  </p>
                ) : (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <p style={{ fontWeight: '600' }}>Logs for {currentPet?.name}</p>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <select
                          value={weightSort}
                          onChange={(e) => setWeightSort(e.target.value)}
                          className="form-select"
                          style={{ padding: '0.35rem 2rem 0.35rem 0.75rem', fontSize: '0.8rem', minWidth: '155px', height: 'auto', fontWeight: '600' }}
                        >
                          <option value="date-desc">📅 Date: Newest First</option>
                          <option value="date-asc">📅 Date: Oldest First</option>
                          <option value="weight-desc">⚖️ Weight: Highest First</option>
                          <option value="weight-asc">⚖️ Weight: Lowest First</option>
                        </select>
                        <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={openAddWeight}>
                          + Add Log
                        </button>
                      </div>
                    </div>
                    {(!currentPet?.weightLogs || getFilteredByTimeframe(currentPet.weightLogs, 'date').length === 0) ? (
                      <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem' }}>No weight logs found for this period.</p>
                    ) : (
                      <div style={{ overflowX: 'auto' }}>
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Weight</th>
                              <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getSortedWeightLogs(currentPet.weightLogs).map((log) => (
                              <tr key={log.date}>
                                <td>{log.date}</td>
                                <td style={{ fontWeight: '600' }}>{log.weight} kg</td>
                                <td style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.25rem' }}>
                                  <button className="btn-icon" style={{ width: '30px', height: '30px', display: 'inline-flex' }} onClick={() => openEditWeight(currentPet.id, log)}>
                                    <Edit3 size={12} style={{ color: 'var(--primary)' }} />
                                  </button>
                                  <button className="btn-icon" style={{ width: '30px', height: '30px', display: 'inline-flex' }} onClick={() => deleteWeightLog(currentPet.id, log.date)}>
                                    <Trash2 size={12} style={{ color: 'var(--danger)' }} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Weight Analysis Summary Card */}
                    {currentPet?.weightLogs && getFilteredByTimeframe(currentPet.weightLogs, 'date').length > 0 && (
                      <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--bg-card)' }}>
                        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                          <Scale size={18} style={{ color: 'var(--primary)' }} />
                          Weight Insights & Analysis
                        </h4>
                        {(() => {
                          const analysis = getWeightAnalysis(getFilteredByTimeframe(currentPet.weightLogs, 'date'));
                          return (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', textAlign: 'center' }}>
                                <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-app)', borderRadius: '8px' }}>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Average</div>
                                  <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{analysis.avg} kg</div>
                                </div>
                                <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-app)', borderRadius: '8px' }}>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Min / Max</div>
                                  <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{analysis.min} / {analysis.max} kg</div>
                                </div>
                                <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-app)', borderRadius: '8px' }}>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Change</div>
                                  <div style={{ fontWeight: '700', fontSize: '1.1rem', color: analysis.isPositive ? 'var(--success)' : 'var(--text-main)' }}>{analysis.changeText}</div>
                                </div>
                              </div>
                              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic', marginTop: '0.25rem', lineHeight: '1.4' }}>
                                💡 {analysis.text}
                              </p>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3b. REMINDERS VIEW */}
        {activeTab === 'reminders' && (
          <div className="dashboard-grid">
            <div className="col-12">
              <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3>All Reminders</h3>
                  <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={openAddReminder}>
                    New Reminder
                  </button>
                </div>
                {filteredReminders.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem' }}>No reminders scheduled.</p>
                ) : (
                  <div className="reminders-list">
                    {filteredReminders.map(rem => {
                      const pet = pets.find(p => p.id === rem.petId);
                      return (
                        <div key={rem.id} className="reminder-item" style={{ opacity: rem.completed ? 0.6 : 1 }}>
                          <button 
                            onClick={() => toggleReminderCompleted(rem.id)} 
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: rem.completed ? 'var(--success)' : 'var(--text-muted)' }}
                          >
                            <CheckCircle2 size={24} fill={rem.completed ? 'var(--success-glow)' : 'transparent'} />
                          </button>
                          <div className="reminder-content">
                            <span className="reminder-title" style={{ textDecoration: rem.completed ? 'line-through' : 'none', color: rem.completed ? 'var(--text-muted)' : 'var(--text-main)' }}>
                              {rem.title}
                            </span>
                            <div className="reminder-meta">
                              <span className="badge badge-primary" style={{ marginRight: '0.5rem' }}>{pet ? pet.name : 'Unknown Pet'}</span>
                              <span>Due: {rem.date} {rem.time ? `@ ${rem.time}` : ''}</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', marginRight: '0.5rem' }}>
                              <span className="badge badge-secondary">{rem.type}</span>
                              {rem.recurrence && rem.recurrence !== 'none' && (
                                <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '0.1rem 0.5rem' }}>🔁 {rem.recurrence}</span>
                              )}
                            </div>
                            <button className="btn-icon" style={{ width: '32px', height: '32px' }} onClick={() => deleteReminder(rem.id)}>
                              <X size={14} style={{ color: 'var(--danger)' }} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3c. VACCINATION VIEW */}
        {activeTab === 'vaccination' && (
          <div className="dashboard-grid">
            <div className="col-12">
              <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3>Vaccination Log & Brand Records</h3>
                  <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={openAddVaccine}>
                    Log Vaccination
                  </button>
                </div>
                {selectedPetId === 'all' ? (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem' }}>
                    Please select a specific pet from the header bar to view and log vaccinations.
                  </p>
                ) : (
                  <div>
                    <p style={{ fontWeight: '600', marginBottom: '1rem' }}>Vaccination Records for {currentPet?.name}</p>
                    {(!currentPet?.vaccineLogs || currentPet.vaccineLogs.length === 0) ? (
                      <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem' }}>No vaccination records logged yet.</p>
                    ) : (
                      <div style={{ overflowX: 'auto' }}>
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Vaccine Name</th>
                              <th>Brand / Manufacturer</th>
                              <th>Notes</th>
                              <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentPet.vaccineLogs.map((log) => (
                              <tr key={log.id}>
                                <td>{log.date}</td>
                                <td style={{ fontWeight: '600', color: 'var(--primary)' }}>{log.vaccineName}</td>
                                <td>
                                  {log.brand ? (
                                    <span className="badge badge-secondary" style={{ textTransform: 'none' }}>
                                      {log.brand}
                                    </span>
                                  ) : (
                                    <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.85rem' }}>Unspecified Brand</span>
                                  )}
                                </td>
                                <td style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{log.notes || '-'}</td>
                                <td style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.25rem' }}>
                                  <button className="btn-icon" style={{ width: '30px', height: '30px', display: 'inline-flex' }} onClick={() => openEditVaccine(currentPet.id, log)}>
                                    <Edit3 size={12} style={{ color: 'var(--primary)' }} />
                                  </button>
                                  <button className="btn-icon" style={{ width: '30px', height: '30px', display: 'inline-flex' }} onClick={() => deleteVaccine(currentPet.id, log.id)}>
                                    <Trash2 size={12} style={{ color: 'var(--danger)' }} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 4. EXPENSES VIEW */}
        {activeTab === 'expenses' && (
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3>Expense Registry</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                  Manage and monitor your pet-related expenditures.
                </p>
              </div>
              <button className="btn btn-primary" onClick={openAddExpense}>
                Track New Expense
              </button>
            </div>

            {/* Expense Analysis Summary */}
            {filteredExpenses.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--bg-card)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Total Spent ({timeframe})</span>
                    <span className="badge badge-primary" style={{ textTransform: 'capitalize' }}>{timeframe}</span>
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary)' }}>
                    {currencySymbol}{totalExpenses.toLocaleString()}
                  </div>
                </div>

                <div style={{ padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--bg-card)' }}>
                  {(() => {
                    const analysis = getExpenseAnalysis(filteredExpenses);
                    return (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Top Spending Category</span>
                          <span className="badge badge-secondary" style={{ backgroundColor: `${categoryColors[analysis.topCategory]}15`, color: categoryColors[analysis.topCategory] }}>
                            {analysis.topCategory} ({analysis.pct}%)
                          </span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic', marginTop: '0.25rem', lineHeight: '1.4' }}>
                          💡 {analysis.text}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {filteredExpenses.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>No expense records found.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Pet</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenses.map(exp => {
                      const pet = pets.find(p => p.id === exp.petId);
                      return (
                        <tr key={exp.id}>
                          <td>{exp.date}</td>
                          <td>
                            <span className="badge badge-primary">{pet ? pet.name : 'Unknown'}</span>
                          </td>
                          <td>
                            <span className="badge badge-secondary" style={{ backgroundColor: `${categoryColors[exp.category]}15`, color: categoryColors[exp.category] }}>
                              {exp.category}
                            </span>
                          </td>
                          <td style={{ color: 'var(--text-muted)' }}>{exp.description || '-'}</td>
                          <td style={{ fontWeight: '700' }}>{currencySymbol}{exp.amount.toLocaleString()}</td>
                          <td style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.25rem' }}>
                            <button className="btn-icon" style={{ width: '32px', height: '32px', display: 'inline-flex' }} onClick={() => openEditExpense(exp)}>
                              <Edit3 size={14} style={{ color: 'var(--primary)' }} />
                            </button>
                            <button className="btn-icon" style={{ width: '32px', height: '32px', display: 'inline-flex' }} onClick={() => deleteExpense(exp.id)}>
                              <Trash2 size={14} style={{ color: 'var(--danger)' }} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 5. SETTINGS VIEW */}
        {activeTab === 'settings' && (
          <div className="dashboard-grid">
            <div className="col-6">
              <div className="glass-card">
                <h3 style={{ marginBottom: '1.25rem' }}>Data Backup & Security</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Pawfecto is a local-first application. To ensure your pet records are never lost, back them up locally onto your PC or phone.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <button className="btn btn-secondary" onClick={exportBackup} style={{ justifyContent: 'flex-start' }}>
                    <Download size={18} /> Export / Download Backup (.json)
                  </button>

                  <div style={{ position: 'relative' }}>
                    <label className="btn btn-secondary" style={{ justifyContent: 'flex-start', width: '100%', cursor: 'pointer' }}>
                      <Upload size={18} /> Restore / Upload Backup (.json)
                      <input 
                        type="file" 
                        accept=".json" 
                        onChange={importBackup} 
                        style={{ display: 'none' }} 
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <h3 style={{ marginBottom: '1.25rem' }}>App Configuration</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: '600' }}>Color Mode Theme</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Switch between Light and Dark interface modes.</p>
                    </div>
                    <button className="btn btn-secondary" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                    <div>
                      <p style={{ fontWeight: '600' }}>Preferred Currency</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Select the default currency symbol for expenses.</p>
                    </div>
                    <select 
                      className="form-select" 
                      style={{ maxWidth: '140px' }}
                      value={currency} 
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="THB">THB (฿)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                    <div>
                      <p style={{ fontWeight: '600' }}>Reset Application</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Clear all customizations and reload default mock pets.</p>
                    </div>
                    <button className="btn btn-danger" onClick={resetToFactory}>
                      Reset App Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. APP GUIDE & TOUR VIEW */}
        {activeTab === 'guide' && (
          <div className="dashboard-grid">
            <div className="col-12">
              <div className="glass-card">
                <h3 style={{ marginBottom: '1rem' }}>Interactive Onboarding Missions</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Complete these tutorial steps to understand how Pawfecto keeps your pet's life structured.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--bg-app)' }}>
                    <div>
                      <p style={{ fontWeight: '700', fontSize: '0.95rem' }}>🐾 Mission 1: Add a Pet Profile</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Register your pet's basic bio, birthdate, and breed details.</p>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={openAddPet}>
                      Launch Mission
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--bg-app)' }}>
                    <div>
                      <p style={{ fontWeight: '700', fontSize: '0.95rem' }}>⚖️ Mission 2: Log weight history</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Record weight to render interactive growth curves.</p>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={openAddWeight}>
                      Launch Mission
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--bg-app)' }}>
                    <div>
                      <p style={{ fontWeight: '700', fontSize: '0.95rem' }}>💰 Mission 3: Log a food/medical bill</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Map items to populate your category financial donut chart.</p>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={openAddExpense}>
                      Launch Mission
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--bg-app)' }}>
                    <div>
                      <p style={{ fontWeight: '700', fontSize: '0.95rem' }}>⏰ Mission 4: Set a recurring vaccine alarm</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Choose times, frequencies, and trigger desktop alerts.</p>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={openAddReminder}>
                      Launch Mission
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- MODALS CONTROLLERS --- */}

      {/* 1. Pet Modal */}
      {showPetModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2>{editingPet ? 'Edit Pet Profile' : 'Register New Pet'}</h2>
              <button onClick={() => setShowPetModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={savePet}>
              <div className="form-group" style={{ alignItems: 'center', marginBottom: '1.5rem' }}>
                <label className="form-label">Profile Image</label>
                <label className="photo-uploader">
                  {petForm.photo ? (
                    <img src={petForm.photo} alt="Preview" className="photo-preview" />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                      <Upload size={24} />
                      <span style={{ fontSize: '0.8rem' }}>Upload Photo (max 2MB)</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                </label>
              </div>

              <div className="form-group">
                <label className="form-label">Pet Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={petForm.name} 
                  onChange={(e) => setPetForm({ ...petForm, name: e.target.value })} 
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Species</label>
                  <select 
                    className="form-select" 
                    value={petForm.species} 
                    onChange={(e) => setPetForm({ ...petForm, species: e.target.value })}
                  >
                    <option value="Dog">Dog 🐕</option>
                    <option value="Cat">Cat 🐈</option>
                    <option value="Rabbit">Rabbit 🐇</option>
                    <option value="Bird">Bird 🦜</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Breed</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={petForm.breed} 
                    onChange={(e) => setPetForm({ ...petForm, breed: e.target.value })} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Birthdate</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={petForm.birthdate} 
                  onChange={(e) => setPetForm({ ...petForm, birthdate: e.target.value })} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Medical Notes / Bio</label>
                <textarea 
                  className="form-textarea" 
                  rows="3" 
                  value={petForm.notes} 
                  onChange={(e) => setPetForm({ ...petForm, notes: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowPetModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Expense Modal */}
      {showExpenseModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2>Track Expense</h2>
              <button onClick={() => setShowExpenseModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={saveExpense}>
              <div className="form-group">
                <label className="form-label">Select Pet</label>
                <select 
                  className="form-select" 
                  value={expenseForm.petId} 
                  onChange={(e) => setExpenseForm({ ...expenseForm, petId: e.target.value })}
                  required
                >
                  <option value="" disabled>Choose a pet...</option>
                  {pets.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select 
                    className="form-select" 
                    value={expenseForm.category} 
                    onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                  >
                    <option value="Food">Food</option>
                    <option value="Medical">Medical</option>
                    <option value="Toys">Toys</option>
                    <option value="Litter">Litter</option>
                    <option value="Grooming">Grooming</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Amount ({currencySymbol})</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input 
                      type="number" 
                      step="any" 
                      className="form-input" 
                      value={expenseForm.amount} 
                      onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} 
                      required 
                    />
                    <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', flexGrow: 1 }} onClick={() => adjustExpense(-10)}>-10</button>
                      <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', flexGrow: 1 }} onClick={() => adjustExpense(-1)}>-1</button>
                      <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', flexGrow: 1 }} onClick={() => adjustExpense(1)}>+1</button>
                      <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', flexGrow: 1 }} onClick={() => adjustExpense(10)}>+10</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={expenseForm.date} 
                  onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description / Vendor</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={expenseForm.description} 
                  onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowExpenseModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Log Transaction</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Reminder Modal */}
      {showReminderModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2>Schedule Reminder</h2>
              <button onClick={() => setShowReminderModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={saveReminder}>
              <div className="form-group">
                <label className="form-label">Select Pet</label>
                <select 
                  className="form-select" 
                  value={reminderForm.petId} 
                  onChange={(e) => setReminderForm({ ...reminderForm, petId: e.target.value })}
                  required
                >
                  <option value="" disabled>Choose a pet...</option>
                  {pets.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Type</label>
                <select 
                  className="form-select" 
                  value={reminderForm.type} 
                  onChange={(e) => setReminderForm({ ...reminderForm, type: e.target.value })}
                >
                  <option value="Vaccine">Vaccination</option>
                  <option value="Medication">Medication</option>
                  <option value="Grooming">Grooming/Bath</option>
                  <option value="Checkup">Clinic Checkup</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Task Details</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Feline Leukemia Booster"
                  value={reminderForm.title} 
                  onChange={(e) => setReminderForm({ ...reminderForm, title: e.target.value })} 
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Scheduled Date</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={reminderForm.date} 
                    onChange={(e) => setReminderForm({ ...reminderForm, date: e.target.value })} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Scheduled Time (hh:mm)</label>
                  <input 
                    type="time" 
                    className="form-input" 
                    value={reminderForm.time} 
                    onChange={(e) => setReminderForm({ ...reminderForm, time: e.target.value })} 
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Repeat / Recurrence</label>
                <select 
                  className="form-select" 
                  value={reminderForm.recurrence} 
                  onChange={(e) => setReminderForm({ ...reminderForm, recurrence: e.target.value })}
                >
                  <option value="none">One-time event</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowReminderModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Schedule Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Weight Modal */}
      {showWeightModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2>{editingWeight ? 'Edit Weight Record' : 'Log Pet Weight'}</h2>
              <button onClick={() => { setShowWeightModal(false); setEditingWeight(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={saveWeight}>
              <div className="form-group">
                <label className="form-label">Select Pet</label>
                <select 
                  className="form-select" 
                  value={weightForm.petId} 
                  onChange={(e) => setWeightForm({ ...weightForm, petId: e.target.value })}
                  required
                >
                  <option value="" disabled>Choose a pet...</option>
                  {pets.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Weight (kg)</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input 
                    type="number" 
                    step="any" 
                    placeholder="e.g. 5.4"
                    className="form-input" 
                    value={weightForm.weight} 
                    onChange={(e) => setWeightForm({ ...weightForm, weight: e.target.value })} 
                    required 
                  />
                  <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', flexGrow: 1 }} onClick={() => adjustWeight(-10)}>-10</button>
                    <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', flexGrow: 1 }} onClick={() => adjustWeight(-1)}>-1</button>
                    <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', flexGrow: 1 }} onClick={() => adjustWeight(1)}>+1</button>
                    <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', flexGrow: 1 }} onClick={() => adjustWeight(10)}>+10</button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Date Recorded</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={weightForm.date} 
                  onChange={(e) => setWeightForm({ ...weightForm, date: e.target.value })} 
                  required 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => { setShowWeightModal(false); setEditingWeight(null); }}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingWeight ? 'Save Changes' : 'Log Weight'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4b. Vaccination Modal */}
      {showVaccineModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2>{editingVaccine ? 'Edit Vaccination Record' : 'Log Vaccination'}</h2>
              <button onClick={() => { setShowVaccineModal(false); setEditingVaccine(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={saveVaccine}>
              <div className="form-group">
                <label className="form-label">Select Pet</label>
                <select 
                  className="form-select" 
                  value={vaccineForm.petId} 
                  onChange={(e) => setVaccineForm({ ...vaccineForm, petId: e.target.value })}
                  required
                >
                  <option value="" disabled>Choose a pet...</option>
                  {pets.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Vaccine Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. DHPP Core Vaccine, Rabies booster"
                  value={vaccineForm.vaccineName} 
                  onChange={(e) => setVaccineForm({ ...vaccineForm, vaccineName: e.target.value })} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Brand / Manufacturer</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Nobivac, Defensor 3, Zoetis"
                  value={vaccineForm.brand} 
                  onChange={(e) => setVaccineForm({ ...vaccineForm, brand: e.target.value })} 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date Administered</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={vaccineForm.date} 
                  onChange={(e) => setVaccineForm({ ...vaccineForm, date: e.target.value })} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea 
                  className="form-input" 
                  placeholder="e.g. Next booster due in 12 months, mild lethargy afterwards"
                  value={vaccineForm.notes} 
                  onChange={(e) => setVaccineForm({ ...vaccineForm, notes: e.target.value })} 
                  style={{ minHeight: '80px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => { setShowVaccineModal(false); setEditingVaccine(null); }}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingVaccine ? 'Save Changes' : 'Log Vaccination'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* 5. Alert Popup Modal */}
      {alertPopup && (
        <div className="modal-overlay" style={{ zIndex: 1000 }}>
          <div className="modal-content" style={{ maxWidth: '420px', textAlign: 'center', border: '2px solid var(--primary)' }}>
            <div style={{ backgroundColor: 'var(--primary-glow)', display: 'inline-flex', padding: '1rem', borderRadius: '50%', marginBottom: '1.25rem', color: 'var(--primary)' }}>
              <Bell size={36} />
            </div>
            
            <h2 style={{ marginBottom: '0.5rem' }}>Reminder Alert!</h2>
            <p style={{ fontWeight: '600', fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>
              {alertPopup.title}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Scheduled for {alertPopup.petName} at {alertPopup.time} on {alertPopup.date}.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  toggleReminderCompleted(alertPopup.id);
                  setAlertPopup(null);
                }}
              >
                Mark as Completed
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  const id = alertPopup.id;
                  setAlertPopup(null);
                  showFeedback(
                    <span>
                      Reminder dismissed.
                      <button 
                        onClick={() => toggleReminderCompleted(id)} 
                        style={{ 
                          background: 'white', 
                          color: 'var(--primary)', 
                          border: 'none', 
                          borderRadius: '6px', 
                          padding: '4px 10px', 
                          marginLeft: '10px', 
                          fontWeight: '700', 
                          cursor: 'pointer',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        Mark Completed
                      </button>
                    </span>,
                    'info'
                  );
                }}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
