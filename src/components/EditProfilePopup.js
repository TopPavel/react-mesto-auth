import PopupWithForm from "./PopupWithForm";
import React, {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const EditProfilePopup = React.memo(({isOpen, onClose, onUpdateUser}) => {
        const currentUser = useContext(CurrentUserContext);
        const [name, setName] = useState('')
        const [description, setDescription] = useState('')

        useEffect(() => {
            setName(currentUser.name || '');
            setDescription(currentUser.about || '');
        }, [currentUser]);

        const handleSubmit = (e) => {
            e.preventDefault();
            onUpdateUser({
                name,
                about: description,
            });
        }

        const handleChangeName = (e) => setName(e.target.value);

        const handleChangeDescription = (e) => setDescription(e.target.value);

        return (
            <PopupWithForm name={'profile'}
                           title={'Редактировать профиль'}
                           isOpened={isOpen}
                           onClose={onClose}
                           onSubmit={handleSubmit}
            >
                <input className="popup__input"
                       id="name"
                       maxLength="40"
                       minLength="2"
                       name="name"
                       placeholder="Имя"
                       required type="text"
                       value={name}
                       onChange={handleChangeName}
                />
                <span id="name-error" className="popup__input-error">Необходимо заполнить данное поле</span>
                <input className="popup__input"
                       id="desc"
                       maxLength="200"
                       minLength="2"
                       name="desc"
                       placeholder="Вид деятельности"
                       required type="text"
                       value={description}
                       onChange={handleChangeDescription}
                />
                <span id="desc-error" className="popup__input-error">Необходимо заполнить данное поле</span>
                <button className="popup__save-button profile-button" type="submit">Сохранить
                </button>
            </PopupWithForm>
        )
    }
)

export default EditProfilePopup