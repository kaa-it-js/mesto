const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const elements = document.querySelector(".elements");
const imagePopupImage = document.querySelector(".image-popup__image");
const imagePopupName = document.querySelector(".image-popup__name");
const imagePopup = document.querySelector(".image-popup").closest(".popup");

export const initCards = () => {
  initialCards.forEach(({ name, link }) =>
    elements.append(createCard(name, link))
  );
};

export const createCard = (name, link) => {
  const elementTemplate = document.querySelector("#element-template").content;
  const element = elementTemplate.querySelector(".element").cloneNode(true);
  const elementImage = element.querySelector(".element__image");
  const elementTitle = element.querySelector(".element__title");
  elementImage.src = link;
  elementTitle.textContent = name;

  const likeButton = element.querySelector(".element__like-button");

  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("element__like-button_active")
  );

  element.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("element__trash-button")) {
      evt.currentTarget.remove();
    }

    if (evt.target.classList.contains("element__image")) {
      openImagePopup(name, link);
    }
  });

  return element;
};

const openImagePopup = (name, link) => {
  imagePopupImage.src = link;
  imagePopupName.textContent = name;

  imagePopup.classList.add("popup_opened");
};
