import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import render from './view/View.js';
import fetchAndParseFeed from './rssServices/rssService.js';
import resources from './locales/index.js';
import updatePosts from './rssServices/updatePosts.js';

export default function app() {
  const getMessageError = (error) => {
    if (error.isParsingError) {
      return 'parsingError';
    }
    if (axios.isAxiosError(error)) {
      return 'networkError';
    }
    return error.message.key ?? 'unknown';
  };

  const state = {
    feed: [],
    posts: [],
    submitForm: {
      error: '',
      success: '',
    },
    readPosts: [],
  };

  function createFormSchema() {
    return yup.object().shape({
      inputValue: yup
        .string()
        .trim()
        .required(() => ({ key: 'empty' }))
        .url(() => ({ key: 'notURL' }))
        .notOneOf(
          state.feed.map((feed) => feed.urlRss),
          () => ({ key: 'duplicateURL' }),
        ),
    });
  }

  const i18nextInstance = i18next.createInstance();
  i18nextInstance
    .init({
      lng: 'ru',
      debug: false,
      resources,
    })
    .then(() => {
      const watchedState = onChange(state, (path) => {
        render(watchedState, i18nextInstance)(path);
      });

      const handleFormSubmit = (inputValue) => {
        const formSchema = createFormSchema();
        formSchema
          .validate({ inputValue }, { abortEarly: false })

          .then(() => {
            watchedState.submitForm.error = '';
            return fetchAndParseFeed(watchedState, inputValue);
          })
          .then(() => {
            updatePosts(watchedState);
            watchedState.submitForm.success = i18nextInstance.t('success');
          })
          .catch((error) => {
            const errorMessageKey = getMessageError(error);
            watchedState.submitForm.error = i18nextInstance.t(errorMessageKey);
          });
      };

      const form = document.querySelector('.rss-form');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputField = document.querySelector('#url-input');
        const inputValue = inputField.value.trim();
        handleFormSubmit(inputValue);
        inputField.value = '';
      });

      const markPostAsRead = (postId) => {
        if (!state.readPosts.includes(postId)) {
          console.log('включили в постайди');
          watchedState.readPosts.push(postId);
        }
      };

      const ulPost = document.querySelector('.posts');
      ulPost.addEventListener('click', (event) => {
        const postElement = event.target.closest('.liPost');
        if (postElement) {
          const postId = postElement.getAttribute('data-id');
          const post = state.posts.find((p) => p.id === postId);
          if (event.target.tagName === 'BUTTON') {
            const modalTitle = document.querySelector('#exampleModalLabel');
            const modalBody = document.querySelector('.modal-body');
            modalTitle.textContent = post.title;
            modalBody.textContent = post.description || 'Нет описания';

            const viewButton = document.querySelector(
              '.modal-footer .btn-primary',
            );
            viewButton.onclick = () => {
              const link = document.createElement('a');
              link.href = post.link;
              link.target = '_blank';
              link.click();
            };

            markPostAsRead(postId);
          } else if (event.target.tagName === 'A') {
            markPostAsRead(postId);
          }
        }
      });
    });
}
