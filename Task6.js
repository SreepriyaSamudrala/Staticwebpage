const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successDiv = document.getElementById('formSuccess');

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function setError(input, msgId, message) {
  input.classList.add('error-input');
  input.classList.remove('success-input');
  document.getElementById(msgId).textContent = message;
}

function setSuccess(input, msgId) {
  input.classList.remove('error-input');
  input.classList.add('success-input');
  document.getElementById(msgId).textContent = '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;
  successDiv.textContent = '';

  const nameVal = nameInput.value.trim();
  const emailVal = emailInput.value.trim();
  const msgVal = messageInput.value.trim();

  if (!nameVal) {
    setError(nameInput, 'nameError', 'Name is required');
    valid = false;
  } else setSuccess(nameInput, 'nameError');

  if (!emailVal) {
    setError(emailInput, 'emailError', 'Email is required');
    valid = false;
  } else if (!isValidEmail(emailVal)) {
    setError(emailInput, 'emailError', 'Invalid email format');
    valid = false;
  } else setSuccess(emailInput, 'emailError');

  if (!msgVal) {
    setError(messageInput, 'messageError', 'Message is required');
    valid = false;
  } else setSuccess(messageInput, 'messageError');

  if (valid) {
    successDiv.textContent = 'Thank you – your message has been sent!';
    form.reset();
    [nameInput, emailInput, messageInput].forEach(i =>
      i.classList.remove('error-input', 'success-input')
    );
  }
});

[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener('input', () => {
    const val = input.value.trim();
    if (input.id === 'name') {
      val ? setSuccess(input, 'nameError') : setError(input, 'nameError', 'Name is required');
    } else if (input.id === 'email') {
      if (!val) setError(input, 'emailError', 'Email is required');
      else if (!isValidEmail(val)) setError(input, 'emailError', 'Invalid email format');
      else setSuccess(input, 'emailError');
    } else {
      val ? setSuccess(input, 'messageError') : setError(input, 'messageError', 'Message is required');
    }
  });
});
