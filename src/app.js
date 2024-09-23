import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';
import { uniqueId } from 'lodash';
import render from './View.js';
import i18n from './i18n.js';
import parseRss from './parserXML.js';

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
    console.log('State changed:', path);
    if (
      path === 'feed'
      || path === 'posts'
      || path === 'submitForm.error'
      || path === 'submitForm.success'
    ) {
      render(watchedState); // Рендерим, если обновляется фид, пост или ошибка/успех формы
    }
  });

  const addFeed = (data) => {
    const feedWithId = {
      id: uniqueId('feed_'),
      title: data.channel.title,
      description: data.channel.description,
    };
    watchedState.feed.push(feedWithId);
  };

  // Функция добавления поста
  const addPost = (feedId, title, link) => {
    const post = {
      id: uniqueId('post_'),
      feedId, // Связываем пост с определённым фидом
      title,
      link,
    };
    watchedState.posts.push(post);
  };

  const fetchAndParseFeed = (url) => {
    const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;

    axios
      .get(proxyUrl)
      .then((response) => {
        try {
          const data = parseRss(response.data.contents);
          addFeed(data); // Добавляем фид в состояние
          data.items.forEach((item) => addPost(
            watchedState.feed[watchedState.feed.length - 1].id,
            item.title,
            item.link,
          ));
          watchedState.submitForm.error = '';
        } catch (parseError) {
          watchedState.submitForm.error = `Ошибка парсинга данных: ${parseError.message}`;
        }
      })
      .catch((networkError) => {
        if (networkError.response) {
          watchedState.submitForm.error = `Ошибка сети: ${networkError.message}`;
        } else if (networkError.request) {
          watchedState.submitForm.error = `Нет ответа от сервера: ${networkError.message}`;
        } else {
          watchedState.submitForm.error = `Ошибка запроса: ${networkError.message}`;
        }
      });
  };

  // основная функция для  формы
  function handleFormSubmit(inputValue) {
    const formSchema = createFormSchema();
    formSchema
      .validate({ inputValue }, { abortEarly: false })
      .then(() => {
        watchedState.validationInputs.push(inputValue);
        watchedState.submitForm.error = '';
        watchedState.submitForm.success = i18n.t('success');
        fetchAndParseFeed(inputValue);
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
    console.log('inputValue:', inputValue.validationInputs);
    inputField.value = '';
  });

  document.getElementById('change-lang').addEventListener('click', () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang).then(() => {
      render(state);
    });
  });
}
