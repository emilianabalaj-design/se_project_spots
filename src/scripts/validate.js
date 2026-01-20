
const showInputError = (formEl, inputEl, errorMsg) => {
const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
if (!errorMsgEl) return;

errorMsgEl.textContent = errorMsg;   
inputEl.classList.add("modal__input_type_error");
};


const hideInputError = (formEl, inputEl) => {
const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
if (!errorMsgEl) return;

errorMsgEl.textContent = "";
inputEl.classList.remove("modal__input_type_error");
};


const checkInputValidity = (formEl, inputEl) => {
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

const resetValidation = (formEl, inputList) => {
    inputList.forEach((inputEl) => {
        hideInputError(formEl, inputEl);
    });

    const submitButton = formEl.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, submitButton, config);
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


export const enableValidation = (config) => {
const formList = (document.querySelectorAll(config.formSelector));
formList.forEach((formEl) => {
setEventListeners(formEl, config);
});
};

