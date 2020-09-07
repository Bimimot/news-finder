import '../css/style.css';

import FormValidator from './components/FormValidator'; // импортируем класс с валидаторами форм
import Popup from './components/Popup'; // импортируем класс с методами для попапов
import MainApi from './api/MainApi';
import OutApi from './api/OutApi';
import Header from './components/Header';
import SearchForm from './components/SearchForm';

import { getDateFrom, setArray } from './utils/helpers';

import {
  popupContainer, menuContainer, loginButtonClass, signupButtonClass,
} from './constants/elements'; // импорт контейнера попапа и классов кнопок
import {
  loginMarkup, signupMarkup, successMarkup, loggedMenuMarkup, unloggedMenuMarkup,
} from './constants/markups'; // импорт разметки
import { errorsMessages } from './constants/errors'; // импортируем стили для вебпака

const validator = new FormValidator(errorsMessages); // создаем валидатор, передаем тексты ошибок
const mainApi = new MainApi();
const outApi = new OutApi();
const popup = new Popup(popupContainer, validator); // создаем методы обработки попапа
const header = new Header(menuContainer);
const searchForm = new SearchForm();

let cardsArr = [];

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

document.querySelector('.search__form').addEventListener('submit', (event) => {
  event.preventDefault();
  const searchText = searchForm._getInputValue();
  if (searchForm._validateInput(searchText)) {
    outApi.getArticles(searchText, getDateFrom(7))
      .then((res) => { cardsArr = setArray(res); });
  } else {
    this._setInputError(this.error);
  }
});



// активация иконок-закладок
document.querySelectorAll('.cards__bookmark').forEach((item) => {
  item.addEventListener('click', (event) => {
    event.target.classList.toggle('cards__bookmark_clicked_on');
    event.target.classList.toggle('cards__bookmark_clicked_off');
  });
});
