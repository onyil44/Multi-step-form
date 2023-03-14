import View from "./view";

class SidebarView extends View {
  _parentElement = document.querySelector(`.sidebar`);

  addHandlerChangePage = function (handler) {};

  _generateMarkup() {
    const markup = `
    <ul class="sidebar__list">
        <li class="sidebar__item ${
          this._data.page === `personal-info` ? `active` : ``
        }" data-id="0">
            <div class="sidebar__item-icon">1</div>
            <span class="sidebar__item-title">Step 1</span>
            <span class="sidebar__item-text">Your info</span>
        </li>
        <li class="sidebar__item ${
          this._data.page === `select-plan` ? `active` : ``
        }" data-id="1">
            <div class="sidebar__item-icon" >2</div>
            <span class="sidebar__item-title">Step 2</span>
            <span class="sidebar__item-text">Select plan</span>
        </li>
        <li class="sidebar__item ${
          this._data.page === `add-ons` ? `active` : ``
        }" data-id="2">
            <div class="sidebar__item-icon">3</div>
            <span class="sidebar__item-title">Step 3</span>
            <span class="sidebar__item-text">Add-ons Step</span>
        </li>
        <li class="sidebar__item ${
          this._data.page === `summary` ? `active` : ``
        }" data-id="3">
            <div class="sidebar__item-icon">4</div>
            <span class="sidebar__item-title">Step 4</span>
            <span class="sidebar__item-text">Summary</span>
        </li>
    </ul>
`;
    return markup;
  }
}

export default new SidebarView();
