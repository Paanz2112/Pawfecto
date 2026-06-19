// ponytail: deleted sanitizeInput since React handles XSS auto-escaping by default.

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

// --- IMAGE COMPRESSION HELPER ---
export const compressImage = (file, maxWidth = 256, maxHeight = 256, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

// --- BACKUP DATA VALIDATOR ---
export const validateBackupData = (data) => {
  if (!data || typeof data !== 'object') return false;
  if (!Array.isArray(data.pets) || !Array.isArray(data.expenses) || !Array.isArray(data.reminders)) return false;

  // Validate pets
  for (const pet of data.pets) {
    if (!pet.id || typeof pet.name !== 'string' || typeof pet.species !== 'string') return false;
    if (pet.weightLogs && !Array.isArray(pet.weightLogs)) return false;
    if (pet.vaccineLogs && !Array.isArray(pet.vaccineLogs)) return false;
  }

  // Validate expenses
  for (const exp of data.expenses) {
    if (!exp.id || !exp.petId || typeof exp.category !== 'string') return false;
    const amountVal = Number(exp.amount);
    if (isNaN(amountVal) || amountVal < 0) return false;
  }

  // Validate reminders
  for (const rem of data.reminders) {
    if (!rem.id || !rem.petId || typeof rem.title !== 'string') return false;
  }

  return true;
};
