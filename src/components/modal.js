import {openPopup, closePopup} from './utils.js'
import {changeProfile} from './../scripts/index.js'

const popupProfile = document.querySelector('#popup_profile'),
      nameInput = document.querySelector('input[name=profile_name]'),
      jobInput = document.querySelector('input[name=profile_status]'),
      profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description');



/* function openPopupAvatar() {
  openPopup(popupAvatar)
} */

function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupProfile);
}

function submitFormProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  changeProfile(nameInput.value, jobInput.value);
}


function closeEscPopup(evt) {
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function closeClickOverlayPopup(evt) {
  if(evt.target.classList.contains('popup')) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

export {openPopupProfile, submitFormProfile, closeEscPopup, closeClickOverlayPopup}
