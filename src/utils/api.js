class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers
        })
            .then(this._checkResponse)
    }

    createSomeOneCards(data) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkResponse)
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers
        })
            .then(this._checkResponse)
    }

    setUserInfo(data) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkResponse)
    }

    deleteCard(card) {
        return fetch(`${this.baseUrl}/cards/${card._id}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(this._checkResponse)
    }

    changeLikeCardStatus(cardId, isLiked) {
        return isLiked ?
            fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: this.headers
            })
                .then(this._checkResponse)

            : fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: this.headers
            })
                .then(this._checkResponse)
    }

    unlikeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(this._checkResponse)
    }

    setAvatar(link) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(this._checkResponse)
    }

    _checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
    headers: {
        authorization: '4b572fb9-4ad5-4a1b-9e4b-14bc91bf7314',
        'Content-Type': 'application/json'
    }
});

export default api;