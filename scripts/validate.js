const settings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass:".modal__submit-btn_disabled",
    inputErrorClass: "modal__input_type_error"
};

const showInputError = (formEl, inputEl, errorMsg) => {
const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
if (!errorMsgEl) return;

errorMsgEl.textContent = errorMsg;   
inputEl.classList.add(config.inputErrorClass);
};


const hideInputError = (formEl, inputEl, config) => {
const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
if (!errorMsgEl) return;

errorMsgEl.textContent = "";
inputEl.classList.remove(config.inputErrorClass);
};


const checkInputValidity = (formEl, inputEl, config) => {
    console.log(inputEl.validationMessage);
    if (!inputEl.validity.valid) {
        showInputError(formEl, inputEl, inputEl.validationMessage);
    } else {
        hideInputError(formEl, inputEl);
    }
};

const hasInvalidInput = (inputList) => { 
    return inputList.some((inputEl) => {
        return !inputEl.validity.valid;
    });
};



const toggleButtonState = (inputList, submitButton, config) => {
 if (hasInvalidInput(inputList)) {
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass);
 } else {
    submitButton.disabled = false;
    submitButton.classList.remove(config.inactiveButtonClass);
 };
};




const disableSubmitButton = (submitButton, config) => {
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass);
};

const resetValidation = (formEl, inputList, config) => {
    inputList.forEach((inputEl) => {
        hideInputError(formEl, inputEl, config);
    });

    disableSubmitButton(submitButton, config);
};



const setEventListeners = (formEl, config) => {
const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
const submitButton = formEl.querySelector(config.submitButtonSelector);


toggleButtonState(inputList, submitButton, config);


inputList.forEach((inputEl) => {
  inputEl.addEventListener("input", () => {
   checkInputValidity(formEl, inputEl);
    toggleButtonState(inputList, submitButton, config);
    });
  });
};


const enableValidation = (config) => {
const formList = (document.querySelectorAll(config.formSelector));
formList.forEach((formEl) => {
setEventListeners(formEl, config);
});
};

export { enableValidation, resetValidation, settings };
<<<<<<< HEAD:src/scripts/validate.js

=======
>>>>>>> 54f206b (Fix validation paths and restore cards rendering):scripts/validate.js
