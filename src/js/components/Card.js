export default class Card{
  constructor(cardMarkup){
    this.cardMarkup = cardMarkup,
    this.gridContainer = document.querySelector('.cards__grid')
  }





_renderCard (cardData){
  const cardContainer = document.createElement('div'); // создали в DOM контейнер для карточки
  cardContainer.classList.add('cards__item');
  cardContainer.insertAdjacentHTML('beforeend', this.cardMarkup);  //поставили в контейнер разметку
  cardContainer.querySelector(".cards__photo").src = cardData.cardImageUrl;
  cardContainer.querySelector(".cards__item-date").textContent = cardData.cardDate;
  cardContainer.querySelector(".cards__item-title").textContent = cardData.cardTitle;
  cardContainer.querySelector(".cards__item-article").textContent = cardData.cardText;
  cardContainer.querySelector(".cards__sign").textContent = cardData.cardSign;
  return cardContainer;
}

addCard (cardData){



 this.gridContainer.appendChild(this._renderCard(cardData));
}

}

