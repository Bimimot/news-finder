import '../css/style.css';

import FormValidator from './FormValidator.js';
import Popup from './Popup.js';

// dom-элементы, для работы с методами классов

// const popupLoginContainer = document.querySelector('.popup_type_login');
// const popupSignupContainer = document.querySelector('.popup_type_signup');
// const popupMenuContainer = document.querySelector('.popup_type_menu');

const loginMarkup = `
<div class="popup__content popup__content_type_form">
<img src="../images/close.png" alt="" class="popup__close">
<h3 class="popup__title">Вход</h3>
<form class="popup__form popup__form_type_login" name="login" novalidate>
  <div class="popup__input-container">
    <p class="popup__input-title">Email</p>
    <input type="text" name="email"
      pattern="^[a-zA-Z0-9]((-|_)?[a-zA-Z0-9]+)*@([a-zA-Z0-9]((-)?[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}$"
      class="popup__input popup__input_type_email" placeholder="Введите почту" required>
    <span class="error-message"> </span>
  </div>
  <div class="popup__input-container">
    <p class="popup__input-title">Пароль</p>
    <input type="text" name="password" minlength="8" class="popup__input popup__input_type_password"
      placeholder="Введите пароль" required>
    <span class="error-message"> </span>
  </div>
  <button type="submit" class="popup__submit">Войти</button>
  <span class="popup__text">или<button class="popup__button button_type_signup">Зарегистрироваться</button></span>
</form>
</div>`;

const popupElement = document.querySelector('.popup');

const loginButton = 'button_type_login';

// тексты ошибок
const errorsMessages = {
  validateNameL: 'Имя должно быть от 2 до 30 символов',
  validateEmail: 'Неправильный формат email',
  validatePasswordL: 'Пароль должен быть не менее 8 символов',
};

const validator = new FormValidator(errorsMessages); // создаем валидатор, передаем тексты ошибок
// const loginPopup = new Popup(popupLoginContainer, '.button_type_login', validator); // создаем попап для авторизации
// const signupPopup = new Popup(popupSignupContainer, '.button_type_signup', validator); // создаем попап для регистрации
// const menuPopup = new Popup(popupMenuContainer, '.button_type_menu'); // создаем попап для выпадающего меню



// хардкод для активации иконок-закладок
document.querySelectorAll('.cards__bookmark').forEach((item) => {
  item.addEventListener('click', (event) => {
    event.target.classList.toggle('cards__bookmark_clicked_on');
    event.target.classList.toggle('cards__bookmark_clicked_off');
  });
});

const popupHandlers = new Popup(popupElement,validator);

document.addEventListener('click', (event) => {

  if (event.target.className.includes(loginButton)) {
    popupHandlers.setContent(popupElement, loginMarkup);
    popupHandlers.open();

  }
}); // слушаем нажатия на вызов попапа
