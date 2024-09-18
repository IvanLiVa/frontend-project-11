import i18next from 'i18next';

i18next.init({
  lng: 'ru', // по дефолту
  resources: {
    ru: {
      translation: {
        button: 'Добавить',
        mainTitle: 'RSS агрегатор',
        inputPlaceholder: 'ссылка RSS',
        errorURL: 'Ссылка должна быть валидным URL',
        duplicateURL: 'Этот URL уже существует в списке фидов',
        success: 'RSS успешно загружен',
        exampleLink: 'Пример: https://lorem-rss.hexlet.app/feed',
        lead: 'Начните читать RSS сегодня! Это легко, это красиво.',
        changeLang: 'English',
      },
    },
    en: {
      translation: {
        button: 'Add',
        mainTitle: 'RSS Aggregator',
        inputPlaceholder: 'RSS link',
        errorURL: 'The link must be a valid URL',
        duplicateURL: 'This URL already exists in the feed list',
        success: 'RSS successfully loaded',
        exampleLink: 'Example: https://lorem-rss.hexlet.app/feed',
        lead: 'Start reading RSS today! It’s easy and beautiful.',
        changeLang: 'Русский',
      },
    },
  },
});

export default i18next;
