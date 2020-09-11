export default class Header {
  constructor(menuContainer) {
    this.menuContainer = menuContainer;
  }

  setMenu(menuMarkup, name) { // устанавливаем новый список заголовков в хэдео
    this.clearMenu();
    this.menuContainer.insertAdjacentHTML('beforeend', menuMarkup);
    if (name && name !== '') {
      this.setNameOnButton(name);
    }
  }

  clearMenu() { // убираем список заголовков из хэдера
    while (this.menuContainer.firstChild) {
      this.menuContainer.removeChild(this.menuContainer.firstChild);
    }
  }

  setNameOnButton(name) {
    this.menuContainer.querySelector('.header__link_type_button')
      .querySelector('.header__name')
      .textContent = `${name}\xa0`;
  }
}
