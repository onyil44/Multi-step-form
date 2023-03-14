import View from "./view";

class SelectPlanView extends View {
  _parentElement = document.querySelector(`.select-plan`);

  constructor() {
    super();
    this._addHandlerInputDataValidation(this.dataValidation.bind(this));
  }

  addHandlerYearlyPlan(handler) {
    this._parentElement.addEventListener(`change`, function (e) {
      const input = e.target.closest(`.form__switch`);
      if (!input) return;
      const data = input.checked;
      handler(data);
    });
  }

  addHandlerClickPlan = function (handler) {
    this._parentElement.addEventListener(`change`, function (e) {
      const input = e.target.closest(`.form__radio`);
      if (!input) return;
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      data.plan_type = input.id;
      handler(data);
    });
  };

  addHandlerSubmitPlan = function (handler) {
    this._parentElement.addEventListener(`submit`, function (e) {
      e.preventDefault();
      const goTo = e.target.querySelector(`.btn-next`).dataset.goto;
      handler(goTo);
    });
  };

  _addHandlerInputDataValidation = function (handler) {
    this._parentElement.addEventListener(`input`, function (e) {
      e.preventDefault();
      const input = e.target.classList.contains(`.form__radio`);
      if (!input) return;
      handler();
    });
  };

  addHandlerPlanGoBack = function (handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      const btn = e.target.closest(`.btn-back`);
      if (!btn) return;
      const goTo = btn.dataset.goto;
      handler(goTo);
    });
  };

  dataValidation() {
    const inputs = Array.from(
      this._parentElement.querySelectorAll(`.form__radio`)
    );
    const control = inputs.map((cur) => (cur.checked === true ? 1 : 0));
    const sumControl = control.reduce((sum, cur) => cur + sum);
    inputs.forEach((input) => {
      if (
        !sumControl &&
        !input.nextElementSibling.classList.contains(`invalid`)
      ) {
        input.nextElementSibling.classList.add(`invalid`);
      } else if (
        sumControl &&
        input.nextElementSibling.classList.contains(`invalid`)
      ) {
        input.nextElementSibling.classList.remove(`invalid`);
      }
    });
    return sumControl;
  }

  _generateMarkup() {
    const markup = `
          <div class="form__header">
            <h2 class="form__title">Select your plan</h2>
            <span class="form__text"
              >You have the option of monthly or yearly billing.</span
            >
          </div>
          <div class="form__group">
            <input
              class="form__radio"
              type="radio"
              id="arcade"
              name="select_plan"
              value="${
                this._data.plans.yearly
                  ? this._data.plans.arcade[1]
                  : this._data.plans.arcade[0]
              }"
              ${
                (this._data.plans.yearly &&
                  this._data.record.paymentPlan.paymentValue ===
                    this._data.plans.arcade[1]) ||
                (!this._data.plans.yearly &&
                  this._data.record.paymentPlan.paymentValue ===
                    this._data.plans.arcade[0])
                  ? `checked`
                  : ``
              }
            />
            <label class="form__radio-label" for="arcade">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
          >
            <g fill="none" fill-rule="evenodd">
              <circle cx="20" cy="20" r="20" fill="#FFAF7E" />
              <path
                fill="#FFF"
                fill-rule="nonzero"
                d="M24.995 18.005h-3.998v5.998h-2v-5.998H15a1 1 0 0 0-1 1V29a1 1 0 0 0 1 1h9.995a1 1 0 0 0 1-1v-9.995a1 1 0 0 0-1-1Zm-5.997 8.996h-2v-1.999h2v2Zm2-11.175a2.999 2.999 0 1 0-2 0v2.18h2v-2.18Z"
              />
            </g>
          </svg>
              <span class="form__radio-title">Arcade</span>
              <span class="form__radio-text">$${
                this._data.plans.yearly
                  ? this._data.plans.arcade[1] + `/yr`
                  : this._data.plans.arcade[0] + `/mo`
              }</span>
              <span class="form__radio-promo ${
                !this._data.plans.yearly ? `form__radio-promo--hidden` : ``
              }">
              2 months free
              </span>
              
            </label>
          </div>
          <div class="form__group">
            <input
              class="form__radio"
              type="radio"
              id="advanced"
              name="select_plan"
              value="${
                this._data.plans.yearly
                  ? this._data.plans.advanced[1]
                  : this._data.plans.advanced[0]
              }"
              ${
                (this._data.plans.yearly &&
                  this._data.record.paymentPlan.paymentValue ===
                    this._data.plans.advanced[1]) ||
                (!this._data.plans.yearly &&
                  this._data.record.paymentPlan.paymentValue ===
                    this._data.plans.advanced[0])
                  ? `checked`
                  : ``
              }
            />
            <label class="form__radio-label" for="advanced">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
              >
                <g fill="none" fill-rule="evenodd">
                  <circle cx="20" cy="20" r="20" fill="#F9818E" />
                  <path
                    fill="#FFF"
                    fill-rule="nonzero"
                    d="M25.057 15H14.944C12.212 15 10 17.03 10 19.885c0 2.857 2.212 4.936 4.944 4.936h10.113c2.733 0 4.943-2.08 4.943-4.936S27.79 15 25.057 15ZM17.5 20.388c0 .12-.108.237-.234.237h-1.552v1.569c0 .126-.138.217-.259.217H14.5c-.118 0-.213-.086-.213-.203v-1.583h-1.569c-.126 0-.217-.139-.217-.26v-.956c0-.117.086-.213.202-.213h1.584v-1.554c0-.125.082-.231.203-.231h.989c.12 0 .236.108.236.234v1.551h1.555c.125 0 .231.083.231.204v.988Zm5.347.393a.862.862 0 0 1-.869-.855c0-.472.39-.856.869-.856.481 0 .87.384.87.856 0 .471-.389.855-.87.855Zm1.9 1.866a.86.86 0 0 1-.87-.852.86.86 0 0 1 .87-.855c.48 0 .87.38.87.855a.86.86 0 0 1-.87.852Zm0-3.736a.862.862 0 0 1-.87-.854c0-.472.39-.856.87-.856s.87.384.87.856a.862.862 0 0 1-.87.854Zm1.899 1.87a.862.862 0 0 1-.868-.855c0-.472.389-.856.868-.856s.868.384.868.856a.862.862 0 0 1-.868.855Z"
                  />
                </g>
              </svg>
              <span class="form__radio-title">Advanced</span>
              <span class="form__radio-text">$${
                this._data.plans.yearly
                  ? this._data.plans.advanced[1] + `/yr`
                  : this._data.plans.advanced[0] + `/mo`
              }</span>
              <span class="form__radio-promo ${
                !this._data.plans.yearly ? `form__radio-promo--hidden` : ``
              }">
              2 months free
              </span>
            </label>
          </div>
          <div class="form__group">
            <input
              class="form__radio"
              type="radio"
              id="pro"
              name="select_plan"
              value="${
                this._data.plans.yearly
                  ? this._data.plans.pro[1]
                  : this._data.plans.pro[0]
              }"
              ${
                (this._data.plans.yearly &&
                  this._data.record.paymentPlan.paymentValue ===
                    this._data.plans.pro[1]) ||
                (!this._data.plans.yearly &&
                  this._data.record.paymentPlan.paymentValue ===
                    this._data.plans.pro[0])
                  ? `checked`
                  : ``
              }
            />
            <label class="form__radio-label" for="pro">
            <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
        >
          <g fill="none" fill-rule="evenodd">
            <circle cx="20" cy="20" r="20" fill="#483EFF" />
            <path
              fill="#FFF"
              fill-rule="nonzero"
              d="M26.666 13H13.334A3.333 3.333 0 0 0 10 16.333v7.193a3.447 3.447 0 0 0 2.14 3.24c1.238.5 2.656.182 3.56-.8L18.52 23h2.96l2.82 2.966a3.2 3.2 0 0 0 3.56.8 3.447 3.447 0 0 0 2.14-3.24v-7.193A3.333 3.333 0 0 0 26.666 13Zm-9.333 6H16v1.333a.667.667 0 0 1-1.333 0V19h-1.333a.667.667 0 0 1 0-1.334h1.333v-1.333a.667.667 0 1 1 1.333 0v1.333h1.333a.667.667 0 1 1 0 1.334Zm7.333 2a2.667 2.667 0 1 1 0-5.333 2.667 2.667 0 0 1 0 5.333ZM26 18.333a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 0 1 2.667 0Z"
            />
          </g>
        </svg>
              <span class="form__radio-title">Pro</span>
              <span class="form__radio-text">$${
                this._data.plans.yearly
                  ? this._data.plans.pro[1] + `/yr`
                  : this._data.plans.pro[0] + `/mo`
              }</span>
              <span class="form__radio-promo ${
                !this._data.plans.yearly ? `form__radio-promo--hidden` : ``
              }">
              2 months free
              </span>
            </label>
          </div>
          <div class="form__group all-line all-line--gray mt-2">
            <input
              type="checkbox"
              class="form__switch"
              id="yearly"
              name="yearly"
              ${this._data.plans.yearly ? `checked` : ``}
            />
            <label for="yearly" class="form__switch-label">
              <span class="form__switch-text--1">Monthly</span>
              <span class="form__switch-slider"></span>
              <span class="form__switch-text--2">Yearly</span>
            </label>
          </div>
          <div class="btn-container">
            <button type="button" class="btn btn-back" data-goto="personal-info">Go Back</button>
            <button type="submit" class="btn btn-next" data-goto="add-ons">Next Step</button>
          </div>
        
    `;

    return markup;
  }
}

export default new SelectPlanView();
