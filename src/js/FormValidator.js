export default class FormValidator {
  constructor(errorsMessages) {
    this.errorsMessages = errorsMessages;
    this.checkInputValidaty = this.checkInputValidaty.bind(this);
    this.validateAll = this.validateAll.bind(this);
    this.setSubmitButtonState = this.setSubmitButtonState.bind(this)
  }

  checkInputValidaty(curInput, curError) {                                          //валидация одного поля, принимает на входе текущее значени в поле и элемент ошибки
    if (!this.validateBlank(curInput, curError)) { return false }
    else {
      if (!this.validateText(curInput, curError)) { return false };
      if (!this.validateUrl(curInput, curError)) { return false };
    }

    curError.textContent = '';                                                       //если ошибок не было - текста ошибки нет, значение проверки true
    return true

  }
  validateBlank(curInput, curError) {                                                //валидация пустого поля
    if (curInput.value.length === 0)                                                 //текст ошибки для 0 длины значения поля
    {
      curError.textContent = this.errorsMessages.validateBlank;
      return false
    };
    return true
  }

  validateText(curInput, curError) {                                                 //валидация текстового поля

    if (curInput.getAttribute('type') === 'text' && (curInput.validity.tooShort || curInput.validity.toolong)) {
      curError.textContent = this.errorsMessages.validateText;                       //текст ошибки для текстового поля по условию
      return false
    };
    return true
  }

  validateUrl(curInput, curError) {                                                   //валидация поля для ссылки
    if (curInput.getAttribute('type') === 'url' && !curInput.checkValidity())         //текст ошибки для url поля
    {
      curError.textContent = this.errorsMessages.validateUrl;
      return false
    };
    return true
  }

  setSubmitButtonState(statement) {                                                    //включение/выключение кнопки submit, принмает true либо false
    const curButton = this.formElement.querySelector('.popup__submit')

    if (!statement) {
      curButton.setAttribute("disabled", "");
      curButton.classList.add('popup__submit_state_disable');
    }
    else {
      curButton.removeAttribute("disabled", "");
      curButton.classList.remove('popup__submit_state_disable');
    }
  }

  setEventListeners(formElement) {
    this.formElement = formElement;                                                     //если параметры не заданы при выззове класса, то берем параметр метода
    const inputs = this.formElement.querySelectorAll('.popup__input');                  //получаем поля ввода
    this.setSubmitButtonState(this.validateAll(inputs));                                //при открытии устнаваливаем значение кнопки

    inputs.forEach((value) =>
      value.addEventListener('input', () =>                                        //на каждое поле вешааем обработчик изменений
        this.setSubmitButtonState(this.validateAll(inputs))                             //при изменении поля вызываем функцию вкл/выкл кнопки submit
      )                                                                                //на входе ей передаем результат проверки всех полей формы
    );
  }

  validateAll(inputs) {
    let allCheck = true;                                                               //флаг проверки всех полей, изначально - true
    inputs.forEach((value) => {
      const curError = value.parentNode.querySelector('.error-message');
      if (!this.checkInputValidaty(value, curError))                                   //если хоть одно из полей не пройдет проверку - флаг становится false
      { allCheck = false; }
    })
    return allCheck;
  }

}
