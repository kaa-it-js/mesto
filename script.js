const profileEditButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.forms.editProfileForm;
const editProfilePopup = editProfileForm.closest('.popup');
const editProfilePopupCloseButton = editProfileForm.previousElementSibling;
const fioInput = editProfileForm.elements.fio;
const descriptionInput = editProfileForm.elements.description;
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const elements = document.querySelector('.elements');
const addCardForm = document.forms.addCardForm;
const addCardPopup = addCardForm.closest('.popup');
const addCardPopupCloseButton = addCardForm.previousElementSibling;
const cardNameInput = addCardForm.elements.name;
const cardLinkInput = addCardForm.elements.link;
const addCardButton = document.querySelector('.profile__add-button');

function openEditProfile() {
  fioInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  editProfilePopup.classList.add('popup_opened');
}

function closeEditProfile() {
  editProfilePopup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openEditProfile);
editProfilePopupCloseButton.addEventListener('click', closeEditProfile);

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = fioInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeEditProfile();
}

editProfileForm.addEventListener('submit', handleEditFormSubmit);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCard(name, link) {
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');
  elementImage.src = link;
  elementTitle.textContent = name;

  return element;
}

initialCards.forEach(({name, link}) => elements.append(createCard(name, link)));

function openCreateCard() {
  addCardPopup.classList.add('popup_opened');
}

function closeCreateCard() {
  addCardPopup.classList.remove('popup_opened');
}

addCardButton.addEventListener('click', openCreateCard);
addCardPopupCloseButton.addEventListener('click', closeCreateCard);
