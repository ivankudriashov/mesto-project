/* function showErrorMessage(form, input, errorMessage, {inputErrorClass, errorClass}){
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

function hideErrorMessage(form, input, {inputErrorClass, errorClass}){
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
};

function isValid(form, input, {...rest}) {
  if(!input.validity.valid) {
    showErrorMessage(form, input, input.validationMessage, rest);
  } else {
    hideErrorMessage(form, input, rest);
  }
}

function setEventListeners( form, { inputSelector, submitButtonSelector, ...rest }) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const buttonElement = form.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, rest);

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      isValid(form, input, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  })
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
};

function toggleButtonState(inputList, buttonElement, {inactiveButtonClass}) {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

function resetValidation(card, inactiveButtonClass) {
  const saveBtn = card.querySelector('.popup__btn');

  saveBtn.classList.add(inactiveButtonClass);
}

function enableValidation( { formSelector, ...rest} ) {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    setEventListeners(form, rest);
  })
}; */

////////

export class FormValidator{
  constructor(data , formSelector){
    this._data = data;
    this._formSelector = formSelector;
  }

  _showErrorMessage(input, errorMessage){
    const errorElement = this._formSelector.querySelector(`.${input.id}-error`);

    input.classList.add(this._data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._data.errorClass);
  }

  _hideErrorMessage(input){
    const errorElement = this._formSelector.querySelector(`.${input.id}-error`);

    input.classList.remove(this._data.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._data.errorClass);
  }

  _isValid(input) {
    if(!input.validity.valid) {
      this._showErrorMessage(input, input.validationMessage);
    } else {
      this._hideErrorMessage(input);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonElement) {
    if(this._hasInvalidInput(inputList)){
      buttonElement.classList.add(this._data.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._data.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formSelector.querySelectorAll(this._data.inputSelector));
    const buttonElement = this._formSelector.querySelector(this._data.submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState(inputList, buttonElement);
      });
    })
  }

  enableValidation() {
    this._formSelector.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })

      this._setEventListeners();
  }
}
