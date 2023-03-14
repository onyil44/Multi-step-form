import View from "./view";

class SummaryView extends View {
  _parentElement = document.querySelector(`.summary`);

  addHandlerSummarySubmit = function (handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      const btn = e.target.closest(`.btn-confirm`);
      if (!btn) return;
      const goTo = ``;
      handler(goTo);
    });
  };

  addHandlerChangePlan = function (handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      e.preventDefault();
      const link = e.target.closest(`.summary__mainplan--link`);
      if (!link) return;
      const goTo = link.href;
      if (!link) return;
      handler(goTo);
    });
  };

  addHandlerSummaryGoBack = function (handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      const goTo = e.target.closest(`.btn-back`)?.dataset.goto;
      if (!goTo) return;
      handler(goTo);
    });
  };

  _generateMarkup() {
    const markup = `
        <div class="form__header">
            <h2 class="form__title">Finishing up</h2>
            <span class="form__text"
              >Double-check everything looks OK before confirming.</span
            >
          </div>
          <div class="summary-card">
            <div class="summary__mainplan mb-2">
              <span class="summary__mainplan--name">${
                this._data.paymentPlan.planType
              } (${this._data.yearly ? `Yearly` : `Monthly`})</span>
              <a href="select-plan" class="summary__mainplan--link">Change</a>
              <span class="summary__mainplan--price">$${
                this._data.paymentPlan.paymentValue
              }/${this._data.yearly ? `yr` : `mo`}</span>
            </div>
            <hr class="mb-2" />
            <div class="summary__addons ${
              this._data.addOns.onlineService === 0 ? `hidden` : ``
            }">
              <span class="summary__addons--name">Online Service </span>
              <span class="summary__addons--price">+$${
                this._data.addOns.onlineService
              }/${this._data.yearly ? `yr` : `mo`}</span>
            </div>
            <div class="summary__addons ${
              this._data.addOns.largerStorage === 0 ? `hidden` : ``
            }">
              <span class="summary__addons--name">Larger Storage </span>
              <span class="summary__addons--price">+$${
                this._data.addOns.largerStorage
              }/${this._data.yearly ? `yr` : `mo`}</span>
            </div>
            <div class="summary__addons ${
              this._data.addOns.customProfile === 0 ? `hidden` : ``
            }">
              <span class="summary__addons--name">Customizable Profile </span>
              <span class="summary__addons--price">+$${
                this._data.addOns.customProfile
              }/${this._data.yearly ? `yr` : `mo`}</span>
            </div>
          </div>
          <div class="summary__total">
            <span class="summary__total--name">Total(per year)</span>
            <span class="summary__total--price">$${this._data.total}/${
      this._data.yearly ? `yr` : `mo`
    }</span>
          </div>

          <div class="btn-container">
            <button type="button" class="btn btn-back" data-goto="add-ons">Go Back</button>
            <button type="submit" class="btn btn-confirm">Confirm</button>
          </div>
        `;

    return markup;
  }
}

export default new SummaryView();
