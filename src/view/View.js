import i18n from 'i18next';
import renderFeeds from './renderFeed.js';
import renderPosts from './renderPost.js';
import renderErrors from './renderErrors.js';

export default function render(state) {
  // Отрисовка фидов
  renderFeeds(state);
  // Отрисовка постов
  renderPosts(state);
  // Отрисовка ошибок и успешных сообщений
  renderErrors(state);
  // Переводы
  document.querySelector('h1').textContent = i18n.t('mainTitle');
  document.querySelector('label[for="url-input"]').textContent = i18n.t('inputPlaceholder');
  document.querySelector('button[aria-label="add"]').textContent = i18n.t('button');
  document.querySelector('.example-link').textContent = i18n.t('exampleLink');
  document.querySelector('.lead').textContent = i18n.t('lead');
  document.querySelector('#change-lang').textContent = i18n.t('changeLang');
}
