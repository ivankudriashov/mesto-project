'use strict';

import '../pages/index.css';
/* import {enableValidation, resetValidation} from '../components/validate.js' */
import {FormValidator} from '../components/validate.js'
import {addCard, showDefaultCards, showDefaultLikes} from '../components/card.js'
import {openPopupProfile, submitFormProfile} from '../components/modal.js'
/* import {getInitialProfile, getInitialCards, changeAvatar, addCardToServer} from '../components/api.js' */
import {Api} from '../components/api.js'
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

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-1',
  headers: {
    authorization: 'f04d3593-eb68-4f0d-80f9-8a27e4ddd7b0',
    'Content-Type': 'application/json'
  }
});

//profile's popup

formProfile.addEventListener('submit', submitFormProfile);

profileEditBtn.addEventListener('click', openPopupProfile)

popupProfileClosed.addEventListener('click', () => closePopup(popupProfile))

formAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderLoading(true, popupSaveAvatar);

  api.changeAvatar(avatarInput.value)
    .then(() => {
      profileAvatar.src = avatarInput.value;
      formAvatar.reset();
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
      closePopup(popupAvatar);
    })
    .finally(() => renderLoading(false, popupSaveAvatar))
});

avatarButton.addEventListener('click', () => openPopup(popupAvatar))

popupAvatarClosed.addEventListener('click', () => closePopup(popupAvatar))

// card's

formCards.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderLoading(true, popupSaveCards);

  api.addCardToServer({
    name: placeInput.value,
    link: linkInput.value
  })
  .then(res => {
    addCard({
      name: res.name,
      link: res.link,
      card_id: res._id,
      userId: res.owner._id,
      id: res.owner._id,
      card_likes: res.likes
    }, cardsList)
    formCards.reset();
    closePopup(popupCards)
  })
  .catch((err) => {
    console.log(err);
    closePopup(popupCards)
  })
  .finally(() => renderLoading(false, popupSaveCards))
});

profileAddBtn.addEventListener('click', () => {
  openPopup(popupCards);
  /* resetValidation(popupCards, 'popup__btn_disabled'); */
});

popupCardsClosed.addEventListener('click', () => closePopup(popupCards));

popupPhotoClosed.addEventListener('click', () => closePopup(popupPhoto));

// form's validation

const formProfileValidation = new FormValidator({
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__error_visible'
}, formProfile);

const formCardValidation = new FormValidator({
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__error_visible'
}, formCards);

const formAvatarValidation = new FormValidator({
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__error_visible'
}, formAvatar);

formProfileValidation.enableValidation();

formCardValidation.enableValidation();

formAvatarValidation.enableValidation();

/* enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__error_visible'
}); */

Promise.all([
  api.getInitialProfile(),
  api.getInitialCards()
])
  .then(([data, cards]) =>{
    const isUserId = data._id;

    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    profileAvatar.src = data.avatar;

    showDefaultCards(cards, isUserId);
    showDefaultLikes(cards);
  })
  .catch((err)=>{
    console.log(err);
  })
