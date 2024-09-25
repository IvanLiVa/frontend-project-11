import axios from 'axios';
import parseRSS from './parserXML.js';
import { addPost } from './rssService.js';

// Функция для проверки обновлений
const checkForUpdates = (watchedState) => {
  watchedState.feed.forEach((feed) => {
    const feedLink = feed.urlRss;
    // console.log('Полученная ссылка:', feedLink);

    const proxyUrl = `https://allorigins.hexlet.app/get?url=${encodeURIComponent(feedLink)}`;

    axios
      .get(proxyUrl)
      .then((response) => {
        const xmlString = response.data.contents;
        const parsedData = parseRSS(xmlString);
        const newPosts = parsedData.items; // получили пост

        // console.log(
        //   'Количество постов до обновления:',
        //   watchedState.posts.length,
        // );

        // Сверяем каждый новый пост с существующими по ссылочке
        newPosts.forEach((newPost) => {
          const isAlreadyExists = watchedState.posts.some(
            (existingPost) => existingPost.link === newPost.link,
          );

          //  так  если  Не - Уже существует  добавляем в стейт
          if (!isAlreadyExists) {
            // console.log('Найден новый пост:', newPost.title);
            addPost(watchedState, feed.id, newPost.title, newPost.link);
          }
        });

        // console.log(
        //   'Количество постов после обновления:',
        //   watchedState.posts.length,
        // );
      })
      .catch((error) => {
        console.error(`Ошибка при запросе фида: ${error.message}`);
      });
  });
};

const startUpdatingPosts = (watchedState) => {
  const update = () => {
    checkForUpdates(watchedState);
    setTimeout(update, 5000);
  };

  update();
};

export default startUpdatingPosts;
