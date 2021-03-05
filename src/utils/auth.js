class Auth {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    signIn = (data) => {
        return fetch(`${this.baseUrl}/signin`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        })
            .then(this._checkResponse)
            .then(data => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    return data
                }
            })
    }

    getContent = (data) => {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${data.jwt}`

            },
        })
            .then(this._checkResponse)
    }

    signUp = (data) => {
        return fetch(`${this.baseUrl}/signup`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        })
            .then(this._checkResponse)
    }


    _checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

const auth = new Auth({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default auth;