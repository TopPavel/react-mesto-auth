import React from "react";

const PopupWithNotification = ({isSuccess, message, isOpened, onClose}) => {

    return (
        <div className={`popup popup_type_notification ${isOpened && 'popup_opened'}`} onClick={event => {
            if (event.target.classList.contains('popup')
                || event.target.classList.contains('popup__close')) {
                onClose(event)
            }
        }}>
            <div className="popup__content popup__content_notification">
                <div className={`popup__status ${isSuccess ? 'popup__status_success' : 'popup__status_failure'}`}/>
                <h2 className="popup__message">{message}</h2>
                <button className="popup__close" type="button"/>
            </div>
        </div>
    );
}

export default PopupWithNotification
