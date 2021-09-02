import {initialCards} from './initial-сards.js'
import {openPopup} from './utils.js'

const popupImage = document.querySelector('.popup__image'),
      popupCaption = document.querySelector('.popup__caption'),
      cardsList = document.querySelector('.elements__list'),
      popupPhoto = document.querySelector('#popup_photo');

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

export {addCard, showDefaultCards}
