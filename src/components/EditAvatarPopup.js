import PopupWithForm from "./PopupWithForm";
import React, {useEffect, useRef} from "react";

const EditAvatarPopup = React.memo(({isOpen, onClose, onUpdateAvatar}) => {
        const avatarRef = useRef()

        useEffect(() => {
            avatarRef.current.value = ''
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            onUpdateAvatar({
                avatar: avatarRef.current.value
            });
        }

        return (
            <PopupWithForm name={'avatar'}
                           title={'Обновить аватар'}
                           isOpened={isOpen}
                           onClose={onClose}
                           onSubmit={handleSubmit}
            >
                <input className="popup__input"
                       id="a-link"
                       name="link"
                       placeholder="Ссылка на картинку"
                       required type="url"
                       ref={avatarRef}
                />
                <span className="popup__input-error" id="a-link-error">Необходимо заполнить данное поле</span>
                <button className="popup__save-button popup__save-button_nonmargin avatar-button"
                        type="submit">Сохранить
                </button>
            </PopupWithForm>
        )
    }
)

export default EditAvatarPopup