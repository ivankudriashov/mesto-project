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

      cardsList = document.querySelector('.elements__list');

//profile's popup

formProfile.addEventListener('submit', submitFormProfile);

profileEditBtn.addEventListener('click', openPopupProfile)

popupProfileClosed.addEventListener('click', () => closePopup(popupProfile))

// card's

formCards.addEventListener('submit', (evt) => {
  evt.preventDefault();

  addCard({
    name: placeInput.value,
    link: linkInput.value,
    id: '9dd3254462498bd2b7f2ff31'
  }, cardsList);

  addCardToServer({
    name: placeInput.value,
    link: linkInput.value
  });

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


const profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description'),
      profileAvatar = document.querySelector('.profile__avatar');



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

fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers
  })
  .then(res => {
    if(res.ok){
      return res.json()
    }
    return Promise.reject(res.status)
  })
  .then((result) => {
    renderName(result.name);
    renderDescription(result.about);
    renderAvatar(result.avatar);
  });

function getCardsFromServer() {
  fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result)
    showDefaultCards(result);
    showDefaultLikes(result);

    const cardDeleteBtn = document.querySelector('.element__delete-btn');
    cardDeleteBtn.addEventListener('click', () => {
      deleteCard(result);
    })
    console.log(result._id)
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

function deleteCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    res.json()
  })
  .then((data) => {
    console.log(data)
  })
}


