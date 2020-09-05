import Popup from './Popup';

export default class FormValidator {
  constructor(errorsMessages) {
    this.errorsMessages = errorsMessages;
    this.checkInputValidaty = this.checkInputValidaty.bind(this);
    this.validateAll = this.validateAll.bind(this);
    this.setSubmitButtonState = this.setSubmitButtonState.bind(this);
  }

  checkInputValidaty(curInput, curError) { // валидация одного поля, принимает на входе текущее значени в поле и элемент ошибки
    if (!this.validateBlank(curInput, curError)) { return false; }

    if (!this.validateNameLength(curInput, curError)
        || !this.validatePasswordLength(curInput, curError)
        || !this.validateEmail(curInput, curError)
    ) { return false; }

    curError.textContent = ''; // если ошибок не было - текста ошибки нет, значение проверки true
    return true;
  }

  validateBlank(curInput, curError) { // валидация пустого поля
    if (curInput.value.length === 0) // для 0 длины значения поля ошибку не выводим
    {
      curError.textContent = '';
      return false;
    }
    return true;
  }

  validateNameLength(curInput, curError) {
    if (curInput.getAttribute('type') === 'text'
     && (curInput.getAttribute('name') === 'name')
     && (curInput.validity.tooShort || curInput.validity.toolong)) {
      curError.textContent = this.errorsMessages.validateNameL; // текст ошибки поля c именем по условию длины
      return false;
    }
    return true;
  }

  validatePasswordLength(curInput, curError) {
    if (curInput.getAttribute('type') === 'text'
     && (curInput.getAttribute('name') === 'password')
     && (curInput.validity.tooShort)) {
      curError.textContent = this.errorsMessages.validatePasswordL; // текст ошибки поля c паролем по условию длины
      return false;
    }
    return true;
  }

  validateEmail(curInput, curError) {
    if (curInput.getAttribute('type') === 'text'
     && (curInput.getAttribute('name') === 'email')
     && (curInput.validity.patternMismatch)) { // несовпадение паттерна
      curError.textContent = this.errorsMessages.validateEmail; // текст ошибки поля c email по паттерну
      return false;
    }
    return true;
  }

  setSubmitButtonState(statement) { // включение/выключение кнопки submit, принмает true либо false
    const curButton = this.formElement.querySelector('.popup__submit');

    if (!statement) {
      curButton.setAttribute('disabled', '');
      curButton.classList.add('popup__submit_state_disable');
    } else {
      curButton.removeAttribute('disabled', '');
      curButton.classList.remove('popup__submit_state_disable');
    }
  }

  setEventListeners(formElement) {
    this.formElement = formElement; // если параметры не заданы при выззове класса, то берем параметр метода
    const inputs = this.formElement.querySelectorAll('.popup__input'); // получаем поля ввода
    this.setSubmitButtonState(this.validateAll(inputs)); // при открытии устнаваливаем значение кнопки

    inputs.forEach((value) => value.addEventListener('input', () => // на каждое поле вешааем обработчик изменений
      this.setSubmitButtonState(this.validateAll(inputs)), // при изменении поля вызываем функцию вкл/выкл кнопки submit
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
