import {api} from '../scripts/index.js'

export class Card{
  constructor(data, cardSelector, handleCardClick){
    this._cardSelector = cardSelector;
    this._data = data;
    this._handleCardClick = handleCardClick;
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

    elementImage.addEventListener('click', this._handleCardClick);
  }
}

