const renderInvalid = (
  inputField,
  feedbackElement,
  submitButton,
  i18nextInstance,
) => {
  submitButton.disabled = false;
  inputField.classList.add('is-invalid');
  feedbackElement.classList.remove('text-success', 'text-warning');
  feedbackElement.classList.add('text-danger');
  feedbackElement.textContent = i18nextInstance.t('invalid');
  inputField.value = '';
  inputField.focus();
};

const renderSending = (
  inputField,
  feedbackElement,
  submitButton,
  i18nextInstance,
) => {
  submitButton.disabled = true;
  inputField.classList.remove('is-invalid');
  feedbackElement.classList.remove('text-danger', 'text-success');
  feedbackElement.classList.add('text-warning');
  feedbackElement.textContent = i18nextInstance.t('sending');
};

const renderAdded = (
  inputField,
  feedbackElement,
  submitButton,
  form,
  i18nextInstance,
) => {
  submitButton.disabled = false;
  inputField.classList.remove('is-invalid');
  feedbackElement.classList.remove('text-danger', 'text-warning');
  feedbackElement.classList.add('text-success');
  feedbackElement.textContent = i18nextInstance.t('success');
  form.reset();
  inputField.focus();
};

export default function renderFormState(state, i18nextInstance, elements) {
  const {
    feedbackElement, inputField, submitButton, form,
  } = elements;

  const renderState = (status) => {
    switch (status) {
      case 'invalid':
        renderInvalid(
          inputField,
          feedbackElement,
          submitButton,
          i18nextInstance,
        );
        break;
      case 'sending':
        renderSending(
          inputField,
          feedbackElement,
          submitButton,
          i18nextInstance,
        );
        break;
      case 'added':
        renderAdded(
          inputField,
          feedbackElement,
          submitButton,
          form,
          i18nextInstance,
        );
        break;
      default:
        break;
    }
  };

  renderState(state.formState);
}
