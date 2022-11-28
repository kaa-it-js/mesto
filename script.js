const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const editForm = document.forms.editForm;
const fioInput = editForm.elements.fio;
const descriptionInput = editForm.elements.description;
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function openEditProfile() {
  fioInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openEditProfile);
popupCloseButton.addEventListener('click', closePopup);

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = fioInput.value;
  profileDescription.textContent = descriptionInput.value;
}

editForm.addEventListener('submit', handleEditFormSubmit);
