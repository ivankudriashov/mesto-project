import {openPopup} from './utils.js'
/* import {addLike, removeLike, deleteCard} from './api.js' */
import {api} from '../scripts/index.js'

const popupImage = document.querySelector('.popup__image'),
      popupCaption = document.querySelector('.popup__caption'),
      cardsList = document.querySelector('.elements__list'),
      popupPhoto = document.querySelector('#popup_photo');



/*
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

  cardData.card_likes.forEach(item => {
    if(item._id == cardData.userId){
      cardLikeBtn.classList.add('element__like-btn_active');
    }
  })

  cardLikeBtn.addEventListener('click', function(evt) {
    if(evt.target.classList.contains('element__like-btn_active')){
      api.removeLike(cardData.card_id)
        .then(() => {
          evt.target.classList.remove('element__like-btn_active');
          cardLikeCounter.textContent = String(+cardLikeCounter.textContent - 1)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.addLike(cardData.card_id)
        .then(() => {
          evt.target.classList.add('element__like-btn_active');
          cardLikeCounter.textContent = String(+cardLikeCounter.textContent + 1)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  cardDeleteBtn.addEventListener('click', function() {
    api.deleteCard(cardData.card_id)
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
} */

class Card{
  constructor({ data }, cardSelector){
    this._cardSelector = cardSelector;
    this._data = data;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners(){
    const elementImage = this._element.querySelector('.element__image'),
          cardLikeBtn = this._element.querySelector('.element__like-btn'),
          cardDeleteBtn = this._element.querySelector('.element__delete-btn'),
          cardLikeCounter = this._element.querySelector('.element__like-counter');

    cardLikeBtn.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('element__like-btn_active')){
        api.removeLike(this._data.card_id)
          .then(() => {
            evt.target.classList.remove('element__like-btn_active');
            cardLikeCounter.textContent = String(+cardLikeCounter.textContent - 1)
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.addLike(this._data.card_id)
          .then(() => {
            evt.target.classList.add('element__like-btn_active');
            cardLikeCounter.textContent = String(+cardLikeCounter.textContent + 1)
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    cardDeleteBtn.addEventListener('click', () => {
      api.deleteCard(this._data.card_id)
        .then(() => this._element.remove())
        .catch((err) => {
          console.log(err);
        });
    });

    elementImage.addEventListener('click', () => {
      popupImage.setAttribute('src', this._data.link);
      popupImage.setAttribute('alt', this._data.name);
      popupCaption.textContent = this._data.name;
    });
  }

  generate() {
    this._element = this._getElement();

    const elementImage = this._element.querySelector('.element__image'),
          elementTitle = this._element.querySelector('.element__title'),
          cardLikeBtn = this._element.querySelector('.element__like-btn'),
          cardLikeCounter = this._element.querySelector('.element__like-counter');


    this._setEventListeners();

    cardLikeCounter.textContent = '0';

    elementImage.addEventListener('click', () => openPopup(popupPhoto));

    elementTitle.textContent = this._data.name;
    elementImage.setAttribute('src', this._data.link);
    elementImage.setAttribute('alt', this._data.name);

    this._data.card_likes.forEach(item => {
      if(item._id == this._data.userId){
        cardLikeBtn.classList.add('element__like-btn_active');
      }
    })

    return this._element;
  }
}



function addCard(data, cardContainer) {
  const card = new Card( {data} , '#card-template');

  cardContainer.prepend(card.generate());

  if(!(data.id == data.userId)) {
    const cardDeleteBtn = document.querySelector('.element__delete-btn');
    cardDeleteBtn.remove();
  }

}

/* function addCard(cardData, cardContainer) {
  const card = createCard(cardData);

  cardContainer.prepend(card);

  if(!(cardData.id == cardData.userId)) {
    const cardDeleteBtn = document.querySelector('.element__delete-btn');
    cardDeleteBtn.remove();
  }

  console.log(cardData.name);
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

export {addCard, showDefaultCards, showDefaultLikes}
