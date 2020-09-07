function getDateFrom(days) {
  let dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - days);
  dateFrom = dateFrom.toISOString().slice(0, 10);

  return dateFrom;
};

function getCardDate(dateStr){
  let cardDate = Date.parse(dateStr);
  cardDate = new Date(cardDate);
  cardDate = cardDate.toLocaleString("ru", {day: 'numeric', month: 'long'}) + ', ' + cardDate.getFullYear();
  return (cardDate);
}
function isReal(value){
  if (value && value !== 'null')
   {return true}
 return false
};

function setArray(articlesArr){

  let cardsArr = [];
  articlesArr.forEach(function(item, articlesArr) {
    if ( isReal(item.publishedAt) &&
         isReal(item.urlToImage) &&
         isReal(item.url) &&
         isReal(item.description) &&
         isReal(item.title) &&
         isReal(item.source.name)
       )
      {
        let newCard ={cardDate: getCardDate(item.publishedAt),
                     cardImageUrl: item.urlToImage,
                     cardUrl: item.url,
                     cardText: item.description,
                     cardTitle: item.title,
                     cardSign: item.source.name
                     };
       cardsArr.push(newCard);}

  });
  return cardsArr;
};

export { getDateFrom, getCardDate, setArray, isReal }