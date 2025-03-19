import { openPopup, closePopup, initPopupCloseByOverlay } from "../src/scripts/modal.js";
import { enableValidation, clearValidation } from "../src/scripts/validation.js";
import { getUserInfo, getCards, updateProfile, addCard, toggleLike, updateAvatar, deleteCard } from "../src/scripts/api.js";
import "./pages/index.css";

document.addEventListener("DOMContentLoaded", () => {
    const config = {
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

    const validationConfig = {
        formSelector: ".popup__form",
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__button",
        inactiveButtonClass: "popup__button_disabled",
        inputErrorClass: "popup__input_type_error",
        errorClass: "popup__error_visible",
    };

    // Модальное окно увеличения картинки
    const popupImageForm = document.querySelector(config.windowImage);
    const popupImageFormCloseButton = popupImageForm.querySelector(config.buttonClose);
    const popupImageTitle = popupImageForm.querySelector(config.formImageTitle);
    const popupImageLink = popupImageForm.querySelector(config.formImageLink);

    initPopupCloseByOverlay(popupImageForm);
    popupImageFormCloseButton.addEventListener("click", () => closePopup(popupImageForm));

    function openModalWithImage(cardData) {
        popupImageTitle.textContent = cardData.name;
        popupImageLink.src = cardData.link;
        popupImageLink.alt = cardData.name;
        openPopup(popupImageForm);
    }

    // Модальное редактирования профиля
    const popupEditProfile = document.querySelector(config.windowEditProfile);
    const popupEditProfileCloseButton = popupEditProfile.querySelector(config.buttonClose);
    const profileEditButton = document.querySelector(config.userProfileEditButton);
    const editProfileForm = document.forms[config.formEditProfile];
    const nameInput = editProfileForm.querySelector(".popup__input_type_name");
    const jobInput = editProfileForm.querySelector(".popup__input_type_description");

    initPopupCloseByOverlay(popupEditProfile);
    popupEditProfileCloseButton.addEventListener("click", () => closePopup(popupEditProfile));

    if (profileEditButton) {
        profileEditButton.addEventListener("click", () => {
            nameInput.value = document.querySelector(config.onPageUserName).textContent;
            jobInput.value = document.querySelector(config.onPageUserDescription).textContent;
            clearValidation(editProfileForm, validationConfig);
            openPopup(popupEditProfile);
        });
    } else {
        console.error("Кнопка редактирования профиля не найдена!");
    }

    // Модальное окно для добавления новой карточки
    const popupNewCard = document.querySelector(config.windowNewCard);
    const popupNewCardCloseButton = popupNewCard.querySelector(config.buttonClose);
    const newCardButton = document.querySelector(config.createNewCardButton);
    const newCardFormElement = document.forms["new-place"];
    const placeNameInput = newCardFormElement.querySelector(".popup__input_type_card-name");
    const placeLinkInput = newCardFormElement.querySelector(".popup__input_type_url");

    initPopupCloseByOverlay(popupNewCard);
    popupNewCardCloseButton.addEventListener("click", () => closePopup(popupNewCard));

    if (newCardButton) {
        newCardButton.addEventListener("click", () => {
            newCardFormElement.reset();
            clearValidation(newCardFormElement, validationConfig);
            openPopup(popupNewCard);
        });
    } else {
        console.error("Кнопка добавления новой карточки не найдена!");
    }

    // Модальное окно для редактирования аватара
    const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
    const editAvatarForm = document.forms["edit-avatar"];
    const avatarInput = editAvatarForm.querySelector(".popup__input_type_url");
    const avatarImage = document.querySelector(".profile__image");
    const popupEditAvatarCloseButton = popupEditAvatar.querySelector(".popup__close");

    if (popupEditAvatarCloseButton) {
        popupEditAvatarCloseButton.addEventListener("click", () => closePopup(popupEditAvatar));
    } else {
        console.error("Кнопка закрытия всплывающего окна редактирования аватара не найдена!");
    }

    // Обработчик профиля
    const avatarOverlay = document.querySelector(".profile__image-overlay");
    if (avatarOverlay) {
        avatarOverlay.addEventListener("click", () => {
            console.log("Клик по аватару");
            editAvatarForm.reset();
            clearValidation(editAvatarForm, validationConfig);
            openPopup(popupEditAvatar);
        });
    } else {
        console.error("Оверлей для профиля не найден!");
    }

    // Обработчик отправки формы редактирования профиля
    editAvatarForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        handleFormSubmit(
            () => updateAvatar(avatarInput.value),
            editAvatarForm,
            popupEditAvatar,
            (userData) => {
                avatarImage.style.backgroundImage = `url(${userData.avatar})`;
            }
        );
    });

    function handleFormSubmit(request, form, popup, successCallback) {
        const submitButton = form.querySelector(".popup__button");
        const initialButtonText = submitButton.textContent;

        submitButton.textContent = "Сохранение...";

        request()
            .then((data) => {
                successCallback(data);
                closePopup(popup);
            })
            .catch((error) => {
                console.error("Ошибка:", error);
            })
            .finally(() => {
                submitButton.textContent = initialButtonText;
            });
    }

    editProfileForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        handleFormSubmit(
            () => updateProfile(nameInput.value, jobInput.value),
            editProfileForm,
            popupEditProfile,
            (userData) => {
                document.querySelector(config.onPageUserName).textContent = userData.name;
                document.querySelector(config.onPageUserDescription).textContent = userData.about;
            }
        );
    });

    newCardFormElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
        handleFormSubmit(
            () => addCard(placeNameInput.value, placeLinkInput.value),
            newCardFormElement,
            popupNewCard,
            (newCard) => {
                const cardElement = createCard(newCard, openModalWithImage, handleLikeClick);
                document.querySelector(config.cardList).prepend(cardElement);
            }
        );
    });

    // Модальное окно удаления карточки
    const popupDeleteCard = document.querySelector(".popup_type_delete-card");
    const deleteCardForm = document.forms["delete-card"];
    let cardToDelete = null;

    // Добавляем обработчик событий для кнопки закрытия
    if (popupDeleteCard) {
        const popupDeleteCardCloseButton = popupDeleteCard.querySelector(".popup__close");
        if (popupDeleteCardCloseButton) {
            popupDeleteCardCloseButton.addEventListener("click", () => {
                closePopup(popupDeleteCard);
            });
        } else {
            console.error("Кнопка закрытия модального окна удаления карточки не найдена!");
        }
    } else {
        console.error("Модальное окно удаления карточки не найдено!");
    }

    function openDeleteCardPopup(cardId, cardElement) {
        cardToDelete = { cardId, cardElement };
        openPopup(popupDeleteCard);
    }

    deleteCardForm.addEventListener("submit", (evt) => {
        evt.preventDefault();

        const submitButton = deleteCardForm.querySelector(".popup__button");
        submitButton.textContent = "Удаление...";

        deleteCard(cardToDelete.cardId)
            .then(() => {
                cardToDelete.cardElement.remove();
                closePopup(popupDeleteCard);
            })
            .catch((error) => {
                console.error("Ошибка при удалении карточки:", error);
            })
            .finally(() => {
                submitButton.textContent = "Да";
            });
    });

    // Рендер карточек
    function createCard(cardData, handleImageClick, handleLikeClick, userId) {
        const cardTemplate = document.querySelector("#card-template").content;
        const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
        const cardImage = cardElement.querySelector(".card__image");
        const cardTitle = cardElement.querySelector(".card__title");
        const likeButton = cardElement.querySelector(".card__like-button");
        const likeCount = cardElement.querySelector(".card__like-count");
        const deleteButton = cardElement.querySelector(".card__delete-button");

        cardImage.src = cardData.link;
        cardImage.alt = cardData.name;
        cardTitle.textContent = cardData.name;
        likeCount.textContent = cardData.likes.length;

        // Удаление карточки, если она не принадлежит пользователю
        if (deleteButton) {
            if (cardData.owner._id !== userId) {
                deleteButton.remove();
            } else {
                deleteButton.addEventListener("click", () => openDeleteCardPopup(cardData._id, cardElement));
            }
        }

        // Обработчик клика на картинку
        cardImage.addEventListener("click", () => handleImageClick(cardData));

        // Обработчик лайка
        likeButton.addEventListener("click", () => handleLikeClick(cardData._id, likeButton, likeCount));

        return cardElement;
    }

    function handleLikeClick(cardId, likeButton, likeCountElement) {
        const isLiked = likeButton.classList.contains("card__like-button_is-active");

        toggleLike(cardId, isLiked)
            .then((updatedCard) => {
                likeButton.classList.toggle("card__like-button_is-active");
                likeCountElement.textContent = updatedCard.likes.length;
            })
            .catch((error) => {
                console.error("Ошибка при обработке лайка:", error);
            });
    }

    function renderCards(cardsList, userId) {
        const placesList = document.querySelector(config.cardList);
        placesList.innerHTML = "";

        console.log("Карточки для рендеринга:", cardsList);

        cardsList.forEach((card) => {
            const cardElement = createCard(card, openModalWithImage, handleLikeClick, userId);
            placesList.append(cardElement);
        });
    }

    // Загрузка данных пользователя и карточек
    Promise.all([getUserInfo(), getCards()])
        .then(([userData, cards]) => {
            console.log("Данные пользователя:", userData);
            console.log("Загруженные карточки:", cards);

            document.querySelector(config.onPageUserName).textContent = userData.name;
            document.querySelector(config.onPageUserDescription).textContent = userData.about;
            avatarImage.style.backgroundImage = `url(${userData.avatar})`;
            renderCards(cards, userData._id);
        })
        .catch((error) => {
            console.error("Ошибка при загрузке данных:", error);
        });

    enableValidation(validationConfig);
});
