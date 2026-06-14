// --- INPUT SANITIZER ---
export const sanitizeInput = (val) => {
  if (typeof val !== 'string') return val;
  return val.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
};

// --- AGE CALCULATOR ---
export const getAge = (birthdateString) => {
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

// --- LOCAL DATE PARSER ---
export const parseLocalDate = (dateStr) => {
  if (!dateStr) return null;
  const cleanStr = dateStr.split('T')[0];
  const parts = cleanStr.split('-');
  if (parts.length !== 3) return null;
  const [year, month, day] = parts.map(Number);
  return new Date(year, month - 1, day);
};

// --- REMINDERS RECURRENCE HELPER ---
export const getNextOccurrence = (dateStr, timeStr, recurrence) => {
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
