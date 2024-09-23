import { DOMParser } from 'xmldom';

const parseRSS = (xmlString) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

  const channelTitle = xmlDoc.getElementsByTagName('title')[0]?.textContent
    || 'Нет названия канала';
  const channelDescription = xmlDoc.getElementsByTagName('description')[0]?.textContent
    || 'Нет описания канала';

  const items = xmlDoc.getElementsByTagName('item');
  const result = [];

  Array.from(items).forEach((el) => {
    const title = el.getElementsByTagName('title')[0]?.textContent || 'Нет заголовка';
    const link = el.getElementsByTagName('link')[0]?.textContent || 'Нет ссылки';

    result.push({ title, link });
  });

  return {
    channel: {
      title: channelTitle,
      description: channelDescription,
    },
    items: result,
  };
};

export default parseRSS;
