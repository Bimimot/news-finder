const loaderMarkup = `<section class="cards">
<i class="circle-preloader"></i>
<p class="cards__comment">We are finding the news</p>
</section>`

const fewKeysMarkup = `<p class="intro__keys">With keywords:
<span class="intro__keys intro__keys_accent_span"></span>
</p>`

const moreKeysMarkup = `<p class="intro__keys">With keywords:
<span class="intro__keys intro__keys_accent_span"></span>
\xa0and\xa0
<span class="intro__keys intro__keys_accent_span intro__keys_type_add"></span>
</p>`

const noCardsMarkup = `<section class="cards">
<div class="sad-smile"></div>
<p class="cards__message">Nothing here</p>
<p class="cards__comment">Unfortunately, we've finded nothing</p>
</section>`;

const cardsMarkup = `<section class="cards">
<h2 class="cards__title title-section">Results</h2>
<div class="cards__grid"> </div>
<button class="cards__button">Show more</button>
</section>`;

const myCardsMarkup = `<section class="cards">
<div class="cards__grid"> </div>
</section>`;

const cardMarkup = `
        <div class="cards__image-container">
          <button class="cards__bookmark"> </button>
          <img class="cards__photo" alt="photo" src="">
        </div>
        <a class="cards__text links" href="" target="_blank">
          <p class="cards__item-date"></p>
          <h3 class="cards__item-title"></h3>
          <p class="cards__item-article"></p>
          <p class="cards__sign">РИА</p>
        </a>
      `;

const myCardMarkup = ` <div class="cards__image-container">
<button class="cards__bookmark cards__bookmark_icon_delete"> </button>
<p class="cards__label"></p>
<img class="cards__photo" alt="photo" src="">
</div>
<a class="cards__text links" href="" target="_blank">
<p class="cards__item-date">31 june 2020</p>
<h3 class="cards__item-title"></h3>
<p class="cards__item-article"></p>
<p class="cards__sign"></p>
</a>
`;

const unloggedMenuMarkup = `<li class="header__link header__link_type_selected">
<a class="links" href="index.html">Main</a>
</li>
<li class="header__link header__link_type_button button_type_login">Authorization
</li>
`;

const loggedMenuMarkup = `<li class="header__link header__link_type_selected">
<a class="links" href="index.html">Main</a>
</li>
<li class="header__link ">
<a class="links" href="articles.html">My articles</a>
</li>
<li class="header__link header__link_type_button button_type_exit exit">
<p class="header__name exit"></p>
<div class="header__exit header__exit_color_white exit"> </div>
</li>
`;

const menuArticlesMarkup = `<li class="header__link">
<a class="links" href="index.html">Main</a>
</li>
<li class="header__link header__link_type_selected">
<a class="links" href="articles.html">My articles</a>
</li>
<li class="header__link header__link_type_button button_type_exit exit">
<p class="header__name exit"></p>
<div class="header__exit header__exit_color_black exit"> </div>
</li>
`;

const popupUnlogMenuMarkup =`    <div class="popup__content_type_menu">
<header class="header header_type_dark">
<div class="header__logo header__logo_type_popup">
</header>
<div class="popup__close"> </div>
<ul class="popup__menu">
  <li class="header__link">
    <a class="links" href="index.html">Main</a>
  </li>
  <li class="header__link header__link_type_button button_type_login">Authorization
  </li>
</ul>
</div>`;

const popupLogMenuMarkup =`    <div class="popup__content_type_menu">
<header class="header header_type_dark">
<div class="header__logo header__logo_type_popup"><>
</header>
<div class="popup__close"> </div>
<ul class="popup__menu">
<li class="header__link">
<a class="links" href="index.html">Main</a>
</li>
<li class="header__link header__link_type_selected">
<a class="links" href="articles.html">My articles</a>
</li>
<li class="header__link header__link_type_button button_type_exit exit">
<p class="header__name exit"></p>
<div class="header__exit header__exit_color_white exit"> </div>
</li></ul>
</div>`;

const popupArtMenuMarkup =`    <div class="popup__content_type_menu">
<header class="header header_type_dark">
<div class="header__logo header__logo_type_popup"><>
</header>
<div class="popup__close"> </div>
<ul class="popup__menu">
<li class="header__link header__link_type_selected">
<a class="links" href="articles.html">My articles</a>
</li>
<li class="header__link header__link_type_button button_type_exit exit">
<p class="header__name exit"></p>
<div class="header__exit header__exit_color_white exit"> </div>
</li></ul>
</div>`;

const successMarkup = `
<div class="popup__content popup__content_type_form">
<div class="popup__close"> </div>
<h3 class="popup__title">Success! User was registred.</h3>
<span class="popup__subtext popup__button button_type_login" >Login</span>
</div>`;

const loginMarkup = `
<div class="popup__content popup__content_type_form">
<div class="popup__close"> </div>
<h3 class="popup__title">Enter</h3>
<form class="popup__form popup__form_type_login" name="login" novalidate>
  <div class="popup__input-container">
    <p class="popup__input-title">Email</p>
    <input type="text" name="email"
      pattern="^[a-zA-Z0-9]((-|_)?[a-zA-Z0-9]+)*@([a-zA-Z0-9]((-)?[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}$"
      class="popup__input popup__input_type_email" placeholder="E-mail" required>
    <span class="error-message"> </span>
  </div>
  <div class="popup__input-container">
    <p class="popup__input-title">Password</p>
    <input type="text" name="password" minlength="8" class="popup__input popup__input_type_password"
      placeholder="Password" required>
    <span class="error-message"> </span>
  </div>
  <span class="error-message server-error"></span>
  <button type="submit" class="popup__submit">Login</button>
  <span class="popup__text">or<button class="popup__button button_type_signup">Signup</button></span>
</form>
</div>`;

const signupMarkup = `
<div class="popup__content popup__content_type_form">
<div class="popup__close"> </div>
      <h3 class="popup__title">Registration</h3>
      <form class="popup__form popup__form_type_signup" name="signup" novalidate>
        <div class="popup__input-container">
          <p class="popup__input-title">Email</p>
          <input type="text" name="email"
            pattern="^[a-zA-Z0-9]((-|_)?[a-zA-Z0-9]+)*@([a-zA-Z0-9]((-)?[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}$"
            class="popup__input popup__input_type_email" placeholder="Type the e-mail" required>
          <span class="error-message"> </span>
        </div>
        <div class="popup__input-container">
          <p class="popup__input-title">Password</p>
          <input type="text" name="password" minlength="8" class="popup__input popup__input_type_password"
            placeholder="Type the password" required>
          <span class="error-message"> </span>
        </div>
        <div class="popup__input-container">
          <p class="popup__input-title">Name</p>
          <input type="text" name="name" minlength="2" maxlength="30" class="popup__input popup__input_type_name"
            placeholder="Type your name" required>
          <span class="error-message"> </span>
        </div>
        <span class="error-message server-error"></span>
        <button type="submit" class="popup__submit">Signup</button>
        <span class="popup__text">or<button class="popup__button button_type_login">Login</button></span>
      </form>
    </div>`;

export {
  loginMarkup, signupMarkup, popupLogMenuMarkup, popupUnlogMenuMarkup,
  loggedMenuMarkup, menuArticlesMarkup, popupArtMenuMarkup, unloggedMenuMarkup,
  successMarkup, cardMarkup, cardsMarkup, noCardsMarkup, loaderMarkup,
  fewKeysMarkup, moreKeysMarkup, myCardMarkup, myCardsMarkup
};
