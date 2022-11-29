const profileEditButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.forms.editProfileForm;
const editProfilePopup = editProfileForm.closest('.popup');
const fioInput = editProfileForm.elements.fio;
const descriptionInput = editProfileForm.elements.description;
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const elements = document.querySelector('.elements');
const addCardForm = document.forms.addCardForm;
const addCardPopup = addCardForm.closest('.popup');
const cardNameInput = addCardForm.elements.name;
const cardLinkInput = addCardForm.elements.link;
const addCardButton = document.querySelector('.profile__add-button');

function openEditProfile() {
  fioInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  editProfilePopup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function enableClosePopups() {
  const popups = Array.from(document.querySelectorAll('.popup'));

  popups.forEach(popup => {
    const closeButton = popup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', () => closePopup(popup));
  });
}

profileEditButton.addEventListener('click', openEditProfile);

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = fioInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(evt.target.closest('.popup'));
}

editProfileForm.addEventListener('submit', handleEditFormSubmit);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const element = createCard(cardNameInput.value, cardLinkInput.value);

  elements.prepend(element);

  cardNameInput.value = '';
  cardLinkInput.value = '';

  closePopup(evt.target.closest('.popup'));
}

addCardForm.addEventListener('submit', handleAddCardFormSubmit);

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

  const likeButton = element.querySelector('.element__like-button');

  likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like-button_active'));

  element.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('element__trash-button')) {
      evt.currentTarget.remove();
    }
  });

  return element;
}

initialCards.forEach(({name, link}) => elements.append(createCard(name, link)));

function openCreateCard() {
  addCardPopup.classList.add('popup_opened');
}

addCardButton.addEventListener('click', openCreateCard);

enableClosePopups();

