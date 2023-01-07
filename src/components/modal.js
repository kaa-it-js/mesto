let escapeHandler;

export const closePopup = (popup) => {
  unregisterEscapeHandler();
  popup.classList.remove("popup_opened");
};

export const enableClosePopups = () => {
  const popups = Array.from(document.querySelectorAll(".popup"));

  popups.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close-button");
    closeButton.addEventListener("click", () => closePopup(popup));
    popup.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(popup);
      }
    });
  });
};

export const registerEscapeHandler = (popup) => {
  escapeHandler = (evt) => {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  };

  document.addEventListener("keydown", escapeHandler);
};

const unregisterEscapeHandler = () =>
  document.removeEventListener("keydown", escapeHandler);
