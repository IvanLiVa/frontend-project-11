export default function renderModalId(state, i18nextInstance, elements) {
  const post = state.posts.find((p) => p.id === state.modalPostId);
  if (post) {
    elements.modalTitle.textContent = i18nextInstance.t(post.title);
    elements.modalBody.textContent = i18nextInstance.t(post.description);
    elements.viewButton.onclick = () => {
      const link = document.createElement('a');
      link.href = post.link;
      link.target = '_blank';
      link.click();
    };
  }
}
