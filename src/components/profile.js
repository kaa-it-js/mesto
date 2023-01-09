import { initButtonState } from "./validate";
import { closePopup, registerEscapeHandler } from "./modal";
import api from "./api";

const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileForm = document.forms.editProfileForm;
const editProfilePopup = editProfileForm.closest(".popup");
const fioInput = editProfileForm.elements.fio;
const descriptionInput = editProfileForm.elements.description;
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const submitProfileButton = editProfileForm.querySelector(
  ".form__submit-button"
);

let _profile;

export const addProfileListeners = (validationConfig) => {
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

    submitProfileButton.textContent = "Сохранение...";

    api
      .updateProfile(fioInput.value, descriptionInput.value)
      .then((profile) => {
        _profile = profile;
        profileName.textContent = _profile.name;
        profileDescription.textContent = _profile.about;
        closePopup(evt.target.closest(".popup"));
      })
      .catch((err) => console.log(err))
      .finally(() => (submitProfileButton.textContent = "Сохранить"));
  });
};

export const setProfile = (profile) => {
  _profile = profile;
  profileName.textContent = _profile.name;
  profileDescription.textContent = _profile.about;
  profileImage.src = _profile.avatar;
};
