/* eslint-disable no-unused-expressions */
export default class Card {
  constructor(cardMarkup, cardsMarkup, api, isAuth) {
    this.cardMarkup = cardMarkup,
      this.cardsMarkup = cardsMarkup,
      this.api = api,
      this.isAuth = isAuth;
  }

  setSection(markup) { // add section of cards
    document.querySelector('.intro-container').insertAdjacentHTML('afterEnd', markup);
    this.cardsSection = document.querySelector('.cards');
    this.gridContainer = this.cardsSection.querySelector('.cards__grid');
  }

  removeSection() { // del section of cards
    if (this.cardsSection) {
      this.cardsSection.remove();
    }
  }

  addCardsLine(hiddenCards, cardsArray, activeIcon) { // show 1 line
    this.activeIcon = activeIcon; // flag
    const startIndex = cardsArray.length - hiddenCards;
    let endIndex;

    if (hiddenCards < 4) {
      this._setButtonMore(false); // disable btn
      endIndex = startIndex + hiddenCards;
      hiddenCards = 0;
    } else {
      this._setButtonMore(true);
      endIndex = startIndex + 3;
      hiddenCards -= 3;
    }
    for (let i = startIndex; i < endIndex; i++) {
      this._addCard(cardsArray[i], this.cardMarkup, this.gridContainer);
    }
    // render 3 cards
    return hiddenCards;
  }

  updateShowedCards(cardsArr, hiddenCards, active) {
    // activate after authorization
    if (document.querySelector('.cards__grid')) {
      this.removeSection();
      this.setSection(this.cardsMarkup);

      const showedCards = cardsArr.length - hiddenCards;
      console.log('showed:', showedCards);
      const lines = showedCards / 3;
      for (let i = 0; i < lines; i++) {
        const hCards = cardsArr.length - i * 3;
        this.addCardsLine(hCards, cardsArr, active);
      }
    }
  }

  _setButtonMore(statement) { // show 'more' btn
    const moreBtn = this.cardsSection.querySelector('.cards__button');
    if (statement) {
      moreBtn.classList.remove('cards__button_visible_no');
    } else { moreBtn.classList.add('cards__button_visible_no'); }
  }

  _renderCard(cardData) { // create card
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('cards__item');
    cardContainer.insertAdjacentHTML('beforeend', this.cardMarkup);
    cardContainer.querySelector('.cards__photo').src = cardData.cardImageUrl;
    cardContainer.querySelector('.cards__item-date').textContent = cardData.cardDate;
    cardContainer.querySelector('.cards__item-title').textContent = cardData.cardTitle;
    cardContainer.querySelector('.cards__item-article').textContent = cardData.cardText;
    cardContainer.querySelector('.cards__text').href = cardData.cardUrl;
    cardContainer.querySelector('.cards__sign').textContent = cardData.cardSign;
    const icon = cardContainer.querySelector('.cards__bookmark');
    if (this.isAuth() || this.activeIcon) {
      icon.classList.add('cards__bookmark_clicked_off');
      icon.addEventListener('click', (event) => this._clickedCard(cardContainer, cardData, event.target));
    } else {
      icon.classList.add('cards__bookmark_active_no');
    }
    return cardContainer;
  }

  _addCard(cardData) { // add card to container
    const newCard = this._renderCard(cardData, this.cardMarkup);
    this.gridContainer.appendChild(newCard);
  }

  _clickedCard(cardContainer, cardData, bookmark) {
    cardContainer.querySelector('.cards__bookmark').classList.toggle('cards__bookmark_clicked_on');
    cardContainer.querySelector('.cards__bookmark').classList.toggle('cards__bookmark_clicked_off');
    if (bookmark.className.includes('cards__bookmark_clicked_on')) {
      this.api.createArticle(cardData)
        .then((res) => (cardData.id = res.data._id))
        .catch((err) => console.log(err));
    } else {
      this.api.removeArticle(cardData.id)
        .catch((err) => (console.log(err)));
    }
  }
}
