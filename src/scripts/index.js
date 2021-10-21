'use strict';

import '../pages/index.css';
import { FormValidator } from '../components/validate.js'
import { Card } from '../components/card.js'
import { Section } from '../components/section.js'
import { Api } from '../components/api.js'
import { PopupWithForm } from '../components/popupWithForm.js'
import { PopupWithImage } from '../components/popupWithImage.js'
import { UserInfo } from '../components/userInfo.js'

const profileEditBtn = document.querySelector('.profile__edit-btn'),

      popupProfile = document.querySelector('#popup_profile'),
      formProfile = popupProfile.querySelector('.popup__form'),
      popupSaveProfile = popupProfile.querySelector('.popup__btn'),

      nameInput = document.querySelector('input[name=profile_name]'),
      jobInput = document.querySelector('input[name=profile_status]'),


      profileAddBtn = document.querySelector('.profile__add-btn'),

      popupCards = document.querySelector('#popup_cards'),
      formCards = popupCards.querySelector('.popup__form'),
      popupSaveCards = popupCards.querySelector('.popup__btn'),

      placeInput = document.querySelector('input[name=place_name]'),
      linkInput = document.querySelector('input[name=place_link]'),

      popupPhoto = document.querySelector('#popup_photo'),

      cardsList = document.querySelector('.elements__list'),

      avatarButton = document.querySelector('.profile__avatar-button'),
      popupAvatar = document.querySelector('#popup_avatar'),
      formAvatar = popupAvatar.querySelector('.popup__form'),
      popupSaveAvatar = popupAvatar.querySelector('.popup__btn'),

      avatarInput = document.querySelector('input[name=avatar_link]'),

      profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description'),
      profileAvatar = document.querySelector('.profile__avatar');


function renderLoading(isLoading, button){
  if(isLoading){
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = 'Сохранить'
  }
}

const input = function (data) {
  nameInput.value = data.name;
  jobInput.value = data.about;
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-1',
  headers: {
    authorization: 'f04d3593-eb68-4f0d-80f9-8a27e4ddd7b0',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo(profileName, profileDescription);

//image's popup

export const popupImg = new PopupWithImage(popupPhoto);

popupImg.setEventListeners();

//profile

const profilePopup = new PopupWithForm(popupProfile, () => {
  renderLoading(true, popupSaveProfile);

  api.changeProfile(nameInput.value, jobInput.value)
    .then((res) => {
      userInfo.setUserInfo(res);
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err);
      profilePopup.close();
    })
    .finally(() => renderLoading(false, popupSaveProfile));
})

profileEditBtn.addEventListener('click', () => {
  userInfo.getUserInfo(api.getInitialProfile.bind(api), input)

  profilePopup.open();
})

profilePopup.setEventListeners();

//avatar

const avatarPopup = new PopupWithForm(popupAvatar, () => {
  renderLoading(true, popupSaveAvatar);

  api.changeAvatar(avatarInput.value)
    .then(() => {
      profileAvatar.src = avatarInput.value;
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
      avatarPopup.close();
    })
    .finally(() => renderLoading(false, popupSaveAvatar));
});

avatarButton.addEventListener('click', () => {
  avatarPopup.open();
})

avatarPopup.setEventListeners();

// card's

const cardsPopup = new PopupWithForm(popupCards, () => {
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
      } , '#card-template',
      () => {
        popupImg.open(res)
      });

    cardsList.prepend(card.generate());
    cardsPopup.close();
  })
  .catch((err) => {
    console.log(err);
    cardsPopup.close();
  })
  .finally(() => renderLoading(false, popupSaveCards));
});

profileAddBtn.addEventListener('click', () => {
  cardsPopup.open();
})

cardsPopup.setEventListeners();

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

    userInfo.setUserInfo(userData);
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
        }, '#card-template', () => {
          popupImg.open(item);
        });

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
