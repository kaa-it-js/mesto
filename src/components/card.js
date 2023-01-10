import api from "./api";
import { initButtonState } from "./validate";
import { closePopup, registerEscapeHandler } from "./modal";
import { getProfile } from "./profile";

const elements = document.querySelector(".elements");
const imagePopupImage = document.querySelector(".image-popup__image");
const imagePopupName = document.querySelector(".image-popup__name");
const imagePopup = document.querySelector(".image-popup").closest(".popup");
const addCardForm = document.forms.addCardForm;
const addCardPopup = addCardForm.closest(".popup");
const cardNameInput = addCardForm.elements.name;
const cardLinkInput = addCardForm.elements.link;
const addCardButton = document.querySelector(".profile__add-button");
const submitCardButton = addCardForm.querySelector(".form__submit-button");
const checkRemoveForm = document.forms.checkRemoveForm;
const checkRemovePopup = checkRemoveForm.closest(".popup");
const checkRemoveButton = checkRemoveForm.querySelector(".form__submit-button");

let cardToRemoveId;
let elementToRemove;
let _validationConfig;

export const initCards = (cards, profile, validationConfig) => {
  _validationConfig = validationConfig;
  cards.forEach((card) => elements.append(createCard(card, profile)));
};

export const addCardListeners = (validationConfig) => {
  _validationConfig = validationConfig;

  // Open modal to add new card
  addCardButton.addEventListener("click", () => {
    initButtonState(addCardForm, validationConfig);

    registerEscapeHandler(addCardPopup);

    addCardPopup.classList.add("popup_opened");
  });

  // Add new card
  addCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    submitCardButton.textContent = "Сохранение...";

    api
      .addCard(cardNameInput.value, cardLinkInput.value)
      .then((card) => {
        const element = createCard(card, getProfile());
        elements.prepend(element);
        cardNameInput.value = "";
        cardLinkInput.value = "";
        closePopup(evt.target.closest(".popup"));
      })
      .catch((err) => console.log(err))
      .finally(() => (submitCardButton.textContent = "Сохранить"));
  });

  // Remove card
  checkRemoveForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    checkRemoveButton.textContent = "Удаление...";

    api
      .deleteCard(cardToRemoveId)
      .then(() => {
        elementToRemove.remove();
        closePopup(evt.target.closest(".popup"));
      })
      .catch((err) => console.log(err))
      .finally(() => (checkRemoveButton.textContent = "Да"));
  });
};

export const createCard = (card, { _id }) => {
  const elementTemplate = document.querySelector("#element-template").content;
  const element = elementTemplate.querySelector(".element").cloneNode(true);
  const elementImage = element.querySelector(".element__image");
  const elementTitle = element.querySelector(".element__title");
  elementImage.src = card.link;
  elementTitle.textContent = card.name;

  const likeButton = element.querySelector(".element__like-button");
  const likeCounter = element.querySelector(".element__like-counter");
  const trashButton = element.querySelector(".element__trash-button");

  likeCounter.textContent = String(card.likes.length);

  if (card.likes.some((like) => like._id === _id)) {
    likeButton.classList.add("element__like-button_active");
  }

  likeButton.addEventListener("click", () =>
    handleLike(likeButton, likeCounter, card._id)
  );

  if (card.owner._id !== _id) {
    trashButton.classList.add("element__trash-button_hidden");
  }

  element.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("element__trash-button")) {
      handleRemove(card._id, element);
    }

    if (evt.target.classList.contains("element__image")) {
      openImagePopup(card.name, card.link);
    }
  });

  return element;
};

const handleLike = (likeButton, likeCounter, cardId) => {
  if (likeButton.classList.contains("element__like-button_active")) {
    // Снимаем лайк
    api
      .deleteLike(cardId)
      .then((card) => {
        likeCounter.textContent = String(card.likes.length);
      })
      .catch((err) => console.log(err));
  } else {
    // Ставим лайк
    api
      .setLike(cardId)
      .then((card) => {
        likeCounter.textContent = String(card.likes.length);
      })
      .catch((err) => console.log(err));
  }

  likeButton.classList.toggle("element__like-button_active");
};

const handleRemove = (cardId, element) => {
  initButtonState(checkRemoveForm, _validationConfig);

  registerEscapeHandler(checkRemovePopup);

  cardToRemoveId = cardId;
  elementToRemove = element;

  checkRemovePopup.classList.add("popup_opened");
};

const openImagePopup = (name, link) => {
  imagePopupImage.src = link;
  imagePopupName.textContent = name;

  registerEscapeHandler(imagePopup);

  imagePopup.classList.add("popup_opened");
};
