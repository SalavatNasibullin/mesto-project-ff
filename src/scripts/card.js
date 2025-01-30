export function createCard(cardContent, onDelete, handleImageClick, handleLikeClick) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  // Заполнение данных
  cardTitle.textContent = cardContent.name;
  cardImage.src = cardContent.link;
  cardImage.alt = `Фотография ${cardContent.name}`;

  // Обработчик удаления карточки
  deleteButton.addEventListener("click", () => onDelete(cardElement));

  // Обработчик клика на изображение
  cardImage.addEventListener("click", () => {
    if (handleImageClick) handleImageClick(cardContent);
  });

  // Обработчик лайка 
  likeButton.addEventListener("click", handleLikeClick);

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

