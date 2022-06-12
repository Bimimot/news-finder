export default class SearchForm {
  constructor() {
    this.input = document.querySelector('.search__input');
    this.error = 'No keyword';
    this.placeholder = this.input.placeholder;
  }

  setInputValue(value) {
    this.input.value = value;
  }

  _getInputValue() {
    return this.input.value;
  }

  _setInputError(errMessage) {
    this.input.classList.add('search__input_state_error');
    this.input.placeholder = errMessage;
    document.addEventListener('click', (event) => this._removeInputText());
  }

  _removeInputText() {
    this.input.classList.remove('search__input_state_error');
    this.input.placeholder = this.placeholder;
    document.removeEventListener('click', (event) => this._removeInputText);
  }

  _validateInput() {
    if (!this.input.value) { return false; }
    return true;
  }
}
