export function createCard(cardContent, onDelete, handleImageClick, handleLikeClick, userId) {
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
  cardTitle.textContent = cardContent.name;
  cardImage.src = cardContent.link;
  cardImage.alt = `Фотография ${cardContent.name}`;

  // Отображение количества лайков
  likeCountElement.textContent = cardContent.likes.length;

  // Проверка, лайкнул ли текущий пользователь карточку
  if (cardContent.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Обработчик удаления карточки
  if (cardContent.owner._id === userId) {
    deleteButton.addEventListener("click", () => onDelete(cardContent._id, cardElement));
  } else {
    deleteButton.remove(); // Скрываем кнопку удаления, если карточка не принадлежит пользователю
  }

  // Обработчик клика на изображение
  cardImage.addEventListener("click", () => {
    if (handleImageClick) handleImageClick(cardContent);
  });

  // Обработчик лайка
  likeButton.addEventListener("click", () => {
    if (handleLikeClick) handleLikeClick(cardContent._id, likeButton, likeCountElement);
  });

  return cardElement;
}

export function deleteCard(cardId, cardElement) {
  // Удаление карточки из DOM
  cardElement.remove();
}