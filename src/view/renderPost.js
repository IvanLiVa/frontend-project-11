export default function renderPosts(state, i18nextInstance) {
  const postList = document.querySelector('.posts');
  postList.innerHTML = '';

  if (state.posts.length > 0) {
    const postTitle = document.createElement('h2');
    postTitle.textContent = i18nextInstance.t('Posts');
    postList.appendChild(postTitle);

    const ulPost = document.createElement('ul');
    state.posts.forEach((post) => {
      const liPost = document.createElement('li');
      liPost.classList.add('liPost');

      const postLink = document.createElement('a');
      postLink.setAttribute('href', post.link);
      postLink.setAttribute('target', '_blank');
      postLink.textContent = post.title;

      if (state.readPosts.includes(post.id)) {
        postLink.classList.remove('fw-bold');
        postLink.classList.add('fw-normal');
      } else {
        postLink.classList.add('fw-bold');
      }

      const button = document.createElement('button');
      button.classList.add('buttonPost');
      button.setAttribute('type', 'button');
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#exampleModal');
      button.textContent = i18nextInstance.t('view');

      liPost.appendChild(postLink);
      liPost.appendChild(button);
      ulPost.appendChild(liPost);

      const markPostAsRead = () => {
        if (!state.readPosts.includes(post.id)) {
          state.readPosts.push(post.id);
        }
        renderPosts(state, i18nextInstance);
      };

      button.addEventListener('click', () => {
        const modalTitle = document.querySelector('#exampleModalLabel');
        const modalBody = document.querySelector('.modal-body');
        modalTitle.textContent = post.title;
        modalBody.textContent = post.description || 'Нет описания';
        const viewButton = document.querySelector('.modal-footer .btn-primary');

        viewButton.onclick = () => {
          const link = document.createElement('a');
          link.href = post.link;
          link.target = '_blank';
          link.click();
        };
        markPostAsRead();
      });

      postLink.addEventListener('click', () => {
        markPostAsRead();
      });
    });

    postList.appendChild(ulPost);
  }
}
