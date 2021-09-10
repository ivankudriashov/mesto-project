/* 'use strict'; */

import '../pages/index.css';
import {enableValidation, resetValidation} from '../components/validate.js'
import {addCard, showDefaultCards, showDefaultLikes} from '../components/card.js'
import {openPopupProfile, submitFormProfile} from '../components/modal.js'
import {openPopup, closePopup} from '../components/utils.js'



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

      avatarInput = document.querySelector('input[name=avatar_link]');

const profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description'),
      profileAvatar = document.querySelector('.profile__avatar');

//profile's popup

formProfile.addEventListener('submit', submitFormProfile);

profileEditBtn.addEventListener('click', openPopupProfile)

popupProfileClosed.addEventListener('click', () => closePopup(popupProfile))


formAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();

  changeAvatar(avatarInput.value)

  profileAvatar.src = avatarInput.value;

  formAvatar.reset();

  closePopup(popupAvatar);
});

avatarButton.addEventListener('click', () => openPopup(popupAvatar))

popupAvatarClosed.addEventListener('click', () => closePopup(popupAvatar))





// card's

formCards.addEventListener('submit', (evt) => {
  evt.preventDefault();

  addCardToServer({
    name: placeInput.value,
    link: linkInput.value
  })
  .then(res => res.json())
  .then(res => {
    addCard({
      name: res.name,
      link: res.link,
      card_id: res._id,
      id: '9dd3254462498bd2b7f2ff31',
      card_likes: res.likes
    }, cardsList)
  })

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


// fetch




const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-1',
  headers: {
    authorization: 'f04d3593-eb68-4f0d-80f9-8a27e4ddd7b0',
    'Content-Type': 'application/json'
  }
}

function renderName(name) {
  profileName.textContent = name;
}

function renderDescription(description) {
  profileDescription.textContent = description;
}

function renderAvatar(img) {
  profileAvatar.src = img;
}

const getData =  () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
    })
    .then(res => {
      if(res.ok){
        return res.json()
      }
      return Promise.reject(res.status)
    })
}

const getCardsData = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => res.json())
}



getData().then((result) => {
    renderName(result.name);
    renderDescription(result.about);
    renderAvatar(result.avatar);
  });

export function getCardsFromServer() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => res.json())
  .then((result) => {

    /* result.forEach(item => {
      item.likes.forEach(item => {
        console.log(item._id);
      })
    }) */

    showDefaultCards(result);
    showDefaultLikes(result);
  });
}

getCardsFromServer();

export function changeProfile(name, description) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description
    })
  });
}

function changeAvatar(avatar) {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
}



function addCardToServer(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  });
}


fetch(`${config.baseUrl}/cards`, {
  headers: config.headers
})
.then(res => res.json())
.then(res => {
  res.forEach(item => {
    /* console.log(item) */
  })
})

