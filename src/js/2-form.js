const STORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');

let formData = {
  email: '',
  message: '',
};

const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  try {
    formData = JSON.parse(savedData);

    formEl.elements.email.value = formData.email ?? '';
    formEl.elements.message.value = formData.message ?? '';
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

formEl.addEventListener('input', onFormInput);
formEl.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  const { name, value } = event.target;

  if (name !== 'email' && name !== 'message') return;

  formData[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  if (formData.email.trim() === '' || formData.message.trim() === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  formEl.reset();
}
