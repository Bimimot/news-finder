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
} from './constants/markups';
import { errorsMessages } from './constants/errors';

const validator = new FormValidator(errorsMessages);
const mainApi = new MainApi();
const outApi = new OutApi();
const card = new Card(cardMarkup, cardsMarkup, mainApi, isAuth);
const popup = new Popup(popupContainer, validator, card);
const header = new Header(menuContainer);
const search = new SearchForm();

let cardsArr = [];
let hiddenCards = 0;

if (isAuth()) { // if we have token
  mainApi.getMe()
    .then((data) => { if (data) { header.setMenu(loggedMenuMarkup, data.name); } })
    .catch((err) => console.log('Err with getUser', err));
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
          hiddenCards = cardsArr.length; // hide all cards
          hiddenCards = card.addCardsLine(hiddenCards, cardsArr);
          // render 1 line and count hidden cards
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
    popup.setSubmitLogin(mainApi, header, loggedMenuMarkup, cardsArr, hiddenCards);
  }

  if (event.target.className.includes(signupButtonClass)) {
    popup.setContent(signupMarkup);
    popup.open();
    popup.setSubmitSignup(mainApi, successMarkup);
  }

  if (event.target.className.includes(moreButtonClass)) {
    hiddenCards = card.addCardsLine(hiddenCards, cardsArr);
    // render 1 line and count hidden cards
  }

  if (event.target.className.includes(exitButtonClass)) {
    localStorage.removeItem('token'); // del token
    header.setMenu(unloggedMenuMarkup); // change header
    if (document.querySelector('.cards__grid')) {
      card.updateShowedCards(cardsArr, hiddenCards, false); // inactive finded cards
    }
    popup.close();
  }

  if (event.target.className.includes(sandwichButtonClass)) {
    if (isAuth()) { // if we have token
      mainApi.getMe()
        .then((data) => {
          if (data) {
            popup.setContent(popupLogMenuMarkup);
            popup.setNameOnButton(data.name);
          }
        })
        .catch((err) => console.log(err)); // make header
    } else {
      popup.setContent(popupUnlogMenuMarkup);
    }
    popup.open();
  }
});
