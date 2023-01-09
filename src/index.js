import { enableValidation, initButtonState } from "./components/validate";
import { initCards, createCard } from "./components/card";
import {
  closePopup,
  enableClosePopups,
  registerEscapeHandler,
} from "./components/modal";
import "./pages/index.css";
import api from "./components/api";
import { addProfileListeners, setProfile } from "./components/profile";

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

let user;

const elements = document.querySelector(".elements");
const addCardForm = document.forms.addCardForm;
const addCardPopup = addCardForm.closest(".popup");
const cardNameInput = addCardForm.elements.name;
const cardLinkInput = addCardForm.elements.link;
const addCardButton = document.querySelector(".profile__add-button");

addProfileListeners();

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

Promise.all([api.getProfile(), api.getCards()])
  .then(([profile, cards]) => {
    setProfile(profile);
    initCards(cards, profile);
  })
  .catch((err) => console.log(err));

enableClosePopups();

enableValidation(validationConfig);
