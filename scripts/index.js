'use strict';

const profileEditBtn = document.querySelector('.profile__edit-btn'),
      popupProfile = document.querySelector('#popup_profile'),
      popupProfileClosed = popupProfile.querySelector('.popup__close'),
      formProfile = popupProfile.querySelector('.popup__form'),
      popupSaveProfile = popupProfile.querySelector('.popup__btn'),

      profileAddBtn = document.querySelector('.profile__add-btn'),
      popupCards = document.querySelector('#popup_cards'),
      popupCardsClosed = popupCards.querySelector('.popup__close'),
      formCards = popupCards.querySelector('.popup__form'),
      popupSaveCards = popupCards.querySelector('.popup__btn'),


      cardsList = document.querySelector('.elements__list'),
      placeInput = document.querySelector('input[name=place_name]'),
      linkInput = document.querySelector('input[name=place_link]'),

      initialCards = [
        {
          name: 'Архыз',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
          name: 'Челябинская область',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
          name: 'Иваново',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
          name: 'Камчатка',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
          name: 'Холмогорский район',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
          name: 'Байкал',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
      ];



//profile's popup

function openPopup(btn, popup) {
  btn.addEventListener('click', () => {
    popup.classList.add('popup_opened');
  })
}

openPopup(profileEditBtn, popupProfile);

function closePopup(btn, popup) {
  btn.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
  })
}

closePopup(popupProfileClosed, popupProfile);

function formSubmitHandler(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector('input[name=name]'),
        jobInput = document.querySelector('input[name=status]'),
        profileName = document.querySelector('.profile__name'),
        profileDescription = document.querySelector('.profile__description');

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

formProfile.addEventListener('submit', formSubmitHandler);

closePopup(popupSaveProfile, popupProfile);

// card's popup

openPopup(profileAddBtn, popupCards);

closePopup(popupCardsClosed, popupCards);

function createCard(title, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__title').textContent = title;
  cardElement.querySelector('.element__image').setAttribute('src', link);

  cardElement.querySelector('.element__like-btn').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-btn_active');
  });

  cardElement.querySelector('.element__delete-btn').addEventListener('click', function() {
    cardElement.remove();
  });

  return cardElement
}

function addCard(title, link, cardContainer) {
  const a = createCard(title, link);

  cardContainer.prepend(a);
}

cardsList.innerHTML = '';

initialCards.reverse();

const cardContainer = cardsList;

initialCards.forEach ((item) => {
  const title = item.name;
  const link = item.link;

  addCard(title, link, cardContainer);
});

formCards.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const title = placeInput.value;
  const link = linkInput.value;

  addCard(title, link, cardContainer);

  placeInput.value = '';
  linkInput.value = '';
});

closePopup(popupSaveCards, popupCards);

