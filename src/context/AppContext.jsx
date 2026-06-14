import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_PETS, 
  INITIAL_EXPENSES, 
  INITIAL_REMINDERS, 
  CURRENCIES, 
  categoryColors 
} from '../utils/constants';
import { 
  sanitizeInput, 
  getAge, 
  parseLocalDate, 
  getNextOccurrence 
} from '../utils/helpers';

const AppContext = createContext();

export function AppProvider({ children }) {
  // --- CORE STATE ---
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
    const loaded = saved ? JSON.parse(saved) : INITIAL_REMINDERS;
    const limitDate = new Date();
    limitDate.setMonth(limitDate.getMonth() - 3);

    return loaded.filter(rem => {
      if (rem.completed && rem.date) {
        const parts = rem.date.split('-');
        if (parts.length === 3) {
          const [yr, mo, dy] = parts.map(Number);
          const remDate = new Date(yr, mo - 1, dy);
          if (remDate.getTime() < limitDate.getTime()) {
            return false;
          }
        }
      }
      return true;
    });
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('pawfecto_theme') || localStorage.getItem('pawsome_theme');
    return saved || 'light';
  });

  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('pawfecto_currency') || localStorage.getItem('pawsome_currency') || 'THB';
  });

  const currencySymbol = CURRENCIES[currency] || '$';

  // --- FILTERS & INTERACTION STATE ---
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPetId, setSelectedPetId] = useState(() => {
    const saved = localStorage.getItem('pawfecto_pets') || localStorage.getItem('pawsome_pets');
    const petsList = saved ? JSON.parse(saved) : INITIAL_PETS;
    if (petsList && petsList.length > 0) {
      const randomIndex = Math.floor(Math.random() * petsList.length);
      return petsList[randomIndex].id;
    }
    return 'all';
  });
  const [timeframe, setTimeframe] = useState('month'); // 'week' | 'month' | 'year' | 'specific' | 'custom'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [specificDate, setSpecificDate] = useState('');
  const [weightSort, setWeightSort] = useState('date-desc'); // 'date-desc' | 'date-asc' | 'weight-desc' | 'weight-asc'

  // --- TOAST & DIALOG POPUPS ---
  const [toast, setToast] = useState(null);
  const [alertPopup, setAlertPopup] = useState(null);

  // --- MODAL STATE ---
  const [showPetModal, setShowPetModal] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [petForm, setPetForm] = useState({ name: '', species: 'Dog', breed: '', birthdate: '', notes: '', photo: '' });

  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenseForm, setExpenseForm] = useState({ petId: '', category: 'Food', amount: '', date: '', description: '' });

  const [showReminderModal, setShowReminderModal] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [reminderForm, setReminderForm] = useState({ petId: '', type: 'Vaccine', title: '', date: '', time: '09:00', recurrence: 'none' });

  const [showWeightModal, setShowWeightModal] = useState(false);
  const [editingWeight, setEditingWeight] = useState(null);
  const [weightForm, setWeightForm] = useState({ petId: '', date: '', weight: '' });

  const [showVaccineModal, setShowVaccineModal] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState(null);
  const [vaccineForm, setVaccineForm] = useState({
    petId: '',
    date: '',
    vaccineName: '',
    brand: '',
    notes: '',
    createAlert: false,
    alertDate: '',
    alertTime: '09:00',
    alertRecurrence: 'yearly'
  });

  // --- TOAST FEEDBACK ---
  const showFeedback = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // --- LOCAL STORAGE EFFECTS ---
  useEffect(() => {
    localStorage.setItem('pawfecto_pets', JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    localStorage.setItem('pawfecto_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    const limitDate = new Date();
    limitDate.setMonth(limitDate.getMonth() - 3);

    const pruned = reminders.filter(rem => {
      if (rem.completed && rem.date) {
        const parts = rem.date.split('-');
        if (parts.length === 3) {
          const [yr, mo, dy] = parts.map(Number);
          const remDate = new Date(yr, mo - 1, dy);
          if (remDate.getTime() < limitDate.getTime()) {
            return false;
          }
        }
      }
      return true;
    });

    localStorage.setItem('pawfecto_reminders', JSON.stringify(pruned));
    if (pruned.length !== reminders.length) {
      setReminders(pruned);
    }
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('pawfecto_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('pawfecto_currency', currency);
  }, [currency]);

  // --- AUDIO ALARMS & DESKTOP ALERTS ---
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
      const localDate = now.getFullYear() + '-' + 
        String(now.getMonth() + 1).padStart(2, '0') + '-' + 
        String(now.getDate()).padStart(2, '0');
      const localTime = String(now.getHours()).padStart(2, '0') + ':' + 
        String(now.getMinutes()).padStart(2, '0');

      let updated = false;
      const nextReminders = reminders.map(rem => {
        if (!rem.completed && !rem.notified) {
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
    }, 4000);

    return () => clearInterval(checkInterval);
  }, [reminders, pets]);

  // --- CRUD ACTIONS ---

  // 1. PETS CRUD
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
    if (e) e.preventDefault();
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

  // 2. EXPENSES CRUD
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
    if (e) e.preventDefault();
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

  // 3. REMINDERS CRUD
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
    if (e) e.preventDefault();
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
    setReminders(prevReminders => prevReminders.map(rem => {
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

  // 4. WEIGHT TRACKING CRUD
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
    if (e) e.preventDefault();
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

    setSelectedPetId(weightForm.petId);

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

  // 5. VACCINE CRUD
  const openAddVaccine = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    let nextYearStr = '';
    try {
      const d = new Date();
      d.setFullYear(d.getFullYear() + 1);
      nextYearStr = d.toISOString().split('T')[0];
    } catch(err) {
      nextYearStr = todayStr;
    }
    setEditingVaccine(null);
    setVaccineForm({
      petId: selectedPetId === 'all' ? (pets[0]?.id || '') : selectedPetId,
      date: todayStr,
      vaccineName: '',
      brand: '',
      notes: '',
      createAlert: false,
      alertDate: nextYearStr,
      alertTime: '09:00',
      alertRecurrence: 'yearly'
    });
    setShowVaccineModal(true);
  };

  const openEditVaccine = (petId, log) => {
    let nextYearStr = '';
    try {
      const d = new Date(log.date);
      d.setFullYear(d.getFullYear() + 1);
      nextYearStr = d.toISOString().split('T')[0];
    } catch(err) {
      nextYearStr = log.date;
    }
    setEditingVaccine({ petId, ...log });
    setVaccineForm({
      petId: petId,
      date: log.date,
      vaccineName: log.vaccineName,
      brand: log.brand || '',
      notes: log.notes || '',
      createAlert: false,
      alertDate: nextYearStr,
      alertTime: '09:00',
      alertRecurrence: 'yearly'
    });
    setShowVaccineModal(true);
  };

  const saveVaccine = (e) => {
    if (e) e.preventDefault();
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
        nextLogs = [...nextLogs, logData].sort((a, b) => new Date(b.date) - new Date(a.date));
        return { ...p, vaccineLogs: nextLogs };
      }
      return p;
    }));

    setSelectedPetId(vaccineForm.petId);

    if (vaccineForm.createAlert) {
      if (!vaccineForm.alertDate) {
        return showFeedback('Please specify booster alert date.', 'danger');
      }
      const reminderData = {
        id: Date.now().toString() + '_vax',
        petId: vaccineForm.petId,
        type: 'Vaccine',
        title: `${nameClean} Booster`,
        date: vaccineForm.alertDate,
        time: vaccineForm.alertTime || '09:00',
        recurrence: vaccineForm.alertRecurrence || 'none',
        completed: false
      };
      setReminders(prev => [...prev, reminderData]);
    }

    if (editingVaccine) {
      showFeedback('Vaccination record updated successfully!');
    } else {
      if (vaccineForm.createAlert) {
        showFeedback('Vaccination logged and booster reminder scheduled!');
      } else {
        showFeedback('Vaccination logged successfully!');
      }
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

  // 6. BACKUP & RESTORE / SYSTEM
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

  // --- DERIVED / COMPUTED DATA FOR RENDER ---
  const currentPet = pets.find(p => p.id === selectedPetId);

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
      } else if (timeframe === '2years') {
        const diffTime = startOfToday.getTime() - itemDate.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays <= 730;
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

  const categoryTotals = filteredExpenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const getWeightAnalysis = (logs, pet) => {
    if (!logs || logs.length === 0) return { avg: 0, min: 0, max: 0, changeText: 'N/A', text: 'No logs for this period.', status: 'info' };
    const weights = logs.map(l => l.weight);
    const avg = (weights.reduce((s, w) => s + w, 0) / weights.length).toFixed(1);
    const min = Math.min(...weights).toFixed(1);
    const max = Math.max(...weights).toFixed(1);
    
    let text = '';
    let changeText = 'Stable';
    let status = 'info'; // 'success' | 'warning' | 'danger' | 'info'
    
    const ageInMonths = pet ? (() => {
      if (!pet.birthdate) return 24;
      const birth = new Date(pet.birthdate);
      const today = new Date();
      return (today.getFullYear() - birth.getFullYear()) * 12 + today.getMonth() - birth.getMonth();
    })() : 24;
    
    const isGrowingAge = ageInMonths <= 12;
    const species = pet?.species || 'Dog';

    if (logs.length >= 2) {
      const first = logs[0].weight;
      const last = logs[logs.length - 1].weight;
      const diff = last - first;
      const diffText = diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1);
      const pct = first > 0 ? (diff / first) * 100 : 0;
      const pctText = pct > 0 ? `+${pct.toFixed(1)}` : pct.toFixed(1);
      changeText = `${diffText} kg (${pctText}%)`;

      if (diff > 0) {
        if (isGrowingAge) {
          if (pct > 50 && species === 'Cat') {
            status = 'warning';
            text = `Rapid weight gain (+${pct.toFixed(0)}%) detected for growing kitten ${pet?.name}. Ensure growth is steady and consult your vet if bloating is present.`;
          } else {
            status = 'success';
            text = `Healthy upward growth trend (+${pct.toFixed(0)}%) for growing junior ${pet?.name || 'pet'}. Keep up the great work!`;
          }
        } else {
          if (pct <= 3) {
            status = 'info';
            text = `Weight is stable with minor fluctuation (+${pct.toFixed(1)}%). Perfect weight maintenance for adult ${pet?.name}.`;
          } else if (pct > 3 && pct <= 12) {
            status = 'warning';
            text = `Moderate weight increase (+${pct.toFixed(1)}%) for adult ${pet?.name}. Keep an eye on treats and daily calorie intake to prevent obesity.`;
          } else {
            status = 'danger';
            text = `Warning: Significant weight jump (+${pct.toFixed(1)}%) for adult ${pet?.name}. This could indicate obesity risk, medical changes, or a logging error.`;
          }
        }
      } else if (diff < 0) {
        const absPct = Math.abs(pct);
        if (isGrowingAge) {
          status = 'danger';
          text = `Alert: Junior pet ${pet?.name || 'pet'} has lost weight (-${absPct.toFixed(1)}%). Growing animals should not lose weight; please consult your vet.`;
        } else {
          if (absPct <= 3) {
            status = 'info';
            text = `Weight is stable with minor fluctuation (-${absPct.toFixed(1)}%). Good weight maintenance for adult ${pet?.name}.`;
          } else if (absPct > 3 && absPct <= 10) {
            status = 'success';
            text = `Weight decreased by -${absPct.toFixed(1)}%. If ${pet?.name} is on a vet-approved weight loss diet, this is excellent progress!`;
          } else {
            status = 'danger';
            text = `Danger: Rapid weight loss detected (-${absPct.toFixed(1)}%) for ${pet?.name}. Significant weight drop can indicate health issues; seek vet advice.`;
          }
        }
      } else {
        status = 'info';
        text = `Weight is perfectly stable (0.0 kg change). Excellent maintenance for ${pet?.name}.`;
      }
    } else {
      text = `Log at least 2 weight records to analyze weight change trends for ${pet?.name || 'your pet'}.`;
    }
    
    return { avg, min, max, changeText, text, status };
  };

  const getExpenseAnalysis = (filteredExps) => {
    if (filteredExps.length === 0) return { topCategory: 'N/A', pct: 0, text: 'No expenses recorded for this period.' };
    const total = filteredExps.reduce((s, e) => s + e.amount, 0);
    
    const catTotalsVal = filteredExps.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});
    
    let topCat = 'N/A';
    let topVal = 0;
    Object.keys(catTotalsVal).forEach(cat => {
      if (catTotalsVal[cat] > topVal) {
        topVal = catTotalsVal[cat];
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

  return (
    <AppContext.Provider value={{
      // Core states
      pets, setPets,
      expenses, setExpenses,
      reminders, setReminders,
      theme, setTheme,
      currency, setCurrency,
      currencySymbol,

      // Filter states
      activeTab, setActiveTab,
      selectedPetId, setSelectedPetId,
      timeframe, setTimeframe,
      startDate, setStartDate,
      endDate, setEndDate,
      specificDate, setSpecificDate,
      weightSort, setWeightSort,

      // Feedback / alerts
      toast, setToast, showFeedback,
      alertPopup, setAlertPopup,

      // Modals Visibility
      showPetModal, setShowPetModal,
      editingPet, setEditingPet,
      petForm, setPetForm,

      showExpenseModal, setShowExpenseModal,
      editingExpense, setEditingExpense,
      expenseForm, setExpenseForm,

      showReminderModal, setShowReminderModal,
      editingReminder, setEditingReminder,
      reminderForm, setReminderForm,

      showWeightModal, setShowWeightModal,
      editingWeight, setEditingWeight,
      weightForm, setWeightForm,

      showVaccineModal, setShowVaccineModal,
      editingVaccine, setEditingVaccine,
      vaccineForm, setVaccineForm,

      // Methods / Handlers
      openAddPet, openEditPet, savePet, deletePet,
      openAddExpense, openEditExpense, saveExpense, adjustExpense, deleteExpense,
      openAddReminder, saveReminder, toggleReminderCompleted, deleteReminder,
      openAddWeight, openEditWeight, saveWeight, adjustWeight, deleteWeightLog,
      openAddVaccine, openEditVaccine, saveVaccine, deleteVaccine,
      exportBackup, importBackup, resetToFactory,

      // Derived getters
      currentPet,
      getSortedWeightLogs,
      getFilteredByTimeframe,
      filteredExpenses,
      totalExpenses,
      filteredReminders,
      categoryTotals,
      getWeightAnalysis,
      getExpenseAnalysis
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
export default AppContext;
