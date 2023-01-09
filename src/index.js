import { enableValidation } from "./components/validate";
import { initCards, addCardListeners } from "./components/card";
import { enableClosePopups } from "./components/modal";
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

addCardListeners(validationConfig);

addProfileListeners(validationConfig);

Promise.all([api.getProfile(), api.getCards()])
  .then(([profile, cards]) => {
    setProfile(profile);
    initCards(cards, profile);
  })
  .catch((err) => console.log(err));

enableClosePopups();

enableValidation(validationConfig);
