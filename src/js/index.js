import '../css/style.css';

import FormValidator from './components/FormValidator'; // импортируем класс с валидаторами форм
import Popup from './components/Popup'; // импортируем класс с методами для попапов
import MainApi from './api/MainApi';
import OutApi from './api/OutApi';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Card from './components/Card.js';

import { getDateFrom, setArray } from './utils/helpers';

import {
  popupContainer, menuContainer, gridContainer, moreButton,
  loginButtonClass, signupButtonClass, moreButtonClass, searchForm,
} from './constants/elements'; // импорт контейнера попапа и классов кнопок

import {
  loginMarkup, signupMarkup, successMarkup, loggedMenuMarkup, unloggedMenuMarkup, cardMarkup,
} from './constants/markups'; // импорт разметки
import { errorsMessages } from './constants/errors'; // импортируем стили для вебпака

const validator = new FormValidator(errorsMessages); // создаем валидатор, передаем тексты ошибок
const mainApi = new MainApi();
const outApi = new OutApi();
const popup = new Popup(popupContainer, validator); // создаем методы обработки попапа
const header = new Header(menuContainer);
const search = new SearchForm();
const card = new Card(cardMarkup, gridContainer, moreButton);

let cardsArr = []; // массив найденных карточек
let hiddenCards = 0; // количество скрытых карточек

mainApi.getMe()
  .then((data) => { if (data) { header.setMenu(loggedMenuMarkup, data.name); } })
  .catch((err) => console.log(err)); // ставим хедер если есть токен и может получить имя

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchText = search._getInputValue();
  if (search._validateInput(searchText)) {
    card.clearCardsGrid();
    outApi.getArticles(searchText, getDateFrom(7))
      .then((res) => {
        cardsArr = setArray(res);
        hiddenCards = cardsArr.length; // все карточки сразу после поиска скрыты
        hiddenCards = card.addCardsLine(hiddenCards, cardsArr); // отрисовываем ряд карточек и пересчитываем скрытые карточки
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
  };

  if (event.target.className.includes(signupButtonClass)) {
    popup.setContent(signupMarkup);
    popup.open();
    popup.setSubmitSignup(mainApi, successMarkup);
  };

  if (event.target.className.includes(moreButtonClass)) {
    hiddenCards = card.addCardsLine(hiddenCards, cardsArr); // отрисовываем ряд карточек и пересчитываем скрытые карточки
  };

  if (event.target.className.includes('cards__bookmark_clicked_on'))
  {  let cardId = Math.floor(Math.random() * 100); // вызов API
   card.setCardId(cardId, event.target); //сохраняем номер в атрибут карточки
   console.log('добавили карточку №', cardId);
    };

   if (event.target.className.includes('cards__bookmark_clicked_off'))
  {console.log('удалили карточку №', card.getCardId(event.target))
   card.setCardId('', event.target);
  }; // удаляем карточку через API по номеру
});

// активация иконок-закладок
// document.querySelectorAll('.cards__bookmark').forEach((item) => {
//   item.addEventListener('click', (event) => {
//     event.target.classList.toggle('cards__bookmark_clicked_on');
//     event.target.classList.toggle('cards__bookmark_clicked_off');
//   });
// });
