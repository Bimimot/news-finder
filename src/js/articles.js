import '../css/articles.css';

import MainApi from './api/MainApi';
import Header from './components/Header';
import MyArticles from './components/MyArticles';


import { isAuth } from './utils/helpers';
import { menuContainer, exitButtonClass } from './constants/elements';

import { loggedMenuArticlesMarkup, myCardsMarkup } from './constants/markups'; // импорт разметки

const mainApi = new MainApi();
const header = new Header(menuContainer);
const myArticles = new MyArticles(mainApi);
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
      myArticles.removeSection();
      if (myCards.length !== 0) {
        myArticles.setSection(myCardsMarkup);
        myArticles.addMycards(myCards);
    }
  });



document.addEventListener(('click'), (event) =>{
  if(event.target.className.includes(exitButtonClass))
  {
    localStorage.removeItem('token'); // удаление токена
    location = 'index.html';
  }
})


