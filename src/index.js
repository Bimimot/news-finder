import "./pages/style.css";

import FormValidator from './js/FormValidator.js';
import Popup from './js/Popup.js';

    //dom-элементы, для работы с методами классов
    // const mainContainer = document.querySelector('.root');                            //основной контейнер, нужен для слушания keydown
    // const rootContainer = document.querySelector('.places-list');                     //контейнер для карточек
    // const plusCardForm = document.querySelector('.popup__form_type_add-place');
    const loginForm = document.querySelector('.popup__form_type_login');
    const loginButton = document.querySelector('.header__button');
    // const avatarForm = document.querySelector('.popup__form_type_avatar');
    // const profileElement = document.querySelector('.profile');
    // const avatarElement = document.querySelector('.user-info__photo');

    const popupLoginContainer = document.querySelector('.popup_type_login');
    // const popupAvatarContainer = document.querySelector('.popup_type_avatar');
    // const popupCardContainer = document.querySelector('.popup_type_card');
    // const popupAddCardContainer = document.querySelector('.popup_type_add-place');

    //тексты ошибок
    const errorsMessages = {
      validateBlank: 'Это обязательное поле',
      validateText: 'Должно быть от 2 до 30 символов',
      validateUrl: 'Здесь должна быть ссылка'
    }


    const validator = new FormValidator(errorsMessages);                               //создаем валидатор, передаем тексты ошибок
    const loginPopup = new Popup(popupLoginContainer, loginButton, validator);
