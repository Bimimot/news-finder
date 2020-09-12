import {
  fewKeysMarkup, moreKeysMarkup, myCardMarkup, myCardsMarkup,
} from '../constants/markups';
import { getCardDate } from '../utils/helpers';

export default class MyArticles {
  constructor(api) {
    this.artSection = document.querySelector('.intro');
    this.api = api;
  }

  setSection(markup) { // установка секции с карточками
    this.artSection.insertAdjacentHTML('afterEnd', markup);
    this.myCardsSection = document.querySelector('.cards');
    this.myGridContainer = this.myCardsSection.querySelector('.cards__grid');
  }

  removeSection() { // удаление секции с карточками
    if (this.myCardsSection) {
      this.myCardsSection.remove();
    }
  }

  setName(owner) { // установка имени в титул
    document.querySelector('.owner').textContent = owner;
  }

  setNumber(number) { // установка числа карточек в титул
    let  numberText = number + ' сохранённых статей'
    if (number === 0) { numberText = ' нет сохранённых статей'; }
    if (number === 1){
      numberText = number + ' сохранённая статья';
    }
    if (number > 1 && number < 4) {
      numberText = number + ' сохранённых статьи'
    }

    document.querySelector('.number').textContent = numberText;


  }

  setStringOfKeys(myCards) { // получаем строку из слов-ключей
    const keys = myCards.map((item) => item.keyword); // сохраняем массив ключей
    keys.sort(); // упорядочиваем по алфавиту
    const keysFr = []; // массив объектов ключи-частота в массиве

    if (keys.length > 1) {
      let fr = 1; // частота употребления
      let j = 0; // индекс нового массива объектов
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === keys[i + 1]) { // считаем количество повторений
          fr += 1;
          keysFr[j] = { key: this._stringUp(keys[i]), total: fr }; // слово помним, частоту переписываем
        } else {
          fr = 1;
          j += 1;
          keysFr[j] = { key: this._stringUp(keys[i]), total: 1 }; // запомнили новое слово
        }
      }
    }
    else {
      keysFr[0] = { key: this._stringUp(keys[0]), total: 1 };
    }
    const sortByTotal = (a, b) => (a.total < b.total ? 1 : -1); // функция для сортировки ключей по количеству
    keysFr.sort(sortByTotal);
    const sortedKeys = keysFr.map((item) => item.key); // оставляем только ключи без количества
    this._stringKeys(sortedKeys);
  }

  _stringUp(str) { // написание слов с ззаглавной
    let newStr = str.toLowerCase();
    newStr = newStr[0].toUpperCase() + newStr.slice(1);
    return newStr;
  }

  _stringKeys(arrKeys) { // составление ключей-слов вместе
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

  _setFewKeys(strKeys) { // вывод нескольких слов ключей
    this.artSection.insertAdjacentHTML('beforeend', fewKeysMarkup);
    this.artSection.querySelector('.intro__keys_accent_span').textContent = strKeys;
  }

  _setMoreKeys(strKeys, addKeys) { // вывод слов ключей в 2 блока
    this.artSection.insertAdjacentHTML('beforeend', moreKeysMarkup);
    this.artSection.querySelector('.intro__keys_accent_span').textContent = strKeys;
    this.artSection.querySelector('.intro__keys_type_add').textContent = `${addKeys} другим`;
  }

  addMycards(arrayCards) { // вывод своих карточек
    arrayCards.forEach((card) => (this._addMyCard(card)));
  }

  _renderMyCard(cardData) { // создание своих карточек
    const cardContainer = document.createElement('div'); // создали DOM контейнер для карточки
    cardContainer.classList.add('cards__item');
    cardContainer.insertAdjacentHTML('beforeend', myCardMarkup); // поставили в контейнер разметку
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

  _addMyCard(cardData) { // вывод 1 карточки
    const newMyCard = this._renderMyCard(cardData, this.cardMarkup);
    this.myGridContainer.appendChild(newMyCard);
  }

  _removeMyCard(cardData, cardContainer) { // удаление 1 карточки
    this.api.removeArticle(cardData._id)
      .then((res) => {
        cardContainer.remove();
      })
      .catch((err) => (console.log(err)));
  }
}
