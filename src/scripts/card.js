export function createCard(cardData, handleImageClick, handleLikeClick, openDeleteCardPopup, userId) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCountElement = cardElement.querySelector(".card__like-count");

  // Заполнение данных
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Отображение количества лайков
  likeCountElement.textContent = cardData.likes.length;

  // Проверка, лайкнул ли текущий пользователь карточку
  if (cardData.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Обработчик удаления карточки
  if (deleteButton) {
    if (cardData.owner._id !== userId) {
      deleteButton.remove();
    } else {
      deleteButton.addEventListener("click", () => openDeleteCardPopup(cardData._id, cardElement));
    }
  }
  // Обработчик клика на изображение
  cardImage.addEventListener("click", () => handleImageClick(cardData));

  // Обработчик лайка
  likeButton.addEventListener("click", () => handleLikeClick(cardData._id, likeButton, likeCountElement));

  return cardElement;
}

export function deleteCard(cardId, cardElement) {
  // Удаление карточки из DOM
  cardElement.remove();
}