export default function renderErrors(state) {
  const feedbackElement = document.querySelector('.feedback');
  const inputField = document.querySelector('#url-input');

  if (state.submitForm.error) {
    feedbackElement.textContent = state.submitForm.error;
    feedbackElement.classList.remove('text-success');
    feedbackElement.classList.add('text-danger');
    inputField.classList.add('is-invalid');
  } else if (state.submitForm.success) {
    feedbackElement.textContent = state.submitForm.success;
    feedbackElement.classList.remove('text-danger');
    feedbackElement.classList.add('text-success');
    inputField.classList.remove('is-invalid');
  } else {
    feedbackElement.textContent = '';
    feedbackElement.classList.remove('text-danger', 'text-success');
    inputField.classList.remove('is-invalid');
  }
}
