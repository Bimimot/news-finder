import '../css/style.css';

// import { get } from 'http';
import FormValidator from './components/FormValidator'; // импортируем класс с валидаторами форм
import Popup from './components/Popup'; // импортируем класс с методами для попапов
import MainApi from './api/MainApi';
import Header from './components/Header';

import {
  popupContainer, menuContainer, loginButtonClass, signupButtonClass,
} from './constants/elements'; // импорт контейнера попапа и классов кнопок
import {
  loginMarkup, signupMarkup, successMarkup, loggedMenuMarkup, unloggedMenuMarkup,
} from './constants/markups'; // импорт разметки
import { errorsMessages } from './constants/errors'; // импортируем стили для вебпака

const validator = new FormValidator(errorsMessages); // создаем валидатор, передаем тексты ошибок
const mainApi = new MainApi();
const popup = new Popup(popupContainer, validator); // создаем методы обработки попапа
const header = new Header(menuContainer);

mainApi.getMe()
  .then((data) => { if (data) { header.setMenu(loggedMenuMarkup, data.name); } })
  .catch((err) => console.log(err)); // ставим хедер если есть токен и может получить имя

document.addEventListener('click', (event) => {
  if (event.target.className.includes(loginButtonClass)) {
    popup.setContent(loginMarkup);
    popup.open();
    popup.setSubmitLogin(mainApi, header, loggedMenuMarkup);
  }

  if (event.target.className.includes(signupButtonClass)) {
    popup.setContent(signupMarkup);
    popup.open();
    popup.setSubmitSignup(mainApi, successMarkup);
  }
});

// активация иконок-закладок
document.querySelectorAll('.cards__bookmark').forEach((item) => {
  item.addEventListener('click', (event) => {
    event.target.classList.toggle('cards__bookmark_clicked_on');
    event.target.classList.toggle('cards__bookmark_clicked_off');
  });
});

// const loginPopup = new Popup(popupLoginContainer, '.button_type_login', validator); // создаем попап для авторизации
// const signupPopup = new Popup(popupSignupContainer, '.button_type_signup', validator); // создаем попап для регистрации
// const menuPopup = new Popup(popupMenuContainer, '.button_type_menu'); // создаем попап для выпадающего меню
