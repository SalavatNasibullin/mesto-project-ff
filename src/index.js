import { createCard, renderCards, deleteCard } from '../src/scripts/card.js';
import { initialCards } from '../src/scripts/cards.js';
import avatarImage from './images/avatar.jpg';
import { openPopup, closePopup, popupCloseByOverlay } from '../src/scripts/modal.js';
import './pages/index.css';

// Установка аватара
const profileImageDiv = document.querySelector('.profile__image');
if (profileImageDiv) {
  profileImageDiv.style.backgroundImage = `url(${avatarImage})`;
} else {
  console.error('Элемент .profile__image не найден');
}

// Рендер начальных карточек
try {
  renderCards(initialCards, deleteCard, openModalWithImage);
} catch (error) {
  console.error('Ошибка при рендеринге карточек:', error);
}

// Экспортируем activePopup
let activePopup;

// Функция для инициализации модального окна
function initializeModal() {
  const modalElement = document.querySelector('.popup');
  if (!modalElement) {
    console.error('Модальное окно не найдено!');
    return;
  }

  activePopup = modalElement;

  // Открытие модального окна
  const openModalButton = document.querySelector('.profile__add-button');
  if (openModalButton) {
    openModalButton.addEventListener('click', () => {
      openPopup(document.querySelector('.popup_type_new-card'));
    });
  } else {
    console.error('Кнопка для открытия модального окна не найдена!');
  }

  // Закрытие модального окна
  const closeModalButton = modalElement.querySelector('.popup__close');
  if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
      closePopup(modalElement);
    });
  } else {
    console.error('Кнопка закрытия модального окна не найдена!');
  }
}

// Вызываем инициализацию модального окна после загрузки DOM
document.addEventListener('DOMContentLoaded', initializeModal);

// Экспортируем activePopup
export { activePopup };

// Конфигурация
const basicConfig = {
  cardList: ".places__list",
  showElement: "popup_is-opened",
  buttonClose: ".popup__close",
  windowAnimated: "popup_is-animated",
  windowEditProfile: ".popup_type_edit",
  onPageUserName: ".profile__title",
  onPageUserDescription: ".profile__description",
  userProfileEditButton: ".profile__edit-button",
  formEditProfile: "edit-profile",
  // ======================== Создание новой карточки
  createNewCardButton: ".profile__add-button",
  windowNewCard: ".popup_type_new-card",
  counterLike: ".card__like-count",

  // ======================== Удаление карточки
  onPageUserAvatar: ".profile__image",
  windowDelete: ".popup_type_confirmation_delete",
  confirmationDeleteButton: ".popup__confirmation-button",

  // ======================== Редактирование карточки профиля
  windowAvatar: ".popup_type_avatar-card",
  formAvatarProfile: "new-avatar",

  // ======================== Увеличенное изображение
  windowImage: ".popup_type_image",
  formImageTitle: ".popup__caption",
  formImageLink: ".popup__image",  

  // ======================== Ошибки
  errorUpdateUserData: "Произошла ошибка при сохранении данных пользователя. ",
  errorUpdateUserAvatar: "Произошла ошибка при обновлении аватарки пользователя. ",
  errorNoUserAvatar: "./images/avatar.jpg",
  errorGetCards: "Данные с карточками не получены. ",
  errorDeleteCard: "При попытке удалить карточку, произошла ошибка. ",
  errorLikeCard: "Произошла ошибка при попытке Лайкнуть карту. ",
  errorDislikeCard: "Произошла ошибка при попытке снять Лайк с карты. ",
  // ======================== Сообщения на элементах
  messageButtonLoading: "Сохранение...",
  messageButtonDefault: "Сохранить",
};

// ================================ Модалка увеличение картинки =============================
const popupImageForm = document.querySelector(basicConfig.windowImage);
const popupImageFormCloseButton = popupImageForm.querySelector(basicConfig.buttonClose);
const popupImageTitle = popupImageForm.querySelector(basicConfig.formImageTitle);
const popupImageLink = popupImageForm.querySelector(basicConfig.formImageLink);

// Закрытие окна по оверлею
popupCloseByOverlay(popupImageForm);

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

// Находим все карточки
const cards = document.querySelectorAll('.card');

// Добавляем обработчик клика на каждую карточку
cards.forEach(card => {
  const cardImage = card.querySelector('img'); // Находим изображение внутри карточки
  if (cardImage) {
    cardImage.addEventListener('click', () => {
      const cardData = {
        name: card.querySelector('.card__title').textContent, // Название карточки
        link: cardImage.src // Ссылка на изображение
      };
      openModalWithImage(cardData); // Открываем модальное окно с увеличенной картинкой
    });
  }
});

// ================================ Модалка редактирования профиля ==========================
const popupEditProfile = document.querySelector(basicConfig.windowEditProfile);
const popupEditProfileCloseButton = popupEditProfile.querySelector(basicConfig.buttonClose);

// Закрытие окна по оверлею
popupCloseByOverlay(popupEditProfile);

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
const formElement = document.querySelector('.popup__form[name="edit-profile"]');

// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');


function handleFormSubmit(evt) {
  evt.preventDefault(); 

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
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

// Находим форму для добавления новой карточки
const newCardFormElement = document.querySelector('.popup__form[name="new-place"]');

// Находим поля формы для добавления новой карточки
const placeNameInput = newCardFormElement.querySelector('.popup__input_type_card-name');
const placeLinkInput = newCardFormElement.querySelector('.popup__input_type_url');

// Обработчик «отправки» формы для добавления новой карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартную отправку формы

  // Получаем значения полей
  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;

  // Создаем новую карточку
  const newCardData = {
    name: placeName,
    link: placeLink
  };

  const newCard = createCard(newCardData, deleteCard, openModalWithImage);

  // Добавляем новую карточку в начало контейнера
  const placesList = document.querySelector(basicConfig.cardList);
  placesList.prepend(newCard);

  // Закрываем модальное окно после добавления карточки
  closePopup(document.querySelector('.popup_type_new-card'));

  // Очищаем форму
  newCardFormElement.reset();
}

// Прикрепляем обработчик к форме для добавления новой карточки
newCardFormElement.addEventListener('submit', handleNewCardFormSubmit);

// ================================ Закрытие всех попапов по оверлею и крестику =============================
const popups = document.querySelectorAll('.popup');

popups.forEach(popup => {
  // Закрытие по оверлею
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });

  // Закрытие по крестику
  const closeButton = popup.querySelector('.popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      closePopup(popup);
    });
  }
});