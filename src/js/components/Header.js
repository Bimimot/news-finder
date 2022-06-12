export default class Header {
  constructor(menuContainer) {
    this.menuContainer = menuContainer;
  }

  setMenu(menuMarkup, name) {
    this.clearMenu();
    this.menuContainer.insertAdjacentHTML('beforeend', menuMarkup);
    if (name && name !== '') {
      this.setNameOnButton(name);
    }
  }

  clearMenu() {
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
