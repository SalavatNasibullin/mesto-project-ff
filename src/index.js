import { createCard, deleteCard } from '../src/scripts/card.js';
import { initialCards } from '../src/scripts/cards.js';
import { openPopup, closePopup, initPopupCloseByOverlay } from '../src/scripts/modal.js';
import './pages/index.css';

// Конфигурация
const basicConfig = {
  cardList: ".places__list",
  showElement: "popup_is-opened",
  buttonClose: ".popup__close",
  windowEditProfile: ".popup_type_edit",
  onPageUserName: ".profile__title",
  onPageUserDescription: ".profile__description",
  userProfileEditButton: ".profile__edit-button",
  formEditProfile: "edit-profile",
  createNewCardButton: ".profile__add-button",
  windowNewCard: ".popup_type_new-card",
  windowImage: ".popup_type_image",
  formImageTitle: ".popup__caption",
  formImageLink: ".popup__image",
};

// ================================ Модалка увеличение картинки =============================
const popupImageForm = document.querySelector(basicConfig.windowImage);
const popupImageFormCloseButton = popupImageForm.querySelector(basicConfig.buttonClose);
const popupImageTitle = popupImageForm.querySelector(basicConfig.formImageTitle);
const popupImageLink = popupImageForm.querySelector(basicConfig.formImageLink);

// Закрытие окна по оверлею
initPopupCloseByOverlay(popupImageForm);

// Закрытие окна по крестику
popupImageFormCloseButton.addEventListener("click", function () {
  closePopup(popupImageForm);
});

// Функция для открытия модального окна с увеличенной картинкой
function openModalWithImage(cardData) {
  popupImageTitle.textContent = cardData.name;
  popupImageLink.src = cardData.link;
  popupImageLink.alt = cardData.name;
  openPopup(popupImageForm);
}

// ================================ Модалка редактирования профиля ==========================
const popupEditProfile = document.querySelector(basicConfig.windowEditProfile);
const popupEditProfileCloseButton = popupEditProfile.querySelector(basicConfig.buttonClose);

// Закрытие окна по оверлею
initPopupCloseByOverlay(popupEditProfile);

// Закрытие окна по крестику
popupEditProfileCloseButton.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

// Открытие модального окна редактирования профиля
const profileEditButton = document.querySelector(basicConfig.userProfileEditButton);
if (profileEditButton) {
  profileEditButton.addEventListener('click', () => {
    // Заполняем поля формы текущими значениями
    const userNameElement = document.querySelector(basicConfig.onPageUserName);
    const userJobElement = document.querySelector(basicConfig.onPageUserDescription);
    nameInput.value = userNameElement.textContent;
    jobInput.value = userJobElement.textContent;
    openPopup(popupEditProfile);
  });
} else {
  console.error('Кнопка редактирования профиля не найдена!');
}

// Находим форму в DOM
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');

// Находим поля формы в DOM
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');

function handleFormSubmit(profileFormSubmitEvent) {
  profileFormSubmitEvent.preventDefault();

  // Получите значение полей jobInput и nameInput из свойства value
  const newName = nameInput.value;
  const newJob = jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  const userNameElement = document.querySelector(basicConfig.onPageUserName);
  const userJobElement = document.querySelector(basicConfig.onPageUserDescription);

  // Вставьте новые значения с помощью textContent
  userNameElement.textContent = newName;
  userJobElement.textContent = newJob;

  // Закрываем модальное окно после отправки формы
  closePopup(popupEditProfile);
}

// Прикрепляем обработчик к форме:
editProfileForm.addEventListener('submit', handleFormSubmit);

// ================================ Модалка добавления новой карточки =======================
const popupNewCard = document.querySelector(basicConfig.windowNewCard);
const popupNewCardCloseButton = popupNewCard.querySelector(basicConfig.buttonClose);

// Закрытие окна по оверлею
initPopupCloseByOverlay(popupNewCard);

// Закрытие окна по крестику
popupNewCardCloseButton.addEventListener("click", function () {
  closePopup(popupNewCard);
});

// Открытие модального окна добавления новой карточки
const newCardButton = document.querySelector(basicConfig.createNewCardButton);
if (newCardButton) {
  newCardButton.addEventListener('click', () => {
    openPopup(popupNewCard);
  });
} else {
  console.error('Кнопка добавления новой карточки не найдена!');
}

// Находим форму для добавления новой карточки
const newCardFormElement = document.querySelector('.popup__form[name="new-place"]');
const placeNameInput = newCardFormElement.querySelector('.popup__input_type_card-name');
const placeLinkInput = newCardFormElement.querySelector('.popup__input_type_url');

// Обработчик «отправки» формы для добавления новой карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартную отправку формы

  // Получаем значения полей
  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;

  // Создание новой карточки
  const newCardData = {
    name: placeName,
    link: placeLink
  };

  const newCard = createCard(newCardData, deleteCard, openModalWithImage, handleLikeClick);

  // Добавляем новую карточку в начало контейнера
  const placesList = document.querySelector(basicConfig.cardList);
  placesList.prepend(newCard);

  // Закрываем модальное окно после добавления карточки
  closePopup(popupNewCard);

  newCardFormElement.reset();
}

// Обработчик к форме для добавления новой карточки
newCardFormElement.addEventListener('submit', handleNewCardFormSubmit);

// Обработка лайка 
function handleLikeClick(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle("card__like-button_is-active");
}

function renderCards(cardsList, onDelete, handleImageClick, handleLikeClick) {
  const placesList = document.querySelector(basicConfig.cardList);
  placesList.innerHTML = "";

  // Отрисовка карточки
  cardsList.forEach((item) => {
    const newCard = createCard(item, onDelete, handleImageClick, handleLikeClick);
    placesList.append(newCard);
  });
}

// Рендер начальных карточек
renderCards(initialCards, deleteCard, openModalWithImage, handleLikeClick);