const STORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');


let formData = {
  email: '',
  message: '',
};

const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);

    formData = {
      email: (parsedData.email ?? '').trim(),
      message: (parsedData.message ?? '').trim(),
    };

    formEl.elements.email.value = formData.email;
    formEl.elements.message.value = formData.message;
  } catch (error) {
 
    localStorage.removeItem(STORAGE_KEY);
  }
}


formEl.addEventListener('input', onFormInput);


formEl.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  const { name, value } = event.target;


  if (name !== 'email' && name !== 'message') return;


  formData[name] = value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  formData = { email: '', message: '' };
  formEl.reset();
}
