import { setArray } from "../utils/helpers";

export default class SearchForm {
  constructor() {
    this.input = document.querySelector('.search__input');
    this.error = 'Нужно ввести ключевое слово';
    this.placeholder = this.input.placeholder;
  }

  setInputValue(value) { // получения поискового запроса
    this.input.value = value;
  }

  _getInputValue() { // установка значения в поле поиска
    return this.input.value;
  }

  _setInputError(errMessage) { // вывод ошибки в поле поиска
    this.input.classList.add('search__input_state_error');
    this.input.placeholder = errMessage;
    document.addEventListener('click', (event) => this._removeInputText());
  }

  _removeInputText() { // очистка поля
    this.input.classList.remove('search__input_state_error');
    this.input.placeholder = this.placeholder;
    document.removeEventListener('click', (event) => this._removeInputText);
  }

  _validateInput() { // валидация поля
    if (!this.input.value) { return false; }
    return true;
  }
}
