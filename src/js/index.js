import '../css/style.css';

import FormValidator from './components/FormValidator'; // импортируем класс с валидаторами форм
import Popup from './components/Popup'; // импортируем класс с методами для попапов
import MainApi from './api/MainApi';
import OutApi from './api/OutApi';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Card from './components/Card';

import { getDateFrom, setArray, isAuth } from './utils/helpers';

import {
  popupContainer, menuContainer,
  loginButtonClass, signupButtonClass, moreButtonClass, searchForm,
} from './constants/elements'; // импорт контейнера попапа и классов кнопок

import {
  loginMarkup, signupMarkup, successMarkup, loggedMenuMarkup, unloggedMenuMarkup,
  cardMarkup, cardsMarkup, noCardsMarkup
} from './constants/markups'; // импорт разметки
import { errorsMessages } from './constants/errors'; // импортируем стили для вебпака

const validator = new FormValidator(errorsMessages); // создаем валидатор, передаем тексты ошибок
const mainApi = new MainApi();
const outApi = new OutApi();
const popup = new Popup(popupContainer, validator); // создаем методы обработки попапа
const header = new Header(menuContainer);
const search = new SearchForm();
const card = new Card(cardMarkup, mainApi, isAuth);

let cardsArr = []; // массив найденных карточек
let hiddenCards = 0; // количество скрытых карточек

if (isAuth()) { // если у нас есть токен
  mainApi.getMe()
    .then((data) => { if (data) { header.setMenu(loggedMenuMarkup, data.name); } })
    .catch((err) => console.log(err)); // ставим хедер с именем
}

search.setInputValue('');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchText = search._getInputValue();
  if (search._validateInput(searchText)) {
    card.removeSection();
    outApi.getArticles(searchText, getDateFrom(7))
      .then((res) => {
        cardsArr = setArray(res, searchText);
        if (cardsArr.length !== 0) {
          card.setSection(cardsMarkup);
          hiddenCards = cardsArr.length; // все карточки сразу после поиска скрыты
          hiddenCards = card.addCardsLine(hiddenCards, cardsArr); // отрисовываем ряд карточек и пересчитываем скрытые карточки
        } else {
          card.setSection(noCardsMarkup);
        }
      });
  } else {
    this._setInputError(this.error);
  }
});

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

  if (event.target.className.includes(moreButtonClass)) {
    hiddenCards = card.addCardsLine(hiddenCards, cardsArr); // отрисовываем ряд карточек и пересчитываем скрытые карточки
  }
});
