'use strict';

import '../pages/index.css';
import {FormValidator} from '../components/validate.js'
import { Card } from '../components/card.js'
import { Section } from '../components/section.js'
import {openPopupProfile, submitFormProfile} from '../components/modal.js'
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
    const card = new Card({
      name: res.name,
      link: res.link,
      card_id: res._id,
      userId: res.owner._id,
      id: res.owner._id,
      card_likes: res.likes
    } , '#card-template');

    cardsList.prepend(card.generate());
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

Promise.all([
  api.getInitialProfile(),
  api.getInitialCards()
])
  .then(([userData, cards]) =>{
    const isUserId = userData._id;

    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;

    const defaultCards = new Section({
      data: cards,
      renderer: (item) => {
        const card = new Card({
          name: item.name,
          link: item.link,
          id: item.owner._id,
          card_id: item._id,
          card_likes: item.likes,
          userId: isUserId
        }, '#card-template');

        const cardElement = card.generate();
        defaultCards.setItem(cardElement);

        if(!(item.owner._id == isUserId)) {
          const cardDeleteBtn = document.querySelector('.element__delete-btn');
          cardDeleteBtn.remove();
        }

        const cardLikeCounter = document.querySelector('.element__like-counter');

        cardLikeCounter.textContent = item.likes.length;
      }
    }, '.elements__list');

    defaultCards.renderDefaultItems();
  })
  .catch((err)=>{
    console.log(err);
  })
