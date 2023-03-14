import View from "./view";

class PersonalInfoView extends View {
  _parentElement = document.querySelector(`.personal-info`);
  constructor() {
    super();
    this.addHandlerInput(this.dataValidation.bind(this));
  }

  addHandlerPersonalInfo = function (handler) {
    window.addEventListener(`load`, handler);
  };

  addHandlerPersonalInfoSubmit = function (handler) {
    this._parentElement.addEventListener(`submit`, function (e) {
      e.preventDefault();
      const goTo = e.target.querySelector(`.btn-next`).dataset.goto;
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data, goTo);
    });
  };

  addHandlerInput = function (handler) {
    this._parentElement.addEventListener(`input`, function (e) {
      const input = e.target.closest(`input`);
      if (!input) return;
      handler();
    });
  };

  dataValidation() {
    const inputs = Array.from(this._parentElement.querySelectorAll(`input`));
    const control = [];
    inputs.forEach((input) => {
      if (input.value === `` && !input.classList.contains(`invalid`)) {
        input.classList.add(`invalid`);
      } else if (input.value !== `` && input.classList.contains(`invalid`)) {
        input.classList.remove(`invalid`);
      }
      control.push(input.value === `` ? 0 : 1);
    });
    return control.reduce((arr, cur) => arr * cur);
  }

  _generateMarkup() {
    const markup = `
        <div class="form__header">
        <h2 class="form__title">Personal info</h2>
        <span class="form__text"
            >Please provide your name, email address, and phone number.</span
        >
        </div>
        <div class="form__group">
        <label for="name" class="form__label">Name</label>
        <input
            type="text"
            class="form__input"
            id="name"
            placeholder="e.g. Stephen King"
            name="name"
            value="${
              Object.keys(this._data).length === 0 ? `` : this._data.name
            }"
        />
        <span class="form__input-error">This field is required</span>
        </div>
        <div class="form__group">
        <label for="email" class="form__label">Email Address</label>
        <input
            type="email"
            class="form__input"
            id="email"
            placeholder="e.g. stephenking@lorem.com"
            name="email"
            value="${
              Object.keys(this._data).length === 0 ? `` : this._data.email
            }"
        />
        <span class="form__input-error">This field is required</span>
        </div>
        <div class="form__group">
        <label for="phone" class="form__label">Phone Number</label>
        <input
            type="phone"
            class="form__input"
            id="phone"
            placeholder="e.g. +1 234 567 890"
            name="phone"
            value="${
              Object.keys(this._data).length === 0 ? `` : this._data.phone
            }"
        />
        <span class="form__input-error">This field is required</span>
        </div>
        <div class="btn-container">
        <button class="btn btn-next" data-goto="select-plan">Next Step</button>
        </div>
    
    
    `;
    return markup;
  }
}

export default new PersonalInfoView();
