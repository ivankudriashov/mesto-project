'use strict';

const profileEditBtn = document.querySelector('.profile__edit-btn'),
      popupProfile = document.querySelector('#popup_profile'),
      popupProfileClosed = popupProfile.querySelector('.popup__close'),
      formProfile = popupProfile.querySelector('.popup__form'),
      popupSaveProfile = popupProfile.querySelector('.popup__btn'),

      nameInput = document.querySelector('input[name=name]'),
      jobInput = document.querySelector('input[name=status]'),
      profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description'),

      profileAddBtn = document.querySelector('.profile__add-btn'),
      popupCards = document.querySelector('#popup_cards'),
      popupCardsClosed = popupCards.querySelector('.popup__close'),
      formCards = popupCards.querySelector('.popup__form'),
      popupSaveCards = popupCards.querySelector('.popup__btn'),

      placeInput = document.querySelector('input[name=place_name]'),
      linkInput = document.querySelector('input[name=place_link]'),

      popupPhoto = document.querySelector('#popup_photo'),
      popupPhotoClosed = popupPhoto.querySelector('.popup__close'),
      popupImage = popupPhoto.querySelector('.popup__image'),
      popupCaption = popupPhoto.querySelector('.popup__caption'),

      cardsList = document.querySelector('.elements__list');

//profile's popup

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
      openPopup(popupProfile)
}

function submitFormProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

formProfile.addEventListener('submit', submitFormProfile);

profileEditBtn.addEventListener('click', openPopupProfile)

popupProfileClosed.addEventListener('click', () => closePopup(popupProfile))

popupSaveProfile.addEventListener('click', () => closePopup(popupProfile))

// card's popup

function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content,
        cardElement = cardTemplate.querySelector('.element').cloneNode(true),
        elementImage = cardElement.querySelector('.element__image'),
        elementTitle = cardElement.querySelector('.element__title'),
        cardLikeBtn = cardElement.querySelector('.element__like-btn'),
        cardDeleteBtn = cardElement.querySelector('.element__delete-btn');

  elementImage.addEventListener('click', () => openPopup(popupPhoto));

  elementTitle.textContent = cardData.name;
  elementImage.setAttribute('src', cardData.link);
  elementImage.setAttribute('alt', cardData.name);

  cardLikeBtn.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-btn_active');
  });

  cardDeleteBtn.addEventListener('click', function() {
    cardElement.remove();
  });

  elementImage.addEventListener('click', () => {
    popupImage.setAttribute('src', cardData.link);
    popupImage.setAttribute('alt', cardData.name);
    popupCaption.textContent = cardData.name;
  }) ;

  return cardElement
}

function addCard(cardData, cardContainer) {
  const card = createCard(cardData);

  cardContainer.prepend(card);
}

function showDefaultCards() {
  initialCards.reverse();

  initialCards.forEach ((item) => {
    addCard(item, cardsList);
  });
}

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
