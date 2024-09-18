import * as yup from 'yup';
import onChange from 'on-change';
import render from './View.js';
import i18n from './i18n.js';

export default function app() {
  const state = {
    submitForm: {
      success: '',
      error: '',
    },
    feedList: [],
  };

  function createFormSchema() {
    return yup.object().shape({
      inputValue: yup
        .string()
        .trim()
        .url(i18n.t('errorURL'))
        .required()
        .notOneOf(state.feedList, i18n.t('duplicateURL')),
    });
  }
  const watchState = onChange(state, () => {
    render(state);
  });

  function handleFunction(inputValue) {
    const formSchema = createFormSchema();

    formSchema
      .validate({ inputValue }, { abortEarly: false })
      .then(() => {
        watchState.feedList.push(inputValue);
        watchState.submitForm.error = '';
        watchState.submitForm.success = i18n.t('success');
      })
      .catch((error) => {
        watchState.submitForm.error = error.message; // назначаем ошибку  стейту
      });
  }

  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue = document.querySelector('#url-input').value;
    handleFunction(inputValue);
    document.querySelector('#url-input').value = ''; // Очистка поля ввода
  });

  document.getElementById('change-lang').addEventListener('click', () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang).then(() => {
      render(state); // рисуем   состояние с новым языком
    });
  });

}
