import {closeEscPopup, closeClickOverlayPopup} from './modal.js'

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscPopup);
  document.addEventListener('click', closeClickOverlayPopup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscPopup);
  document.removeEventListener('click', closeClickOverlayPopup);

}

export {openPopup, closePopup}
