import i18n from 'i18next';

export default function renderFeeds(state) {
  const feedList = document.querySelector('.feeds');
  feedList.innerHTML = ''; // Очистим перед отрисовкой
  if (state.feed.length > 0) {
    const feedTitle = document.createElement('h2');
    feedTitle.textContent = i18n.t('feedsTitle');
    feedList.appendChild(feedTitle);

    const ulFeed = document.createElement('ul');
    state.feed.forEach((feed) => {
      const liFeed = document.createElement('li');

      const feedTitleElement = document.createElement('strong');
      feedTitleElement.textContent = feed.title;
      liFeed.appendChild(feedTitleElement);

      const feedDescription = document.createElement('p');
      feedDescription.textContent = feed.description;
      liFeed.appendChild(feedDescription);

      ulFeed.appendChild(liFeed);
    });
    feedList.appendChild(ulFeed);
  }
}
