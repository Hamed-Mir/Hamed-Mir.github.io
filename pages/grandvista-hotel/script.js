const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = !mobileNav.classList.contains('hidden');
  mobileNav.classList.toggle('hidden');
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.textContent = isOpen ? '☰' : '×';
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

// Set sensible default dates and prevent selecting a checkout before check-in.
const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');
const toLocalISO = date => {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
};
const today = new Date();
const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
const dayAfter = new Date(today); dayAfter.setDate(today.getDate() + 2);
checkin.min = toLocalISO(today);
checkout.min = toLocalISO(tomorrow);
checkin.value = toLocalISO(tomorrow);
checkout.value = toLocalISO(dayAfter);

checkin.addEventListener('change', () => {
  const nextDay = new Date(`${checkin.value}T12:00:00`);
  nextDay.setDate(nextDay.getDate() + 1);
  checkout.min = toLocalISO(nextDay);
  if (!checkout.value || checkout.value <= checkin.value) checkout.value = toLocalISO(nextDay);
});

document.getElementById('booking-form').addEventListener('submit', event => {
  event.preventDefault();
  const message = document.getElementById('booking-message');
  if (!checkin.value || !checkout.value || checkout.value <= checkin.value) {
    message.textContent = 'Please choose a check-out date after your check-in date.';
    message.classList.remove('hidden');
    return;
  }
  message.textContent = `Your search: ${checkin.value} → ${checkout.value} · ${document.getElementById('guests').value}. Connect this form to a booking service to accept real reservations.`;
  message.classList.remove('hidden');
});
