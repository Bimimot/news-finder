function getDateFrom(days) {
  let dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - days);
  dateFrom = dateFrom.toISOString().slice(0, 10);

  return dateFrom;
}

function getCardDate(dateStr) { // преобразование даты в формат карточки
  let cardDate = Date.parse(dateStr);
  cardDate = new Date(cardDate);
  cardDate = `${cardDate.toLocaleString('ru', { day: 'numeric', month: 'long' })}, ${cardDate.getFullYear()}`;
  return (cardDate);

}
function isReal(value) { // проверка действительности значения
  if (value && value !== 'null') { return true; }
  return false;
}

function setArray(articlesArr, keyword) { // очистка массива от неполных карточек
  const cardsArr = [];
  articlesArr.forEach((item) => {
    if (isReal(item.publishedAt)
         && isReal(item.urlToImage)
         && isReal(item.url)
         && isReal(item.description)
         && isReal(item.title)
         && isReal(item.source.name)
    ) {
      const newCard = {
        cardDate: getCardDate(item.publishedAt),
        cardDateIso: item.publishedAt,
        cardImageUrl: item.urlToImage,
        cardUrl: item.url,
        cardText: item.description,
        cardTitle: item.title,
        cardSign: item.source.name,
        cardKey: keyword,
      };
      cardsArr.push(newCard);
    }
  });
  return cardsArr;
}

function isAuth() { // проверка авторизации
  if (localStorage.getItem('token') === null) { return false; }
  return true;
}

export {
  getDateFrom, getCardDate, setArray, isReal, isAuth,
};
