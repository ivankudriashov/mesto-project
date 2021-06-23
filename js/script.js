'use strict';

const profileEditBtn = document.querySelector('.profile__edit-btn'),
      popupProfile = document.querySelector('.popup'),
      profileEditBtnClosed = document.querySelector('.popup__close'),
      formElement = document.querySelector('.popup__form'),
      nameInput = formElement.querySelector('.popup__form input[name=name]'),
      jobInput = formElement.querySelector('.popup__form input[name=status]'),
      popupSave = formElement.querySelector('.popup__btn'),
      profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description');


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
