import PopupWithForm from "./PopupWithForm";
import React, {useEffect, useState} from "react";

const AddPlacePopup = React.memo(({isOpen, onClose, onAddPlace,}) => {
        const [placeName, setPlaceName] = useState('')
        const [link, setLink] = useState('')

        useEffect(() => {
            setPlaceName('')
            setLink('')
        }, [onClose])

        const handleSubmit = (e) => {
            e.preventDefault()
            onAddPlace({
                name: placeName,
                link
            })
        };

        const handleChangeCardName = (e) => {
            setPlaceName(e.target.value)
        }

        const handleChangeLink = (e) => {
            setLink(e.target.value)
        };


        return (
            <PopupWithForm name={'card'}
                           title={'Новое место'}
                           isOpened={isOpen}
                           onClose={onClose}
                           onSubmit={handleSubmit}
            >
                <input className="popup__input"
                       name="name"
                       id="title"
                       required type="text"
                       minLength="2"
                       maxLength="30"
                       placeholder="Название"
                       value={placeName}
                       onChange={handleChangeCardName}
                />
                <span id="title-error" className="popup__input-error">Необходимо заполнить данное поле</span>
                <input className="popup__input"
                       name="link"
                       id="link"
                       required type="url"
                       placeholder="Ссылка на картинку"
                       value={link}
                       onChange={handleChangeLink}
                />
                <span id="link-error" className="popup__input-error">Необходимо заполнить данное поле</span>
                <button className="popup__save-button card-popup-button" type="submit">Создать</button>
            </PopupWithForm>
        )
    }
)

export default AddPlacePopup