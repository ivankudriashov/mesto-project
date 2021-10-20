import {Popup} from './popup.js'

export class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this.image = this.popupSelector.querySelector('.popup__image');
    this.caption = this.popupSelector.querySelector('.popup__caption');
  }

  open(data) {
    super.open();
    this.image.setAttribute('src', data.link);
    this.image.setAttribute('alt', data.name);
    this.caption.textContent = data.name;
  }
}
