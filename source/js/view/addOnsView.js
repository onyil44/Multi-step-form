import View from "./view";

class AddOnsView extends View {
  _parentElement = document.querySelector(`.add_ons`);

  addHandlerClickAnnOns = function (handler) {
    this._parentElement.addEventListener(`change`, function (e) {
      const input = e.target.closest(`input`);
      if (!input) return;
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  };

  addHandlerSubmitAddOns = function (handler) {
    this._parentElement.addEventListener(`submit`, function (e) {
      e.preventDefault();
      const goTo = e.target.querySelector(`.btn-next`).dataset.goto;
      if (!goTo) return;
      handler(goTo);
    });
  };

  addHandlerAddOnsGoBack = function (handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      const btn = e.target.closest(`.btn-back`);
      if (!btn) return;
      const goTo = btn.dataset.goto;
      handler(goTo);
    });
  };

  _generateMarkup() {
    const markup = `
        <div class="form__header">
            <h2 class="form__title">Pick add-ons</h2>
            <span class="form__text"
              >Add-ons help enhance your gaming experience.</span
            >
          </div>
          <div class="form__group mb-1">
            <input
              type="checkbox"
              class="form__checkbox"
              id="online-service"
              name="online_service"
              value="${
                this._data.plans.yearly
                  ? this._data.addOns.onlineService[1]
                  : this._data.addOns.onlineService[0]
              }"
              ${this._data.record.addOns.onlineService > 0 ? `checked` : ``}
            
            />
            <label for="online-service" class="form__checkbox-label">
              <div class="form__checkbox-icon"></div>
              <span class="form__checkbox-title">Online service</span>
              <span class="form__checkbox-text"
                >Access to multiplayer games</span
              >
              <span class="form__checkbox-price">+$${
                this._data.plans.yearly
                  ? this._data.addOns.onlineService[1] + `/yr`
                  : this._data.addOns.onlineService[0] + `/mo`
              }</span>
            </label>
          </div>
          <div class="form__group mb-1">
            <input
              type="checkbox"
              class="form__checkbox"
              id="larger-storage"
              name="larger_storage"
              value="${
                this._data.plans.yearly
                  ? this._data.addOns.largerStorage[1]
                  : this._data.addOns.largerStorage[0]
              }"
              ${this._data.record.addOns.largerStorage > 0 ? `checked` : ``}

            />
            <label for="larger-storage" class="form__checkbox-label">
              <div class="form__checkbox-icon"></div>
              <span class="form__checkbox-title">Larger storage</span>
              <span class="form__checkbox-text">Extra 1TB of cloud save</span>
              <span class="form__checkbox-price">+$${
                this._data.plans.yearly
                  ? this._data.addOns.largerStorage[1] + `/yr`
                  : this._data.addOns.largerStorage[0] + `/mo`
              }</span>
            </label>
          </div>
          <div class="form__group">
            <input
              type="checkbox"
              class="form__checkbox"
              id="customizable-profile"
              name="custom_profile"
              value="${
                this._data.plans.yearly
                  ? this._data.addOns.customProfile[1]
                  : this._data.addOns.customProfile[0]
              }"
              ${this._data.record.addOns.customProfile > 0 ? `checked` : ``}

            />
            <label for="customizable-profile" class="form__checkbox-label">
              <div class="form__checkbox-icon"></div>
              <span class="form__checkbox-title">Customizable Profile</span>
              <span class="form__checkbox-text"
                >Custom theme on your profile</span
              >
              <span class="form__checkbox-price">+$${
                this._data.plans.yearly
                  ? this._data.addOns.customProfile[1] + `/yr`
                  : this._data.addOns.customProfile[0] + `/mo`
              }</span>
            </label>
          </div>

          <div class="btn-container">
            <button type="button" class="btn btn-back" data-goto="select-plan">Go Back</button>
            <button type="submit" class="btn btn-next" data-goto="summary">Next Step</button>
          </div>
        `;
    return markup;
  }
}

export default new AddOnsView();
