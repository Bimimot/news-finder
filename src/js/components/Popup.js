import { popupContainer } from '../constants/elements';

export default class Popup {
  constructor(popupContainer, validator) {
    this.popupContainer = popupContainer;
    this.validator = validator;

    this._closeByKey = this._closeByKey.bind(this);
    this._closeByClick = this._closeByClick.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.clearContent = this.clearContent.bind(this);

    // this._setSubmitListener();
  }

  // _setSubmitListener() {
  //   if (this.formElement && this.formElement != '') {
  //     this.formElement.addEventListener('submit', this.close); // слушатель нажатия кнопки отправки если это форма
  //   }
  // }

  open() {
    // if (this.formElement && this.formElement != '') {

    // }
    this.popupContainer.classList.add('popup_is-opened');
    this.validator.setEventListeners(this.popupContainer); // вызываем валидацию полей;
    this._setEventListeners(); // вызываем слушатели для закрытия
  }

  _setEventListeners() { // обработчик событий для закрытия попапа
    this.popupContainer.parentNode.parentNode.addEventListener('keydown', this._closeByKey);
    this.popupContainer.addEventListener('click', this._closeByClick);
  }

  removeEventListeners() { // удаление обработчиков
    this.popupContainer.parentNode.parentNode.removeEventListener('keydown', this._closeByKey);
    this.popupContainer.removeEventListener('click', this._closeByClick);
  }

  _closeByKey(event) {
    if (event.key === 'Escape') { this.close(); } // закрытие по Escape
  }

  _closeByClick(event) {
    // if (!this.formElement && !event.target.className.includes('links')) { // если не форма и не ссылка в меню - закрытие по любому клику
    //   this.close();
    // }
    if (
      // (this.formElement && this.formElement != '') // для формы -закрытие по клику мимо попапа либо клика по крестику
      // &&
      (event.target.className.includes('popup_is-opened') || event.target.className.includes('popup__close'))
    ) { this.close(); }
  }

  close() { // метод закрытия попапа
    // event.preventDefault();
    this.removeEventListeners();
    this.clearContent();

    this.popupContainer.classList.remove('popup_is-opened');

    if (this.formElement && this.formElement != '') {
      this._hideErrors();
      this._resetForm();
    }
  }

  _resetForm() { // очистка формы
    this.formElement.reset();
  }

  _hideErrors() { // стираниe ошибок после валидации
    const errors = this.popupContainer.querySelectorAll('.error-message');
    errors.forEach((value) => (value.textContent = ''));
  }

  setContent(popupMarkup) {
    this.popupContainer.insertAdjacentHTML('beforeend', popupMarkup);
  }

  clearContent() {
    while (this.popupContainer.firstChild) {
      this.popupContainer.removeChild(this.popupContainer.firstChild);
    }
  }

  setServerError(text) {
    this.popupContainer.querySelector('.server-error').textContent = text;
  }

  getMail() {
    return this.popupContainer.querySelector('.popup__input_type_email').value;
  }

  getName() {
    return this.popupContainer.querySelector('.popup__input_type_name').value;
  }

  getPass() {
    return this.popupContainer.querySelector('.popup__input_type_password').value;
  }
}
