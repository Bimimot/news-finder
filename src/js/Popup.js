export default class Popup {
  constructor(container, button, validator) {
    this.container = container;
    this.formElement = container.querySelector('.popup__form');
    this.validator = validator;
    this.button = button;
    this._closeByKey = this._closeByKey.bind(this);
    this._closeByClick = this._closeByClick.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);

    this._popupListeners()
    this._setSubmitListener()
  }

  _setSubmitListener() {

    if (this.formElement && this.formElement != '') {
      this.formElement.addEventListener('submit', this.close);                               //слушатель нажатия кнопки отправки если это форма
    }
  }

  _popupListeners() {                                                                       //слушаем нажатия на вызов попапа
    this.button.addEventListener('click', (event) => {
      this.open()});
  }


  open() {                                                                                  //открытие попапа
    this.validator.setEventListeners(this.formElement);                                     //вызываем валидацию полей;
    this.container.classList.add('popup_is-opened');
    this._setEventListeners();                                                              //вызываем слушатели для закрытия

  }

  _setEventListeners() {                                                                    //обработчик событий для закрытия попапа
    this.container.parentNode.parentNode.addEventListener('keydown', this._closeByKey);
    this.container.addEventListener('click', this._closeByClick);
  }

  removeEventListeners() {                                                                  //удаление обработчиков
    this.container.parentNode.parentNode.removeEventListener('keydown', this._closeByKey);
    this.container.removeEventListener('click', this._closeByClick);
  }

  _closeByKey(event) {
    if (event.key === 'Escape') { this.close() }                                            //закрытие по Escape
  }

  _closeByClick(event) {                                                                    //закрытие по клику мимо попапа либо клика по крестику
    if (event.target.className.includes('popup_type') ||
      event.target.className.includes('popup__close')) { this.close() }
  }

  close() {                                                                                  //метод закрытия попапа
    event.preventDefault();
    this.removeEventListeners();
    this.container.classList.remove('popup_is-opened');


      this._hideErrors();
      this._resetForm()
  }

  _resetForm() {                                                                            //очистка формы
    this.formElement.reset();
  }


  _hideErrors() {                                                                           //стираниe ошибок после валидации
    const errors = this.container.querySelectorAll('.error-message');
    errors.forEach(value => (value.textContent = ''));
  }

}

