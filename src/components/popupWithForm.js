import {Popup} from './popup.js'

export class PopupWithForm extends Popup{
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback;
    this._popupForm = popupSelector.querySelector('.popup__form');
  }

  _submitForm = (evt) => {
    evt.preventDefault();
    this._callback();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._submitForm)
  }

  close() {
    this._popupForm.reset();
    this._popupForm.querySelector('.popup__btn').classList.add('popup__btn_disabled');
    super.close();
  }
}
