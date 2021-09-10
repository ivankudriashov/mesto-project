const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-1',
  headers: {
    authorization: 'f04d3593-eb68-4f0d-80f9-8a27e4ddd7b0',
    'Content-Type': 'application/json'
  }
}

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`ошибка ${res.status}`);
}

const getInitialProfile = function() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
    })
    .then(getResponse)
}


const getInitialCards = function() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(getResponse)
}

const changeProfile =  function(name, description) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description
    })
  }).then(getResponse);
}

const changeAvatar = function(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  }).then(getResponse);
}

const addCardToServer = function(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  }).then(getResponse);
}

const addLike = function(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'f04d3593-eb68-4f0d-80f9-8a27e4ddd7b0',
      'Content-Type': 'application/json'
    }
  }).then(getResponse);
}

const removeLike =  function(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'f04d3593-eb68-4f0d-80f9-8a27e4ddd7b0',
      'Content-Type': 'application/json'
    }
  }).then(getResponse);
}

const deleteCard = function(id) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'f04d3593-eb68-4f0d-80f9-8a27e4ddd7b0',
      'Content-Type': 'application/json'
    }
  }).then(getResponse);
}

export {getInitialProfile, getInitialCards, changeProfile, changeAvatar, addCardToServer, addLike, removeLike, deleteCard}
