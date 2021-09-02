
function showErrorMessage(form, input, errorMessage, {inputErrorClass, errorClass}){
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

function enableValidation( { formSelector, ...rest} ) {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    setEventListeners(form, rest);
  })
};

export { enableValidation };