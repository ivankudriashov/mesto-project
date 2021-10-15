import {openPopup} from './utils.js'
import {addLike, removeLike, deleteCard} from './api.js'

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
    if(evt.target.classList.contains('element__like-btn_active')){
      removeLike(cardData.card_id)
        .then(() => {
          evt.target.classList.remove('element__like-btn_active');
          cardLikeCounter.textContent = String(+cardLikeCounter.textContent - 1)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      addLike(cardData.card_id)
        .then(() => {
          evt.target.classList.add('element__like-btn_active');
          cardLikeCounter.textContent = String(+cardLikeCounter.textContent + 1)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  cardData.card_likes.forEach(item => {
    if(item._id == cardData.userId){
      cardLikeBtn.classList.add('element__like-btn_active');
    }
  })

  cardDeleteBtn.addEventListener('click', function() {
    deleteCard(cardData.card_id)
      .then(() => cardElement.remove())
      .catch((err) => {
        console.log(err);
      });
  });

  elementImage.addEventListener('click', () => {
    popupImage.setAttribute('src', cardData.link);
    popupImage.setAttribute('alt', cardData.name);
    popupCaption.textContent = cardData.name;
  });

  return cardElement
}

function addCard(cardData, cardContainer) {
  const card = createCard(cardData);

  cardContainer.prepend(card);

  if(!(cardData.id == cardData.userId)) {
    const cardDeleteBtn = document.querySelector('.element__delete-btn');
    cardDeleteBtn.remove();
  }
}

/* function removeCard(cardData, cardContainer) {
  const card = createCard(cardData);

  cardContainer.remove(card);
} */

function showDefaultLikes(cards) {
  const cardLikeCounter = document.querySelectorAll('.element__like-counter');

  cards.reverse();

  cards.forEach((item, i) => {
    cardLikeCounter.forEach(() => {
      cardLikeCounter[i].textContent = item.likes.length;
    })
  });
}

function showDefaultCards(cards, isUserId) {
  cards.reverse();

  cards.forEach((item) => {
    addCard({
      name: item.name,
      link: item.link,
      id: item.owner._id,
      card_id: item._id,
      card_likes: item.likes,
      userId: isUserId
    }, cardsList);
  });
}

export {addCard, /* removeCard, */ showDefaultCards, showDefaultLikes}
