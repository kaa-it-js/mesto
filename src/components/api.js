const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wbf-cohort-3",
  headers: {
    Authorization: "e91d2d7a-7934-4811-b5d2-d42326a1cfb9",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

export default {
  getProfile: () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    }).then(checkResponse);
  },

  getCards: () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    }).then(checkResponse);
  },

  setLike: (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers,
    }).then(checkResponse);
  },

  deleteLike: (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then(checkResponse);
  },

  updateProfile: (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({ name, about }),
    }).then(checkResponse);
  },

  addCard: (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({ name, link }),
    }).then(checkResponse);
  },

  deleteCard: (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then(checkResponse);
  },

  updateAvatar: (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({ avatar }),
    }).then(checkResponse);
  },
};
