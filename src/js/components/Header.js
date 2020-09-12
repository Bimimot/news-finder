export default class Header {
  constructor(menuContainer) {
    this.menuContainer = menuContainer;
  }

  setMenu(menuMarkup, name) { // установка нового списка в хедер
    this.clearMenu();
    this.menuContainer.insertAdjacentHTML('beforeend', menuMarkup);
    if (name && name !== '') {
      this.setNameOnButton(name);
    }
  }

  clearMenu() { // очистка списка заголовков из хэдера
    while (this.menuContainer.firstChild) {
      this.menuContainer.removeChild(this.menuContainer.firstChild);
    }
  }

  setNameOnButton(name) { // установка имени на кнопку
    this.menuContainer.querySelector('.header__link_type_button')
      .querySelector('.header__name')
      .textContent = `${name}\xa0`;
  }
}
