// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(cardContent, onDelete) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');

cardTitle.textContent = cardContent.name;
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;

  deleteButton.addEventListener('click', () => {
    onDelete(cardElement);
  });

  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(cardElement) {
  if (cardElement.parentNode) {
    cardElement.parentNode.removeChild(cardElement);
  }
}
  
// @todo: Вывести карточки на страницу

initialCards.forEach((cardData) => {
  const newCard = createCard(cardData, deleteCard);
  placesList.append(newCard);
});
