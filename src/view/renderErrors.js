export default function renderErrors(state) {
  const feedbackElement = document.querySelector('.feedback');
  const inputField = document.querySelector('#url-input');

  const { error, success } = state.submitForm;

  feedbackElement.textContent = error || success || '';
  inputField.classList.toggle('is-invalid', !!error);

  feedbackElement.classList.remove('text-danger', 'text-success');

  if (error) {
    feedbackElement.classList.add('text-danger');
  } else if (success) {
    feedbackElement.classList.add('text-success');
  }
}
