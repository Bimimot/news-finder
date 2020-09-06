export default class SearchForm {
  constructor() {
    this.formContainer = document.querySelector('.search__form'),
    this.input = this.formContainer.querySelector('.search__input');
    this.error = 'Нужно ввести ключевое слово';
    this.placeholder = this.input.placeholder;
  }

  submitSearch() {
    this.formContainer.addEventListener('submit', (event) => {
      event.preventDefault();
      if (this._validateInput(this._getInputValue())) {
        console.log('нажали поиск');
      } else {
        this._setInputError(this.error);
      }
    });
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
