import * as yup from 'yup';
import onChange from 'on-change';
import render from './View.js';
import i18n from './i18n.js';
import fetchAndParseFeed from './rssService.js';
import startUpdatingPosts from './startUpdatingPosts.js';

export default function app() {
  const state = {
    feed: [],
    posts: [],
    submitForm: {
      error: '',
      success: '',
    },
    validationInputs: [],
  };

  function createFormSchema() {
    return yup.object().shape({
      inputValue: yup
        .string()
        .trim()
        .url(i18n.t('errorURL'))
        .required()
        .notOneOf(state.validationInputs, i18n.t('duplicateURL')),
    });
  }

  const watchedState = onChange(state, (path) => {
    if (
      path === 'feed'
      || path === 'posts'
      || path === 'submitForm.error'
      || path === 'submitForm.success'
    ) {
      render(watchedState);
    }
  });

  // основная функция для  формы
  function handleFormSubmit(inputValue) {
    const formSchema = createFormSchema();
    formSchema
      .validate({ inputValue }, { abortEarly: false })
      .then(() => {
        watchedState.validationInputs.push(inputValue);
        watchedState.submitForm.error = '';
        watchedState.submitForm.success = i18n.t('success');
        return fetchAndParseFeed(watchedState, inputValue);
      })
      .then(() => {
        startUpdatingPosts(watchedState);
      })
      .catch((error) => {
        watchedState.submitForm.error = error.message; // Обновляем ошибку
        watchedState.submitForm.success = ''; // Очищаем успех
      });
  }

  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputField = document.querySelector('#url-input');
    const inputValue = inputField.value.trim();
    handleFormSubmit(inputValue);
    inputField.value = '';
  });

  document.getElementById('change-lang').addEventListener('click', () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang).then(() => {
      render(state);
    });
  });
}
