export class Section {
  constructor({ data, renderer }, cardContainer ) {
    this._data = data;
    this._renderer = renderer;
    this._container = document.querySelector(cardContainer);
  }

  setItem(element) {
    this._container.prepend(element);
  }

  renderDefaultItems() {
    this._data.reverse();

    this._data.forEach(item => {
      this._renderer(item);
    });
  }
}
