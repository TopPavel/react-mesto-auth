import React from "react";

const ImagePopup = ({card, isOpened, onClose}) => {

    return (
        <div className={`popup popup_dark ${isOpened ? 'popup_opened' : ''}`} onClick={event => {
            if (event.target.classList.contains('popup')
                || event.target.classList.contains('popup__close')) {
                onClose()
            }
        }}>
            <div className="popup__image-content">
                <img alt="Изображение" className="popup__image" src={card.link}/>
                <h2 className="popup__title-image">{card.name}</h2>
                <button className="popup__close" type="button"/>
            </div>
        </div>
    );
}

export default ImagePopup