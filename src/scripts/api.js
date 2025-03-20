const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-34",
  headers: {
      authorization: "b1ee835b-77af-4cd9-98da-82bd72bbe12f",
      "Content-Type": "application/json",
  },
};

const checkResponse = (res) => {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
  }).then(checkResponse);
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
  }).then(checkResponse);
};

export const updateProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
          name: name,
          about: about,
      }),
  }).then(checkResponse);
};

export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
          name: name,
          link: link,
      }),
  }).then(checkResponse);
};

export const toggleLike = (cardId, isLiked) => {
  const method = isLiked ? "DELETE" : "PUT";
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: method,
      headers: config.headers,
  }).then(checkResponse);
};

export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
          avatar: avatarUrl,
      }),
  }).then(checkResponse);
};

export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

