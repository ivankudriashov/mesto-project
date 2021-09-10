import {openPopup} from './utils.js'
import {reloadSite, getCardsFromServer} from './../scripts/index.js'


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

  function addLike(cardId) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: 'f04d3593-eb68-4f0d-80f9-8a27e4ddd7b0',
        'Content-Type': 'application/json'
      }
    })
    .then(cardLikeCounter.textContent = String(+cardLikeCounter.textContent + 1))
  }

  function removeLike(cardId) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: 'f04d3593-eb68-4f0d-80f9-8a27e4ddd7b0',
        'Content-Type': 'application/json'
      }
    })
    .then(cardLikeCounter.textContent = String(+cardLikeCounter.textContent - 1))
  }

  cardLikeBtn.addEventListener('click', function(evt) {
    if(evt.target.classList.contains('element__like-btn_active')){
      evt.target.classList.remove('element__like-btn_active');
      removeLike(cardData.card_id);
    } else {
      evt.target.classList.add('element__like-btn_active');
      addLike(cardData.card_id);
    }
  });

  cardData.card_likes.forEach(item => {
    if(item._id == '9dd3254462498bd2b7f2ff31'){
      console.log(item._id);
      cardLikeBtn.classList.add('element__like-btn_active');
    }
  })

  function deleteCard(id) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: 'f04d3593-eb68-4f0d-80f9-8a27e4ddd7b0',
        'Content-Type': 'application/json'
      }
    })
  }

  cardDeleteBtn.addEventListener('click', function() {
    cardElement.remove();

    deleteCard(cardData.card_id);
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

  if(!(cardData.id == '9dd3254462498bd2b7f2ff31')) {
    const cardDeleteBtn = document.querySelector('.element__delete-btn');
    cardDeleteBtn.remove();
  }
}

function removeCard(cardData, cardContainer) {
  const card = createCard(cardData);

  cardContainer.remove(card);
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
      id: item.owner._id,
      card_id: item._id,
      card_likes: item.likes
    }, cardsList);

  });
}

export {addCard, removeCard, showDefaultCards, showDefaultLikes}
