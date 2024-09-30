import renderFeeds from './renderFeed.js';
import renderPosts from './renderPost.js';
import renderErrors from './renderErrors.js';

export default function render(state, i18nextInstance) {
  renderFeeds(state, i18nextInstance);
  renderPosts(state, i18nextInstance);
  renderErrors(state);
}
