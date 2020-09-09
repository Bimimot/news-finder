export default class Card {
  constructor(cardMarkup, gridContainer, moreButton) {
    this.cardMarkup = cardMarkup,
    this.gridContainer = gridContainer,
    this.moreButton = moreButton;
  }

  addCardsLine(hiddenCards, cardsArray) {
    const startIndex = cardsArray.length - hiddenCards;
    let endIndex;

    if (hiddenCards < 4) {
      this.setButtonMore(false); // отключаем кнопку
      endIndex = startIndex + hiddenCards;
      hiddenCards = 0;
    } else { // скрытых карточек больше нет
      this.setButtonMore(true);
      endIndex = startIndex + 3;
      hiddenCards -= 3;
    }
    for (let i = startIndex; i < endIndex; i++) { this._addCard(cardsArray[i], this.cardMarkup, this.gridContainer); } // отрисовываем три карточки
    return hiddenCards;
  }

  setButtonMore(statement) {
    if (statement) { this.moreButton.classList.remove('cards__button_visible_no'); } else { this.moreButton.classList.add('cards__button_visible_no'); }
  }

  getCardId(bookmark) {
    return bookmark.parentNode.parentNode.querySelector('.cards__id').textcontent;
  }

  setCardId(value, bookmark) {
    bookmark.parentNode.parentNode.querySelector('.cards__id').textcontent = value;
  }

  _renderCard(cardData) {
    const cardContainer = document.createElement('div'); // создали в DOM контейнер для карточки
    cardContainer.classList.add('cards__item');
    cardContainer.insertAdjacentHTML('beforeend', this.cardMarkup); // поставили в контейнер разметку
    cardContainer.querySelector('.cards__photo').src = cardData.cardImageUrl;
    cardContainer.querySelector('.cards__item-date').textContent = cardData.cardDate;
    cardContainer.querySelector('.cards__item-title').textContent = cardData.cardTitle;
    cardContainer.querySelector('.cards__item-article').textContent = cardData.cardText;
    cardContainer.querySelector('.cards__sign').textContent = cardData.cardSign;
    cardContainer.querySelector('.cards__bookmark').addEventListener('click', () => this._clickedCard(cardContainer));
    return cardContainer;
  }

  _addCard(cardData) {
    const newCard = this._renderCard(cardData, this.cardMarkup);
    this.gridContainer.appendChild(newCard);
  }

  _clickedCard(cardContainer) {
    cardContainer.querySelector('.cards__bookmark').classList.toggle('cards__bookmark_clicked_on');
    cardContainer.querySelector('.cards__bookmark').classList.toggle('cards__bookmark_clicked_off');
  }

  clearCardsGrid() {
    while (this.gridContainer.firstChild) {
      this.gridContainer.removeChild(this.gridContainer.firstChild);
    }
  }
}
