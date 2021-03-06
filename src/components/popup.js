export class Popup {
  constructor(popupSelector){
    this.popupSelector = popupSelector;
  }

  open(){
    this.popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    this.popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  _closeClickOverlayPopup = (evt) => {
      if(evt.target.classList.contains('popup')) {
        this.close();
      }
  }

  setEventListeners(){
    const closePopupBtn = this.popupSelector.querySelector('.popup__close');
    closePopupBtn.addEventListener('click', () => this.close());

    document.addEventListener('click', this._closeClickOverlayPopup.bind(this));
  }
}

