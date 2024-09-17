import * as yup from 'yup';
import onChange from 'on-change';
import render from './View.js';

export default function app() {
  const state = {
    submitForm: {
      error: '',
    },
    feedList: [],
  };

  function createFormSchema() {
    return yup.object().shape({
      inputValue: yup
        .string()
        .trim()
        .url('Ссылка должна быть валидным URL')
        .required('Поле не может быть пустым')
        .notOneOf(state.feedList, 'Этот URL уже существует в списке фидов'),
    });
  }
  const watchState = onChange(state, () => {
    render(state);
  });

  function handleFunction(inputValue) {
    const formSchema = createFormSchema();

    formSchema
      .validate({ inputValue }, { abortEarly: false })
      .then(() => {
        watchState.feedList.push(inputValue);
        watchState.submitForm.error = 'Rss успешно  загружен'; // убираем  ошибку  при успешной  валидации
      })
      .catch((error) => {
        watchState.submitForm.error = error.message; // назначаем ошибку  стейту
      });
  }

  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue = document.querySelector('#url-input').value;
    handleFunction(inputValue);
    document.querySelector('#url-input').value = ''; // Очистка поля ввода
  });
}
