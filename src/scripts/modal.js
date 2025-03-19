const modalBasicConfig = {
  showPopup: "popup_is-opened",
  animatedPopup: "popup_is-animated",
};

// Функция открытия модального окна
function openPopup(popup) {
  popup.classList.add(modalBasicConfig.animatedPopup);
  setTimeout(() => {
      popup.classList.add(modalBasicConfig.showPopup);
  }, 0);
  document.addEventListener("keydown", closingPopupPressingEsc);
}

// Функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove(modalBasicConfig.showPopup);
  popup.addEventListener(
      "transitionend",
      () => {
          popup.classList.remove(modalBasicConfig.animatedPopup);
      },
      { once: true }
  );
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

export { openPopup, closePopup, initPopupCloseByOverlay, closingPopupPressingEsc };
