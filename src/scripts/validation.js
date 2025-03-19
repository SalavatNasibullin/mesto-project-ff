// Функция для отображения ошибки
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Функция для скрытия ошибки
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
};

// Функция для проверки валидности поля
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
      hideInputError(formElement, inputElement, config);
  }
};

// Функция для переключения состояния кнопки
const toggleButtonState = (inputList, buttonElement, config) => {
  const hasInvalidInput = !inputList.every((inputElement) => inputElement.validity.valid);
  if (hasInvalidInput) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
  } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
  }
};

// Функция для установки обработчиков событий
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
          checkInputValidity(formElement, inputElement, config);
          toggleButtonState(inputList, buttonElement, config);
      });
  });
};

// Функция для включения валидации всех форм
export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
      setEventListeners(formElement, config);
  });
};

// Функция для очистки ошибок валидации
export const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, config);
  });

  toggleButtonState(inputList, buttonElement, config);
};
