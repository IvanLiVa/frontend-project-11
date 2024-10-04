function renderInvalid(
  inputField,
  feedbackElement,
  submitButton,
  i18nextInstance,
) {
  submitButton.disabled = false;
  inputField.classList.add('is-invalid');
  feedbackElement.classList.remove('text-success', 'text-warning');
  feedbackElement.classList.add('text-danger');
  feedbackElement.textContent = i18nextInstance.t('invalid');
}

function renderSending(
  inputField,
  feedbackElement,
  submitButton,
  i18nextInstance,
) {
  submitButton.disabled = true;
  inputField.classList.remove('is-invalid');
  feedbackElement.classList.remove('text-danger', 'text-success');
  feedbackElement.classList.add('text-warning');
  feedbackElement.textContent = i18nextInstance.t('sending');
}

function renderAdded(
  inputField,
  feedbackElement,
  submitButton,
  form,
  i18nextInstance,
) {
  submitButton.disabled = false;
  inputField.classList.remove('is-invalid');
  feedbackElement.classList.remove('text-danger', 'text-warning');
  feedbackElement.classList.add('text-success');
  feedbackElement.textContent = i18nextInstance.t('success');
  form.reset();
  inputField.focus();
}

export default function renderFormState(state, i18nextInstance) {
  const feedbackElement = document.querySelector('.feedback');
  const inputField = document.querySelector('#url-input');
  const form = document.querySelector('.rss-form');
  const submitButton = form.querySelector('[type="submit"]');

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
