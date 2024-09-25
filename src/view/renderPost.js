import i18n from 'i18next';

export default function renderPosts(state) {
  const postList = document.querySelector('.posts');
  postList.innerHTML = ''; // Очистим перед отрисовкой

  if (state.posts.length > 0) {
    const postTitle = document.createElement('h2');
    postTitle.textContent = i18n.t('postsTitle');
    postList.appendChild(postTitle);

    const ulPost = document.createElement('ul');
    state.posts.forEach((post) => {
      const liPost = document.createElement('li');
      liPost.classList.add('liPost');

      const postLink = document.createElement('a');
      postLink.setAttribute('href', post.link);
      postLink.setAttribute('target', '_blank');
      postLink.classList.add('postLink');
      postLink.textContent = post.title;

      const button = document.createElement('button');
      button.classList.add('buttonPost');
      button.setAttribute('type', 'button');
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#exampleModal');
      button.textContent = i18n.t('Просмотр');
      if (state.readPosts.includes(post.id)) {
        postLink.classList.add('read'); // если есть  айди  прочтианно добавляем класс
      }
      liPost.appendChild(postLink);
      liPost.appendChild(button);
      ulPost.appendChild(liPost);

      button.addEventListener('click', () => {
        const modalTitle = document.querySelector('#exampleModalLabel');
        const modalBody = document.querySelector('.modal-body');
        modalTitle.textContent = post.title;
        modalBody.textContent = post.description || 'Нет описания';
        const viewButton = document.querySelector('.modal-footer .btn-primary');
        viewButton.onclick = () => {
          window.open(post.link, '_blank');
        };
        if (!state.readPosts.includes(post.id)) {
          state.readPosts.push(post.id);
        }
        renderPosts(state);
      });
    });

    postList.appendChild(ulPost);
  }
}
