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

  //  рисуем  ошибку
  const feedbackElement = document.querySelector('.feedback');
  feedbackElement.textContent = state.submitForm.error;
}
