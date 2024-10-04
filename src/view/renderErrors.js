export default function renderErrors(state, i18nextInstance) {
  const feedbackElement = document.querySelector('.feedback');

  if (state.submitForm.error === '') {
    return;
  }

  feedbackElement.classList.add('text-danger');
  feedbackElement.textContent = i18nextInstance.t(`${state.submitForm.error}`);
}
