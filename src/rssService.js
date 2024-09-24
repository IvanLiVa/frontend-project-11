import axios from 'axios';
import { uniqueId } from 'lodash';
import parseRss from './parserXML.js';

// Функция для добавления фида
export const addFeed = (watchedState, data, urlRss) => {
  const feedWithId = {
    id: uniqueId('feed_'),
    urlRss,
    title: data.channel.title,
    description: data.channel.description,
  };
  watchedState.feed.push(feedWithId);
};

// Функция добавления поста
export const addPost = (watchedState, feedId, title, link) => {
  const post = {
    id: uniqueId('post_'),
    feedId, // Связываем пост с определённым фидом
    title,
    link, // Сохраняем ссылку на пост
  };
  watchedState.posts.push(post);
};

// Функция для получения и парсинга фида
export const fetchAndParseFeed = (watchedState, url) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;

  return axios
    .get(proxyUrl)
    .then((response) => {
      try {
        const data = parseRss(response.data.contents);
        addFeed(watchedState, data, url);

        // Получаем ID последнего добавленного фида
        const lastFeedId = watchedState.feed[watchedState.feed.length - 1].id;

        // Добавляем посты, связывая их с последним добавленным фидом
        return Promise.all(
          data.items.map((item) => addPost(watchedState, lastFeedId, item.title, item.link)),
        );
      } catch (parseError) {
        watchedState.submitForm.error = `Ошибка парсинга данных: ${parseError.message}`;
        return Promise.reject(parseError);
      }
    })
    .catch((networkError) => {
      watchedState.submitForm.error = `Ошибка сети: ${networkError.message}`;
      return Promise.reject(networkError);
    });
};

export default fetchAndParseFeed;
