import React from "react";

const PopupWithForm = ({name, title, isOpened, children, onClose, onSubmit}) => {

    return (
        <div className={`popup popup_type_${name} ${isOpened && 'popup_opened'}`} onClick={event => {
            if (event.target.classList.contains('popup')
                || event.target.classList.contains('popup__close')) {
                onClose(event)
            }
        }}>
            <div className="popup__content">
                <h2 className="popup__title">{title}</h2>
                <form className="popup__edit-form card-form" name={`${name}-form`} onSubmit={onSubmit}>
                    {children}
                </form>
                <button className="popup__close" type="button"/>
            </div>
        </div>
    );
}

export default PopupWithForm
