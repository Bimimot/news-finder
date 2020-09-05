const loginMarkup = `
<div class="popup__content popup__content_type_form">
<img src="../images/close.png" alt="" class="popup__close">
<h3 class="popup__title">Вход</h3>
<form class="popup__form popup__form_type_login" name="login" novalidate>
  <div class="popup__input-container">
    <p class="popup__input-title">Email</p>
    <input type="text" name="email"
      pattern="^[a-zA-Z0-9]((-|_)?[a-zA-Z0-9]+)*@([a-zA-Z0-9]((-)?[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}$"
      class="popup__input popup__input_type_email" placeholder="Введите почту" required>
    <span class="error-message"> </span>
  </div>
  <div class="popup__input-container">
    <p class="popup__input-title">Пароль</p>
    <input type="text" name="password" minlength="8" class="popup__input popup__input_type_password"
      placeholder="Введите пароль" required>
    <span class="error-message"> </span>
  </div>
  <span class="error-message server-error"></span>
  <button type="submit" class="popup__submit">Войти</button>
  <span class="popup__text">или<button class="popup__button button_type_signup">Зарегистрироваться</button></span>
</form>
</div>`;

const signupMarkup = `
<div class="popup__content popup__content_type_form">
      <img src="<%=require('../images/close.png').default%>" alt="" class="popup__close">
      <h3 class="popup__title">Регистрация</h3>
      <form class="popup__form popup__form_type_signup" name="signup" novalidate>
        <div class="popup__input-container">
          <p class="popup__input-title">Email</p>
          <input type="text" name="email"
            pattern="^[a-zA-Z0-9]((-|_)?[a-zA-Z0-9]+)*@([a-zA-Z0-9]((-)?[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}$"
            class="popup__input popup__input_type_email" placeholder="Введите почту" required>
          <span class="error-message"> </span>
        </div>
        <div class="popup__input-container">
          <p class="popup__input-title">Пароль</p>
          <input type="text" name="password" minlength="8" class="popup__input popup__input_type_password"
            placeholder="Введите пароль" required>
          <span class="error-message"> </span>
        </div>
        <div class="popup__input-container">
          <p class="popup__input-title">Имя</p>
          <input type="text" name="name" minlength="2" maxlength="30" class="popup__input popup__input_type_name"
            placeholder="Введите свое имя" required>
          <span class="error-message"> </span>
        </div>
        <button type="submit" class="popup__submit">Зарегистрироваться</button>
        <span class="popup__text">или<button class="popup__button button_type_login">Войти</button></span>
      </form>
    </div>`;

export { loginMarkup, signupMarkup };
