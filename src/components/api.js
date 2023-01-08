const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wbf-cohort-3",
  headers: {
    Authorization: "e91d2d7a-7934-4811-b5d2-d42326a1cfb9",
    "Content-Type": "application/json",
  },
};

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
