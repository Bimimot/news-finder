export default class Popup {
  constructor(popupContainer, validator) {
    this.popupContainer = popupContainer;
    this.validator = validator;

    this._closeByKey = this._closeByKey.bind(this);
    this._closeByClick = this._closeByClick.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.clearContent = this.clearContent.bind(this);
  }

  setSubmitLogin(api, header, loggedMenuMarkup) {
    this.popupContainer.querySelector('.popup__form')
      .addEventListener('submit', (event) => {
        event.preventDefault();
        api.login(this.getMail(), this.getPass())
          .then((res) => {
            if (res.ok) {
              res.json().then((data) => {
                localStorage.setItem('token', data.token);
                api.getMe()
                  .then((me) => header.setMenu(loggedMenuMarkup, me.name))
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

  setSubmitSignup(api, successMarkup) {
    this.popupContainer.querySelector('.popup__form')
      .addEventListener('submit', (event) => {
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

  open() {
    this.popupContainer.classList.add('popup_is-opened');
    this._setSubmitButtonState(false); // отключаем кнопку submit
    this._setInputsValidation(); // включаем валидацию полей
    this._setEventListeners(); // вызываем слушатели для закрытия
  }

  close() { // метод закрытия попапа
    this._removeEventListeners();
    this.clearContent();
    this.popupContainer.classList.remove('popup_is-opened');
  }

  setContent(popupMarkup) {
    this.clearContent();
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

  _setEventListeners() { // обработчик событий для закрытия попапа
    this.popupContainer.parentNode.parentNode.addEventListener('keydown', this._closeByKey);
    this.popupContainer.addEventListener('click', this._closeByClick);
  }

  _removeEventListeners() { // удаление обработчиков
    this.popupContainer.parentNode.parentNode.removeEventListener('keydown', this._closeByKey);
    this.popupContainer.removeEventListener('click', this._closeByClick);
  }

  _closeByKey(event) {
    if (event.key === 'Escape') { this.close(); } // закрытие по Escape
  }

  _closeByClick(event) {
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

  _setInputsValidation() {
    const inputs = this.popupContainer.querySelectorAll('.popup__input'); // получаем поля ввода

    inputs.forEach((value) => value.addEventListener('input', () => // на каждое поле вешааем обработчик изменений
    {
      this.setServerError('');
      this._setSubmitButtonState(this.validator.validateAll(inputs));
    }, // при изменении поля вызываем функцию вкл/выкл кнопки submit
    ), // на входе ей передаем результат проверки всех полей формы
    );
  }

  validateAll(inputs) {
    let allCheck = true; // флаг проверки всех полей, изначально - true
    inputs.forEach((value) => {
      const curError = value.parentNode.querySelector('.error-message');
      if (!this.checkInputValidaty(value, curError)) // если хоть одно из полей не пройдет проверку - флаг становится false
      { allCheck = false; }
    });
    return allCheck;
  }
}
