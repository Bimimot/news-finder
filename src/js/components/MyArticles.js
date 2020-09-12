import {fewKeysMarkup, moreKeysMarkup} from '../constants/markups';

export default class MyArticles {
  constructor() {
    this.artSection = document.querySelector('.intro');
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
    let stringOfKeys;

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
    // return stringOfKeys;
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

  _setFewKeys(strKeys){
    this.artSection.insertAdjacentHTML('beforeend', fewKeysMarkup);
    this.artSection.querySelector('.intro__keys_accent_span').textContent = strKeys;
  }

  _setMoreKeys(strKeys, addKeys){
    this.artSection.insertAdjacentHTML('beforeend', moreKeysMarkup);
    this.artSection.querySelector('.intro__keys_accent_span').textContent = strKeys;
    this.artSection.querySelector('.intro__keys_type_add').textContent = addKeys + ' другим';

  }
}
