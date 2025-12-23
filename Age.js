const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function ageCalculate() {
  const input = document.getElementById('date-input').value;
  if (!input) {
    alert('Please select your birth date');
    return;
  }

  const today = new Date();
  const birthDate = new Date(input);

  leapChecker(today.getFullYear());

  // Future date check
  if (birthDate > today) {
    alert('Not born yet');
    resetExtraInfo();
    return;
  }

  // ---- Age Calculation ----
  let years = today.getFullYear() - birthDate.getFullYear();
  let monthsDiff = today.getMonth() - birthDate.getMonth();
  let daysDiff = today.getDate() - birthDate.getDate();

  if (daysDiff < 0) {
    monthsDiff--;
    const prevMonth = today.getMonth() - 1 < 0 ? 11 : today.getMonth() - 1;
    daysDiff += months[prevMonth];
  }

  if (monthsDiff < 0) {
    years--;
    monthsDiff += 12;
  }

  displayResult(daysDiff, monthsDiff, years);

  // ---- Total Days & Weeks Lived ----
  const diffTime = today - birthDate;
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);

  document.getElementById('totalDays').textContent = totalDays;
  document.getElementById('totalWeeks').textContent = totalWeeks;

  // ---- Next Birthday Countdown ----
  let nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const daysLeft = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

  document.getElementById('nextBirthday').textContent = daysLeft;
}

function displayResult(days, months, years) {
  document.getElementById('days').textContent = days;
  document.getElementById('months').textContent = months;
  document.getElementById('years').textContent = years;
}

function leapChecker(year) {
  months[1] =
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
}

function resetExtraInfo() {
  document.getElementById('years').textContent = '-';
  document.getElementById('months').textContent = '-';
  document.getElementById('days').textContent = '-';
  document.getElementById('totalDays').textContent = '-';
  document.getElementById('totalWeeks').textContent = '-';
  document.getElementById('nextBirthday').textContent = '-';
}

// Tab View
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const tab = button.dataset.tab;

    // Reset buttons
    tabButtons.forEach((btn) => {
      btn.classList.remove('bg-black', 'text-white');
      btn.classList.add('bg-gray-200', 'text-gray-700');
    });

    // Activate button
    button.classList.add('bg-black', 'text-white');
    button.classList.remove('bg-gray-200', 'text-gray-700');

    // Hide all contents
    tabContents.forEach((content) => content.classList.add('hidden'));

    // Show selected content
    document.getElementById(`tab-${tab}`).classList.remove('hidden');
  });
});
