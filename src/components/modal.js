import {openPopup, closePopup, renderLoading} from './utils.js'
import {changeProfile} from './api.js'

const popupProfile = document.querySelector('#popup_profile'),
      nameInput = document.querySelector('input[name=profile_name]'),
      jobInput = document.querySelector('input[name=profile_status]'),
      profileName = document.querySelector('.profile__name'),
      popupSaveProfile = popupProfile.querySelector('.popup__btn'),
      profileDescription = document.querySelector('.profile__description');

function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupProfile);
}

function submitFormProfile(evt) {
  evt.preventDefault();

  renderLoading(true, popupSaveProfile);

  changeProfile(nameInput.value, jobInput.value)
    .then(() => {
      profileName.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.log(err);
      closePopup(popupProfile);
    })
    .finally(() => renderLoading(false, popupSaveProfile))
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
