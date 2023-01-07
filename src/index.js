import { enableValidation, initButtonState } from "./components/validate";
import { initCards, createCard } from "./components/card";
import {
  closePopup,
  enableClosePopups,
  registerEscapeHandler,
} from "./components/modal";
import "./pages/index.css";

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileForm = document.forms.editProfileForm;
const editProfilePopup = editProfileForm.closest(".popup");
const fioInput = editProfileForm.elements.fio;
const descriptionInput = editProfileForm.elements.description;
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const elements = document.querySelector(".elements");
const addCardForm = document.forms.addCardForm;
const addCardPopup = addCardForm.closest(".popup");
const cardNameInput = addCardForm.elements.name;
const cardLinkInput = addCardForm.elements.link;
const addCardButton = document.querySelector(".profile__add-button");

// Open modal for edit profile
profileEditButton.addEventListener("click", () => {
  fioInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  initButtonState(editProfileForm, validationConfig);

  registerEscapeHandler(editProfilePopup);

  editProfilePopup.classList.add("popup_opened");
});

// Apply new profile data
editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  profileName.textContent = fioInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(evt.target.closest(".popup"));
});

// Open modal to add new card
addCardButton.addEventListener("click", () => {
  initButtonState(addCardForm, validationConfig);

  registerEscapeHandler(addCardPopup);

  addCardPopup.classList.add("popup_opened");
});

// Add new card
addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const element = createCard(cardNameInput.value, cardLinkInput.value);

  elements.prepend(element);

  cardNameInput.value = "";
  cardLinkInput.value = "";

  closePopup(evt.target.closest(".popup"));
});

initCards();

enableClosePopups();

enableValidation(validationConfig);
