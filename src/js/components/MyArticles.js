import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

export default class MyArticles {
  constructor() {

  }

  setName(owner) {
    document.querySelector('.owner').textContent = owner;
  }

  setNumber(number) {
    document.querySelector('.number').textContent = number;
  }

  getStringOfKeys(myCards) {
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
      stringOfKeys = this._stringKeys(sortedKeys);
    }
    return stringOfKeys;
  }

  setKeys(value){
    document.querySelector('.intro__keys_accent_span').textContent = value;
  }

  _stringUp(str) {
    let newStr = str.toLowerCase();
    newStr = newStr[0].toUpperCase() + newStr.slice(1);
    return newStr;
  }

  _stringKeys(arrKeys) {
    let strKeys;
    if (arrKeys.length < 4) {
      strKeys[1] = arrKeys.reduce((sum, current) => `${sum}, ${current}`);
    } else {
      strKeys = `${arrKeys[0]}, ${arrKeys[1]} и ${arrKeys.length - 2} другим`;
    }
    return strKeys;
  }

}
