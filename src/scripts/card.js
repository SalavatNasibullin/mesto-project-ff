export function createCard(cardContent, onDelete, handleImageClick) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button"); // Добавлена кнопка лайка

  // Заполнение данных
  cardTitle.textContent = cardContent.name;
  cardImage.src = cardContent.link;
  cardImage.alt = `Фотография ${cardContent.name}`; // Улучшен alt

  // Обработчики событий
  deleteButton.addEventListener("click", () => onDelete(cardElement));

  // Добавлен обработчик клика на изображение
  cardImage.addEventListener("click", () => {
    if (handleImageClick) handleImageClick(cardContent);
  });

  // Добавлен обработчик лайка
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function renderCards(initialCards, onDelete, handleImageClick) {
  const placesList = document.querySelector(".places__list");

  // Очистка контейнера перед рендером (если нужно)
  placesList.innerHTML = "";

  initialCards.forEach((item) => {
    const newCard = createCard(
      item,
      onDelete,
      handleImageClick // Передаем обработчик в createCard
    );
    placesList.append(newCard);
  });
}
