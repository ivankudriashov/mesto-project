import {openPopup} from './utils.js'

const popupProfile = document.querySelector('#popup_profile'),
      nameInput = document.querySelector('input[name=profile_name]'),
      jobInput = document.querySelector('input[name=profile_status]'),
      profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description');

function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupProfile);
}

function submitFormProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

export {openPopupProfile, submitFormProfile}
