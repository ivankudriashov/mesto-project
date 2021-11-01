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
