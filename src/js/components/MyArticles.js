import {
  fewKeysMarkup, moreKeysMarkup, myCardMarkup, myCardsMarkup,
} from '../constants/markups';
import { getCardDate } from '../utils/helpers';

export default class MyArticles {
  constructor(api) {
    this.artSection = document.querySelector('.intro');
    this.api = api;
  }

  setSection(markup) {
    this.artSection.insertAdjacentHTML('afterEnd', markup);
    this.myCardsSection = document.querySelector('.cards');
    this.myGridContainer = this.myCardsSection.querySelector('.cards__grid');
  }

  removeSection() {
    if (this.myCardsSection) {
      this.myCardsSection.remove();
    }
  }

  setName(owner) {
    document.querySelector('.owner').textContent = owner;
  }

  setNumber(number) {
    const numberText = (!!!number || number === 0) ? 'No saved articles'
      : number === 1 ? `${number} saved  article` : `${number} saved  articles`;

    document.querySelector('.number').textContent = numberText;
  }

  setStringOfKeys(myCards) {
    const keys = myCards.map((item) => item.keyword); // sort by frequency
    keys.sort();
    const keysFr = [];
    let j = 0;
    keysFr[j] = { key: this._stringUp(keys[0]), total: 1 };

    let fr = 1;

    for (let i = 1; i < keys.length; i++) {
      if (keys[i] === keys[i - 1]) {
        fr += 1;
        keysFr[j] = { key: this._stringUp(keys[i]), total: fr };
      } else {
        fr = 1;
        j += 1;
        keysFr[j] = { key: this._stringUp(keys[i]), total: 1 };
      }
    }

    const sortByTotal = (a, b) => (a.total < b.total ? 1 : -1);
    keysFr.sort(sortByTotal);
    const sortedKeys = keysFr.map((item) => item.key);
    this._stringKeys(sortedKeys);
  }

  _stringUp(str) { // spell keys with caps
    let newStr = str.toLowerCase();
    newStr = newStr[0].toUpperCase() + newStr.slice(1);
    return newStr;
  }

  _stringKeys(arrKeys) {
    let strKeys;
    if (arrKeys.length < 4) {
      strKeys = arrKeys.reduce((sum, current) => `${sum}, ${current}`);
      this._setFewKeys(strKeys);
    } else {
      strKeys = `${arrKeys[0]}, ${arrKeys[1]}`;
      this._setMoreKeys(strKeys, (arrKeys.length - 2));
    }

    return strKeys;
  }

  _setFewKeys(strKeys) { // render few keys
    this.artSection.insertAdjacentHTML('beforeend', fewKeysMarkup);
    this.artSection.querySelector('.intro__keys_accent_span').textContent = strKeys;
  }

  _setMoreKeys(strKeys, addKeys) { // render 2 blocks of keys
    this.artSection.insertAdjacentHTML('beforeend', moreKeysMarkup);
    this.artSection.querySelector('.intro__keys_accent_span').textContent = strKeys;
    this.artSection.querySelector('.intro__keys_type_add').textContent = `${addKeys} others`;
  }

  addMycards(arrayCards) { // render user's cards
    arrayCards.forEach((card) => (this._addMyCard(card)));
  }

  _renderMyCard(cardData) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('cards__item');
    cardContainer.insertAdjacentHTML('beforeend', myCardMarkup);
    cardContainer.querySelector('.cards__photo').src = cardData.image;
    cardContainer.querySelector('.cards__item-date').textContent = getCardDate(cardData.date);
    cardContainer.querySelector('.cards__item-title').textContent = cardData.title;
    cardContainer.querySelector('.cards__item-article').textContent = cardData.text;
    cardContainer.querySelector('.cards__text').href = cardData.link;
    cardContainer.querySelector('.cards__sign').textContent = cardData.source;
    cardContainer.querySelector('.cards__label').textContent = this._stringUp(cardData.keyword);
    const icon = cardContainer.querySelector('.cards__bookmark');

    icon.addEventListener('click', (event) => this._removeMyCard(cardData, cardContainer));
    return cardContainer;
  }

  _addMyCard(cardData) {
    const newMyCard = this._renderMyCard(cardData, this.cardMarkup);
    this.myGridContainer.appendChild(newMyCard);
  }

  _removeMyCard(cardData, cardContainer) {
    this.api.removeArticle(cardData._id)
      .then((res) => {
        cardContainer.remove();
      })
      .catch((err) => (console.log(err)));
  }
}
