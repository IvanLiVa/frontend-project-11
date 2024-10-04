export default (state, i18nextInstance, elements) => {
	let { feedbackElement, inputField, submitButton, form } = elements;
	let feedbackClass = '';
	let feedbackText = '';
  
	const setSubmitButtonState = (isDisabled) => {
	  submitButton.disabled = isDisabled;
	};
  
	const renderState = (status) => {
	  switch (status) {
		case 'invalid': {
		  setSubmitButtonState(false);
		  inputField.classList.add('is-invalid');
		  feedbackClass = 'text-danger';
		  feedbackText = i18nextInstance.t('invalid');
		  inputField.value = '';
		  inputField.focus();
		  break;
		}
		case 'sending': {
		  setSubmitButtonState(true);
		  inputField.classList.remove('is-invalid');
		  feedbackClass = 'text-warning';
		  feedbackText = i18nextInstance.t('sending');
		  break;
		}
		case 'added': {
		  setSubmitButtonState(false);
		  inputField.classList.remove('is-invalid');
		  feedbackClass = 'text-success';
		  feedbackText = i18nextInstance.t('success');
		  form.reset();
		  inputField.focus();
		  break;
		}
		default:
		  break;
	  }
  
	  // Устанавливаем класс и текст для элемента обратной связи
	  feedbackElement.className = feedbackClass; // Присваиваем класс напрямую
	  feedbackElement.textContent = feedbackText;
	};
  
	renderState(state.formState);
  };
