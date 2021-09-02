/* 'use strict'; */

import '../pages/index.css';
import {enableValidation} from '../components/validate.js'
import {addCard, showDefaultCards} from '../components/card.js'
import {openPopupProfile, submitFormProfile} from '../components/modal.js'
import {openPopup, closePopup} from '../components/utils.js'



const profileEditBtn = document.querySelector('.profile__edit-btn'),

      popupProfile = document.querySelector('#popup_profile'),
      popupProfileClosed = popupProfile.querySelector('.popup__close'),
      formProfile = popupProfile.querySelector('.popup__form'),
      popupSaveProfile = popupProfile.querySelector('.popup__btn'),

      popup = document.querySelectorAll('.popup'),
      profileAddBtn = document.querySelector('.profile__add-btn'),
      popupCards = document.querySelector('#popup_cards'),
      popupCardsClosed = popupCards.querySelector('.popup__close'),
      formCards = popupCards.querySelector('.popup__form'),
      popupSaveCards = popupCards.querySelector('.popup__btn'),

      placeInput = document.querySelector('input[name=place_name]'),
      linkInput = document.querySelector('input[name=place_link]'),

      popupPhoto = document.querySelector('#popup_photo'),
      popupPhotoClosed = popupPhoto.querySelector('.popup__close'),

      cardsList = document.querySelector('.elements__list');

//profile's popup

formProfile.addEventListener('submit', submitFormProfile);

profileEditBtn.addEventListener('click', openPopupProfile)

popupProfileClosed.addEventListener('click', () => closePopup(popupProfile))

popupSaveProfile.addEventListener('click', () => closePopup(popupProfile))

//popup's alternative close

popup.forEach(item => {
  item.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup')) {
      closePopup(item);
    }
  })
})

popup.forEach(item => {
  document.addEventListener('keydown', (evt) => {
    if(evt.key == 'Escape') {
      closePopup(item);
    }
  })
})

// card's

formCards.addEventListener('submit', (evt) => {
  evt.preventDefault();

  addCard({
    name: placeInput.value,
    link: linkInput.value
  }, cardsList);

  formCards.reset();
});

profileAddBtn.addEventListener('click', () => openPopup(popupCards));

popupCardsClosed.addEventListener('click', () => closePopup(popupCards));

popupSaveCards.addEventListener('click', () => closePopup(popupCards));

popupPhotoClosed.addEventListener('click', () => closePopup(popupPhoto));

showDefaultCards();

// form's validation

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__error_visible'
});
