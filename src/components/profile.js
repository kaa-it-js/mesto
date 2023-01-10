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

const avatarImage = document.querySelector(".profile__image");
const updateAvatarForm = document.forms.updateAvatarForm;
const updateAvatarPopup = updateAvatarForm.closest(".popup");
const updateAvatarButton = document.querySelector(".profile__rectangle");
const submitAvatarButton = updateAvatarForm.querySelector(
  ".form__submit-button"
);
const linkInput = updateAvatarForm.elements.link;

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

  // Open modal for update avatar
  updateAvatarButton.addEventListener("click", () => {
    initButtonState(updateAvatarForm, validationConfig);

    registerEscapeHandler(updateAvatarPopup);

    updateAvatarPopup.classList.add("popup_opened");
  });

  // Apply new avatar link
  updateAvatarForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    submitAvatarButton.textContent = "Сохранение...";

    api
      .updateAvatar(linkInput.value)
      .then((_) => {
        avatarImage.src = linkInput.value;
        linkInput.value = "";
        closePopup(evt.target.closest(".popup"));
      })
      .catch((err) => console.log(err))
      .finally(() => (submitAvatarButton.textContent = "Сохранить"));
  });
};

export const setProfile = (profile) => {
  _profile = profile;
  profileName.textContent = _profile.name;
  profileDescription.textContent = _profile.about;
  profileImage.src = _profile.avatar;
};

export const getProfile = () => _profile;
