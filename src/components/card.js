import {openPopup} from './utils.js'
import {countLikes} from './../scripts/index.js'


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
        cardDeleteBtn = cardElement.querySelector('.element__delete-btn'),
        cardLikeCounter = cardElement.querySelector('.element__like-counter');

  cardLikeCounter.textContent = '0';

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

  if(!(cardData.id == '9dd3254462498bd2b7f2ff31')) {
    const cardDeleteBtn = document.querySelector('.element__delete-btn');
    cardDeleteBtn.remove();
  }
}

function showDefaultLikes(cards) {
  const cardLikeCounter = document.querySelectorAll('.element__like-counter');

  cards.reverse();

  cards.forEach((item, i) => {
    cardLikeCounter.forEach(() => {
      cardLikeCounter[i].textContent = item.likes.length;
    })
  });
}

function showDefaultCards(cards) {
  cards.reverse();

  cards.forEach((item) => {
    addCard({
      name: item.name,
      link: item.link,
      id: item.owner._id
    }, cardsList);

  });
}

export {addCard, showDefaultCards, showDefaultLikes}
