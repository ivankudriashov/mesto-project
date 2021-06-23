'use strict';

const profileEditBtn = document.querySelector('.profile__edit-btn'),
      popupProfile = document.querySelector('.popup'),
      profileEditBtnClosed = document.querySelector('.popup__close'),
      formElement = document.querySelector('.popup__form'),
      nameInput = formElement.querySelector('.popup__form input[name=name]'),
      jobInput = formElement.querySelector('.popup__form input[name=status]'),
      popupSave = formElement.querySelector('.popup__btn'),
      profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description'),
      cardsList = document.querySelector('.elements__list'),
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

profileEditBtn.addEventListener('click', () => {
    popupProfile.classList.add('popup_opened');
})

function closePopup(btn) {
  btn.addEventListener('click', () => {
    popupProfile.classList.remove('popup_opened');
  })
}

closePopup(profileEditBtnClosed);

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupSave);
}

formElement.addEventListener('submit', formSubmitHandler);

      //6 cards

function createCard(cardData) {
  cardsList.innerHTML = '';

  for (let i = 0; i < cardData.length; i++) {
    cardsList.insertAdjacentHTML("beforeend", `
      <li class="element">
        <img src="${cardData[i].link}" alt="фото" class="element__image">
        <div class="element__wrapper">
          <h2 class="element__title">${cardData[i].name}</h2>
          <button type="button" class="element__like-btn element__like-btn_active"></button>
        </div>
      </li>
    `);
  }
}

createCard(initialCards);
