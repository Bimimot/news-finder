import '../css/articles.css';

import MainApi from './api/MainApi';
import Header from './components/Header';
import MyArticles from './components/MyArticles';


import { getDateFrom, setArray, isAuth } from './utils/helpers';
import { menuContainer } from './constants/elements';

import { loggedMenuArticlesMarkup } from './constants/markups'; // импорт разметки

const mainApi = new MainApi();
const header = new Header(menuContainer);
const myArticles = new MyArticles();
let myCards = [];
const keys = [];

if (isAuth()) {
  mainApi.getMe() // ставим  хедер с именем либо редирект
    .then((data) => {
      if (data) {
        header.setMenu(loggedMenuArticlesMarkup, data.name);
        myArticles.setName(data.name);
      }
    })
    .catch((err) => {
      console.log(err);
    });
} else { location = 'index.html'; }

mainApi.getArticles()
  .then((res) => { myCards = res.data; })
  .then((arr) => {
    myArticles.setNumber(myCards.length);
    myArticles.setStringOfKeys((myCards));

  });

// import FormValidator from './FormValidator.js';
// import Popup from './Popup.js';

// // dom-элементы, для работы с методами классов

// const popupLoginContainer = document.querySelector('.popup_type_login');
// const popupSignupContainer = document.querySelector('.popup_type_signup');
// const popupMenuContainer = document.querySelector('.popup_type_menu');

// // тексты ошибок
// const errorsMessages = {
//   validateNameL: 'Имя должно быть от 2 до 30 символов',
//   validateEmail: 'Неправильный формат email',
//   validatePasswordL: 'Пароль должен быть не менее 8 символов',
// };

// const validator = new FormValidator(errorsMessages); // создаем валидатор, передаем тексты ошибок
// const loginPopup = new Popup(popupLoginContainer, '.button_type_login', validator); // создаем попап для авторизации
// const signupPopup = new Popup(popupSignupContainer, '.button_type_signup', validator); // создаем попап для регистрации
// const menuPopup = new Popup(popupMenuContainer, '.button_type_menu'); // создаем попап для выпадающего меню
