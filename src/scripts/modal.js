const modalBasicConfig = {
  showPopup: "popup_is-opened", // Класс для открытия попапа
  animatedPopup: "popup_is-animated", // Класс для анимации
};

// Функция открытия модального окна
function openPopup(popup) {
  popup.classList.add(modalBasicConfig.animatedPopup); // Добавляем класс для анимации
  setTimeout(() => {
    popup.classList.add(modalBasicConfig.showPopup); // Добавляем класс для видимости
  }, 0); // Небольшая задержка для начала анимации
  document.addEventListener("keydown", closingPopupPressingEsc);
}

// Функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove(modalBasicConfig.showPopup); // Убираем класс для видимости
  popup.addEventListener("transitionend", () => {
    popup.classList.remove(modalBasicConfig.animatedPopup); // Убираем класс для анимации после завершения
  }, { once: true }); // Обработчик сработает только один раз
  document.removeEventListener("keydown", closingPopupPressingEsc);
}

// Функция для инициализации закрытия попапа по клику на оверлей
function initPopupCloseByOverlay(popup) {
  popup.addEventListener("click", function (e) {
    if (e.target.classList.contains(modalBasicConfig.showPopup)) {
      closePopup(popup);
    }
  });
}

// Функция-обработчик события нажатия Esc
function closingPopupPressingEsc(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector("." + modalBasicConfig.showPopup);
    if (popup) {
      closePopup(popup);
    }
  }
}

// Кнопка для создания карточек «+»
const addCardButton = document.querySelector(".add-card-button");
const addCardPopup = document.querySelector(".popup");

if (addCardButton && addCardPopup) {
  addCardButton.addEventListener("click", () => {
    openPopup(addCardPopup);
  });

  // Инициализация закрытия попапа по клику на оверлей
  initPopupCloseByOverlay(addCardPopup);
}

export { openPopup, closePopup, initPopupCloseByOverlay, closingPopupPressingEsc };