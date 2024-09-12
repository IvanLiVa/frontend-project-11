import * as yup from 'yup';

function initState() {
  return {
    submitForm: {
      valid: '',
      error: '',
    },
    feedList: [],
  };
}

function validateState(inputValue, callback) {
  const state = initState();
  const formSchema = yup.object().shape({
    inputValue: yup
      .string()
      .trim()
      .url('Ссылка должна быть валидным URL')
      .required('Поле не может быть пустым')
      .notOneOf(state.feedList, 'Этот URL уже существует в списке фидов'),
  });

  formSchema
    .validate({ inputValue }, { abortEarly: false })
    .then(() => {
      state.feedList.push(inputValue);
      callback(state);
    })
    .catch((error) => {
      state.submitForm.error = error.message;
      callback(state);
    });
}

validateState('https://lorem-rss.hexlet.aeed', (state) => {
  console.log(state);
});


