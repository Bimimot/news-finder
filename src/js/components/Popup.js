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

  setSubmitLogin(api, header, loggedMenuMarkup, cardsArr, hiddenCards) {
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
                }) // show icons
                .catch((err) => console.log(err));
            });

            this.close();
          } else {
            res.json().then((result) => { this.setServerError(result.message); })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
    });
  }

  setSubmitSignup(api, successMarkup) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      api.signup(this.getMail(), this.getPass(), this.getName())
        .then((res) => {
          if (res.ok) {
            this.setContent(successMarkup);
          } else {
            res.json().then((result) => this.setServerError(result.message))
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
    });
  }

  open() {
    this.popupContainer.classList.add('popup_is-opened');
    if (this.form) {
      this._setSubmitButtonState(false);
      this._setInputsValidation();
    }
    this._setEventListeners();
  }

  close() {
    this._removeEventListeners();
    this.clearContent();
    this.popupContainer.classList.remove('popup_is-opened');
  }

  setContent(popupMarkup) {
    this.clearContent();
    this.popupContainer.insertAdjacentHTML('beforeend', popupMarkup);
    this.form = this.popupContainer.querySelector('.popup__form');
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

  setNameOnButton(name) { // popup-menu
    this.popupContainer.querySelector('.header__name')
      .textContent = `${name}\xa0`;
  }

_setEventListeners() {
      this.popupContainer.parentNode.parentNode.addEventListener('keydown', this._closeByKey);
    this.popupContainer.addEventListener('click', this._closeByClick);
  }

  _removeEventListeners() {
    this.popupContainer.parentNode.parentNode.removeEventListener('keydown', this._closeByKey);
    this.popupContainer.removeEventListener('click', this._closeByClick);
  }

  _closeByKey(event) {
    if (event.key === 'Escape') { this.close(); }
  }

  _closeByClick(event) {
    if (event.target.className.includes('popup_is-opened') || event.target.className.includes('popup__close')) { this.close(); }
  }

  _setSubmitButtonState(statement) {
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
    const inputs = this.popupContainer.querySelectorAll('.popup__input');

    inputs.forEach((value) => value.addEventListener('input', () =>
    {
      this.setServerError('');
      this._setSubmitButtonState(this.validator.validateAll(inputs));
    }),
    );
  }

  validateAll(inputs) {
    let allCheck = true;
    inputs.forEach((value) => {
      const curError = value.parentNode.querySelector('.error-message');
      if (!this.checkInputValidaty(value, curError))
      { allCheck = false; }
    });
    return allCheck;
  }
}
