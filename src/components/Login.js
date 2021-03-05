import Sign from "./Sign";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import auth from "../utils/auth";

const Login = ({handleLogin}) => {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        setEmail('')
        setPassword('')
    }, [])

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        auth.signIn({email: email, password: password})
            .then(data => {
                if (data.token) {
                    setEmail('')
                    setPassword('')
                    handleLogin()
                    history.push("/")
                }
            })
    }

    return (
        <Sign name={"sign-in"}
              title={"Вход"}
              onSend={handleSubmit}
        >
            <input className="popup__input popup__input_white"
                   id="name"
                   maxLength="40"
                   minLength="2"
                   name="email"
                   placeholder="Email"
                   required type="email"
                   value={email}
                   onChange={handleChangeEmail}
            />
            <span id="email-error" className="popup__input-error">Необходимо заполнить данное поле</span>
            <input className="popup__input popup__input_white"
                   maxLength="15"
                   minLength="6"
                   name="password"
                   placeholder="Пароль"
                   required type="password"
                   value={password}
                   onChange={handleChangePassword}
            />
            <span id="password-error" className="popup__input-error">Необходимо заполнить данное поле</span>
            <button className="popup__save-button popup__save-button_white margin__top_170" type="submit">
                Войти
            </button>
            {/*<Link className={"sign__link margin__top_15"} to="/sign-up">*/}
            {/*    Уже зарегистрированы? Войти*/}
            {/*</Link>*/}
        </Sign>
    )
}

export default Login