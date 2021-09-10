/* 'use strict'; */

import '../pages/index.css';
import {enableValidation, resetValidation} from '../components/validate.js'
import {addCard, showDefaultCards, showDefaultLikes} from '../components/card.js'
import {openPopupProfile, submitFormProfile} from '../components/modal.js'
import {getInitialProfile, getInitialCards, changeAvatar, addCardToServer} from '../components/api.js'
import {openPopup, closePopup, renderLoading} from '../components/utils.js'



const profileEditBtn = document.querySelector('.profile__edit-btn'),

      popupProfile = document.querySelector('#popup_profile'),
      popupProfileClosed = popupProfile.querySelector('.popup__close'),
      formProfile = popupProfile.querySelector('.popup__form'),

      profileAddBtn = document.querySelector('.profile__add-btn'),

      popupCards = document.querySelector('#popup_cards'),
      popupCardsClosed = popupCards.querySelector('.popup__close'),
      formCards = popupCards.querySelector('.popup__form'),
      popupSaveCards = popupCards.querySelector('.popup__btn'),

      placeInput = document.querySelector('input[name=place_name]'),
      linkInput = document.querySelector('input[name=place_link]'),

      popupPhoto = document.querySelector('#popup_photo'),
      popupPhotoClosed = popupPhoto.querySelector('.popup__close'),

      cardsList = document.querySelector('.elements__list'),

      avatarButton = document.querySelector('.profile__avatar-button'),
      popupAvatar = document.querySelector('#popup_avatar'),
      popupAvatarClosed = popupAvatar.querySelector('.popup__close'),
      formAvatar = popupAvatar.querySelector('.popup__form'),
      popupSaveAvatar = popupAvatar.querySelector('.popup__btn'),

      avatarInput = document.querySelector('input[name=avatar_link]'),

      profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description'),
      profileAvatar = document.querySelector('.profile__avatar');

//profile's popup

formProfile.addEventListener('submit', submitFormProfile);

profileEditBtn.addEventListener('click', openPopupProfile)

popupProfileClosed.addEventListener('click', () => closePopup(popupProfile))

formAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderLoading(true, popupSaveAvatar);

  changeAvatar(avatarInput.value)
    .catch((err) => {
      console.log(err);
    })
    .finally(renderLoading(false, popupSaveAvatar))

  profileAvatar.src = avatarInput.value;

  formAvatar.reset();

  closePopup(popupAvatar);
});

avatarButton.addEventListener('click', () => openPopup(popupAvatar))

popupAvatarClosed.addEventListener('click', () => closePopup(popupAvatar))

// card's

formCards.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderLoading(true, popupSaveCards);

  addCardToServer({
    name: placeInput.value,
    link: linkInput.value
  })
  .then(res => {
    addCard({
      name: res.name,
      link: res.link,
      card_id: res._id,
      id: '9dd3254462498bd2b7f2ff31',
      card_likes: res.likes
    }, cardsList)
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(renderLoading(false, popupSaveCards))

  formCards.reset();
});

profileAddBtn.addEventListener('click', () => {
  openPopup(popupCards);
  resetValidation(popupCards, 'popup__btn_disabled');
});

popupCardsClosed.addEventListener('click', () => closePopup(popupCards));

popupSaveCards.addEventListener('click', () => closePopup(popupCards));

popupPhotoClosed.addEventListener('click', () => closePopup(popupPhoto));

// form's validation

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__error_visible'
});

getInitialProfile()
  .then((result) => {
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    profileAvatar.src = result.avatar;

  })
  .catch((err) => {
    console.log(err);
  });

getInitialCards()
  .then((result) => {
    showDefaultCards(result);
    showDefaultLikes(result);
  })
  .catch((err) => {
    console.log(err);
  });

