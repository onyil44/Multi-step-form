export default class View {
  _data;
  render(data, clear = true) {
    this._data = data;
    this.clear(clear);
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  update(data) {
    this._data = data;
    if (!data) return;
    const markup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(markup);
    const newElement = Array.from(newDOM.querySelectorAll(`*`));
    const curElement = Array.from(this._parentElement.querySelectorAll(`*`));
    newElement.forEach((newEl, i) => {
      const curEl = curElement[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ``
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  dataValidation(type) {
    const inputs = Array.from(this._parentElement.querySelectorAll(`input`));
    let control = [];
    if (type === `text`) {
      inputs.forEach((input) => {
        if (input.value === `` && !input.classList.contains(`invalid`)) {
          input.classList.add(`invalid`);
        } else if (input.value !== `` && input.classList.contains(`invalid`)) {
          input.classList.remove(`invalid`);
        }
        control.push(input.value === `` ? 0 : 1);
      });
      return control.reduce((arr, cur) => arr * cur);
    } else if (type === `radio`) {
      control = inputs.map((cur) => (cur.checked === true ? 1 : 0));
      inputs.forEach((input) => {
        if (!control && !input.classList.contains(`invalid`)) {
          input.classList.add(`invalid`);
        } else if (control && input.classList.contains(`invalid`)) {
          input.classList.remove(`invalid`);
        }
      });
      return control.reduce((sum, cur) => cur + sum);
    }
  }

  clear(clear) {
    if (clear === true) {
      const elementArr = Array.from(this._parentElement.parentElement.children);
      elementArr.forEach((element) => (element.innerHTML = ``));
    } else if (clear === false) {
      this._parentElement.innerHTML = ``;
    }
  }
}
