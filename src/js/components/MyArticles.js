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
    document.querySelector('.number').textContent = number;
  }

  setStringOfKeys(myCards) {
    const keys = myCards.map((item) => item.keyword); // сохраняем массив ключей
    keys.sort(); // упорядочиваем по алфавиту
    const keysFr = []; // массив объектов ключи-частота в массиве

    if (keys.length > 2) {
      let fr = 1; // частота употребления
      let j = 0; // индекс нового массива объектов
      for (let i = 0; i < keys.length - 2; i++) {
        if (keys[i] === keys[i + 1]) { // считаем количество повторений
          fr += 1;
          keysFr[j] = { key: this._stringUp(keys[i]), total: fr }; // слово помним, частоту переписываем
        } else {
          fr = 1;
          j += 1;
          keysFr[j] = { key: this._stringUp(keys[i]), total: 1 }; // запомнили новое слово
        }
      }
      const sortByTotal = (a, b) => (a.total < b.total ? 1 : -1); // функция для сортировки ключей по количеству
      keysFr.sort(sortByTotal);
      const sortedKeys = keysFr.map((item) => item.key); // оставляем только ключи без количества
      this._stringKeys(sortedKeys);
    }
  }

  _stringUp(str) {
    let newStr = str.toLowerCase();
    newStr = newStr[0].toUpperCase() + newStr.slice(1);
    return newStr;
  }

  _stringKeys(arrKeys) {
    let strKeys;
    if (arrKeys.length < 4) {
      strKeys = arrKeys.reduce((sum, current) => `${sum}, ${current}`);
      console.log(strKeys);
      this._setFewKeys(strKeys);
    } else {
      strKeys = `${arrKeys[0]}, ${arrKeys[1]}`;
      this._setMoreKeys(strKeys, (arrKeys.length - 2));
    }
    return strKeys;
  }

  _setFewKeys(strKeys) {
    this.artSection.insertAdjacentHTML('beforeend', fewKeysMarkup);
    this.artSection.querySelector('.intro__keys_accent_span').textContent = strKeys;
  }

  _setMoreKeys(strKeys, addKeys) {
    this.artSection.insertAdjacentHTML('beforeend', moreKeysMarkup);
    this.artSection.querySelector('.intro__keys_accent_span').textContent = strKeys;
    this.artSection.querySelector('.intro__keys_type_add').textContent = `${addKeys} другим`;
  }

  addMycards(arrayCards) {
    arrayCards.forEach((card) => (this._addMyCard(card)));
  }

  _renderMyCard(cardData) {
    const cardContainer = document.createElement('div'); // создали DOM контейнер для карточки
    cardContainer.classList.add('cards__item');
    cardContainer.insertAdjacentHTML('beforeend', myCardMarkup); // поставили в контейнер разметку
    cardContainer.querySelector('.cards__photo').src = cardData.image;
    cardContainer.querySelector('.cards__item-date').textContent = getCardDate(cardData.date);
    cardContainer.querySelector('.cards__item-title').textContent = cardData.title;
    cardContainer.querySelector('.cards__item-article').textContent = cardData.text;
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
