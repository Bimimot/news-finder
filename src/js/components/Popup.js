import { cardMarkup } from '../constants/markups';

export default class Popup {
  constructor(popupContainer, validator, card) {
    this.popupContainer = popupContainer;
    this.validator = validator;
    this.card = card;

    this._closeByKey = this._closeByKey.bind(this);
    this._closeByClick = this._closeByClick.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.clearContent = this.clearContent.bind(this);
  }

  setSubmitLogin(api, header, loggedMenuMarkup, cardsArr, hiddenCards) { // обработка сабмита на логин-попапе
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      api.login(this.getMail(), this.getPass())
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              localStorage.setItem('token', data.token);
              api.getMe()
                .then((me) => {
                  header.setMenu(loggedMenuMarkup, me.name);
                  this.card.updateShowedCards(cardsArr, hiddenCards, true);
                }) // включаем иконки на уже отрисованных карточках
                .catch((err) => console.log(err));
            });

            this.close();
          } else {
            res.json().then((result) => { this.setServerError(result.message); }) // показываем ошибку в попапе
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
    });
  }

  setSubmitSignup(api, successMarkup) { // обработка сабмита на попапе регистрации
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      api.signup(this.getMail(), this.getPass(), this.getName())
        .then((res) => {
          if (res.ok) {
            this.setContent(successMarkup); // выводим новый попап
          } else {
            res.json().then((result) => this.setServerError(result.message)) // показываем ошибку в попапе
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
    });
  }

  open() { // открытие попапа
    this.popupContainer.classList.add('popup_is-opened');
    if (this.form) {
      this._setSubmitButtonState(false); // отключаем кнопку submit
      this._setInputsValidation(); // включаем валидацию полей
    }
    this._setEventListeners(); // вызываем слушатели для закрытия
  }

  close() { // закрытие попапа
    this._removeEventListeners();
    this.clearContent();
    this.popupContainer.classList.remove('popup_is-opened');
  }

  setContent(popupMarkup) { // вставка попапа в контейнер
    this.clearContent();
    this.popupContainer.insertAdjacentHTML('beforeend', popupMarkup);
    this.form = this.popupContainer.querySelector('.popup__form');
  }

  clearContent() { // очистка контейнера
    while (this.popupContainer.firstChild) {
      this.popupContainer.removeChild(this.popupContainer.firstChild);
    }
  }

  setServerError(text) { // вывод серверной ошибки
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

  setNameOnButton(name) { // установка имени для попап-меню
    this.popupContainer.querySelector('.header__name')
      .textContent = `${name}\xa0`;
  }

_setEventListeners() { // обработчик событий для закрытия попапа
      this.popupContainer.parentNode.parentNode.addEventListener('keydown', this._closeByKey);
    this.popupContainer.addEventListener('click', this._closeByClick);
  }

  _removeEventListeners() { // удаление обработчиков
    this.popupContainer.parentNode.parentNode.removeEventListener('keydown', this._closeByKey);
    this.popupContainer.removeEventListener('click', this._closeByClick);
  }

  _closeByKey(event) { // закрытие по Escape
    if (event.key === 'Escape') { this.close(); }
  }

  _closeByClick(event) { // закрытие по клику мимо или по крестику
    if (event.target.className.includes('popup_is-opened') || event.target.className.includes('popup__close')) { this.close(); }
  }

  _setSubmitButtonState(statement) { // включение/выключение кнопки submit, принмает true либо false
    const curButton = this.popupContainer.querySelector('.popup__submit');
    if (!statement && curButton) {
      curButton.setAttribute('disabled', '');
      curButton.classList.add('popup__submit_state_disable');
    } else {
      curButton.removeAttribute('disabled', '');
      curButton.classList.remove('popup__submit_state_disable');
    }
  }

  _setInputsValidation() { // подключение обработчиков - валидация полей
    const inputs = this.popupContainer.querySelectorAll('.popup__input'); // получаем поля ввода

    inputs.forEach((value) => value.addEventListener('input', () => // на каждое поле вешааем обработчик изменений
    {
      this.setServerError('');
      this._setSubmitButtonState(this.validator.validateAll(inputs));
    }, // при изменении поля вызываем функцию вкл/выкл кнопки submit
    ), // на входе ей передаем результат проверки всех полей формы
    );
  }

  validateAll(inputs) { // валидация полей
    let allCheck = true; // флаг проверки всех полей, изначально - true
    inputs.forEach((value) => {
      const curError = value.parentNode.querySelector('.error-message');
      if (!this.checkInputValidaty(value, curError)) // если хоть одно из полей не пройдет проверку - флаг становится false
      { allCheck = false; }
    });
    return allCheck;
  }
}
