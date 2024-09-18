import i18n from 'i18next';

export default function render(state) {
  // рисуем  лист
  const feedList = document.querySelector('.feeds');
  const ulElement = document.createElement('ul');
  feedList.innerHTML = ''; // Очищаем старые элементы списка
  feedList.appendChild(ulElement);

  state.feedList.forEach((element) => {
    const liElement = document.createElement('li');
    liElement.textContent = element;
    ulElement.appendChild(liElement);
  });

  // Рисуем ошибки и успешные сообщения, из бустрап  взят класс тект дэнжер
  const feedbackElement = document.querySelector('.feedback');
  const inputField = document.querySelector('#url-input');

  if (state.submitForm.error) {
    feedbackElement.textContent = state.submitForm.error;
    feedbackElement.classList.remove('text-success');
    feedbackElement.classList.add('text-danger');
    inputField.classList.add('is-invalid');
  } else if (state.submitForm.success) {
    feedbackElement.textContent = state.submitForm.success;
    feedbackElement.classList.remove('text-danger');
    feedbackElement.classList.add('text-success');
    inputField.classList.remove('is-invalid');
  } else {
    feedbackElement.textContent = '';
    feedbackElement.classList.remove('text-danger', 'text-success');
    inputField.classList.remove('is-invalid');
  }

  // определяем тэги для перевода
  document.querySelector('h1').textContent = i18n.t('mainTitle');
  document.querySelector('label[for="url-input"]').textContent = i18n.t('inputPlaceholder');
  document.querySelector('button[aria-label="add"]').textContent = i18n.t('button');
  document.querySelector('.example-link').textContent = i18n.t('exampleLink');
  document.querySelector('.lead').textContent = i18n.t('lead');
  document.querySelector('#change-lang').textContent = i18n.t('changeLang');
}
