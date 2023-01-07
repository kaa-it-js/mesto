export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

export const enableClosePopups = () => {
  const popups = Array.from(document.querySelectorAll(".popup"));

  popups.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close-button");
    closeButton.addEventListener("click", () => closePopup(popup));
  });
};
