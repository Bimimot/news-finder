import '../css/style.css';

import FormValidator from './components/FormValidator';
import Popup from './components/Popup';
import MainApi from './api/MainApi';
import OutApi from './api/OutApi';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Card from './components/Card';

import { getDateFrom, setArray, isAuth } from './utils/helpers';

import {
  popupContainer, menuContainer,
  loginButtonClass, signupButtonClass, sandwichButtonClass,
  moreButtonClass, searchForm, exitButtonClass,
} from './constants/elements';

import {
  loginMarkup, signupMarkup, popupLogMenuMarkup, popupUnlogMenuMarkup,
  successMarkup, loggedMenuMarkup, unloggedMenuMarkup,
  cardMarkup, cardsMarkup, noCardsMarkup, loaderMarkup,
} from './constants/markups'; // импорт разметки
import { errorsMessages } from './constants/errors'; // импортируем стили для вебпака

const validator = new FormValidator(errorsMessages); // создаем валидатор, передаем тексты ошибок
const mainApi = new MainApi();
const outApi = new OutApi();
const card = new Card(cardMarkup, cardsMarkup, mainApi, isAuth);
const popup = new Popup(popupContainer, validator, card);
const header = new Header(menuContainer);
const search = new SearchForm();

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
    card.setSection(loaderMarkup);
    outApi.getArticles(searchText, getDateFrom(7))
      .then((res) => {
        cardsArr = setArray(res, searchText);
        card.removeSection();
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
  console.log(event.target.className);
  if (event.target.className.includes(loginButtonClass)) {
    popup.setContent(loginMarkup);
    popup.open();
    popup.setSubmitLogin(mainApi, header, loggedMenuMarkup, cardsArr, hiddenCards);
  }

  if (event.target.className.includes(signupButtonClass)) {
    popup.setContent(signupMarkup);
    popup.open();
    popup.setSubmitSignup(mainApi, successMarkup);
  }

  if (event.target.className.includes(moreButtonClass)) {
    hiddenCards = card.addCardsLine(hiddenCards, cardsArr); // отрисовываем ряд карточек и пересчитываем скрытые карточки
  }

  if (event.target.className.includes(exitButtonClass)) {
    localStorage.removeItem('token'); // удаление токена
    header.setMenu(unloggedMenuMarkup); // замена хедера
    if (document.querySelector('.cards__grid')) {
      card.updateShowedCards(cardsArr, hiddenCards, false); // уже найденные карточки делаем неактивными
    }
    popup.close();
  }

  if (event.target.className.includes(sandwichButtonClass)) {
    if (isAuth()) { // если у нас есть токен
      mainApi.getMe()
        .then((data) => {
          if (data) { popup.setContent(popupLogMenuMarkup);
            popup.setNameOnButton(data.name);}
        } )
        .catch((err) => console.log(err)); // ставим хедер с именем
    }
    else {
    popup.setContent(popupUnlogMenuMarkup)}
    popup.open();
  }
});
