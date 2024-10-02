import renderFeeds from './renderFeed.js';
import renderPosts from './renderPost.js';
import renderErrors from './renderErrors.js';

export default function render(state, i18nextInstance) {
  const renderPath = (path) => {
    switch (path) {
      case 'submitForm.error':
      case 'submitForm.success':
        renderErrors(state);
        break;
      case 'feed':
        renderFeeds(state, i18nextInstance);
        break;
      case 'posts':
      case 'readPosts':
        renderPosts(state, i18nextInstance);
        break;
      default:
        break;
    }
  };
  return renderPath;
}
