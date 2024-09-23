import i18n from 'i18next';

export default function render(state) {
  // Отрисовка фидов
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

  // Отрисовка постов
  const postList = document.querySelector('.posts');
  postList.innerHTML = ''; // Очистим перед отрисовкой

  if (state.posts.length > 0) {
    const postTitle = document.createElement('h2');
    postTitle.textContent = i18n.t('postsTitle');
    postList.appendChild(postTitle);

    const ulPost = document.createElement('ul');
    state.posts.forEach((post) => {
      const liPost = document.createElement('li');
      const postLink = document.createElement('a');
      postLink.setAttribute('href', post.link);
      postLink.setAttribute('target', '_blank');
      postLink.textContent = post.title;
      liPost.appendChild(postLink);
      ulPost.appendChild(liPost);
    });
    postList.appendChild(ulPost);
  }

  // Отрисовка ошибок и успешных сообщений
  const feedbackElement = document.querySelector('.feedback');
  const inputField = document.querySelector('#url-input');

  if (state.submitForm.error) {
    feedbackElement.textContent = state.submitForm.error;
    console.log(state.submitForm.error);
    feedbackElement.classList.remove('text-success');
    feedbackElement.classList.add('text-danger');
    inputField.classList.add('is-invalid');
  } else if (state.submitForm.success) {
    feedbackElement.textContent = state.submitForm.success;
    console.log(state.submitForm.success);
    feedbackElement.classList.remove('text-danger');
    feedbackElement.classList.add('text-success');
    inputField.classList.remove('is-invalid');
  } else {
    feedbackElement.textContent = '';
    feedbackElement.classList.remove('text-danger', 'text-success');
    inputField.classList.remove('is-invalid');
  }

  // Переводы
  document.querySelector('h1').textContent = i18n.t('mainTitle');
  document.querySelector('label[for="url-input"]').textContent = i18n.t('inputPlaceholder');
  document.querySelector('button[aria-label="add"]').textContent = i18n.t('button');
  document.querySelector('.example-link').textContent = i18n.t('exampleLink');
  document.querySelector('.lead').textContent = i18n.t('lead');
  document.querySelector('#change-lang').textContent = i18n.t('changeLang');
}
