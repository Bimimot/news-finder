import Popup from './Popup';

export default class FormValidator {
  constructor(errorsMessages) {
    this.errorsMessages = errorsMessages;
    this.checkInputValidaty = this.checkInputValidaty.bind(this);
    this.validateAll = this.validateAll.bind(this);
  }

  checkInputValidaty(curInput, curError) {
    if (!this.validateBlank(curInput, curError)) { return false; }

    if (!this.validateNameLength(curInput, curError)
      || !this.validatePasswordLength(curInput, curError)
      || !this.validateEmail(curInput, curError)
    ) { return false; }

    curError.textContent = ''; // if no error
    return true;
  }

  validateBlank(curInput, curError) { // empty input vallidation
    if (curInput.value.length === 0) // no err for 0 length
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
      curError.textContent = this.errorsMessages.validateNameL;
      return false;
    }
    return true;
  }

  validatePasswordLength(curInput, curError) {
    if (curInput.getAttribute('type') === 'text'
      && (curInput.getAttribute('name') === 'password')
      && (curInput.validity.tooShort)) {
      curError.textContent = this.errorsMessages.validatePasswordL;
      return false;
    }
    return true;
  }

  validateEmail(curInput, curError) {
    if (curInput.getAttribute('type') === 'text'
      && (curInput.getAttribute('name') === 'email')
      && (curInput.validity.patternMismatch)) {
      curError.textContent = this.errorsMessages.validateEmail;
      return false;
    }
    return true;
  }

  validateAll(inputs) {
    let allCheck = true; // all input flag
    inputs.forEach((value) => {
      const curError = value.parentNode.querySelector('.error-message');
      if (!this.checkInputValidaty(value, curError)) {
        allCheck = false;
      }
    });
    return allCheck;
  }
}
