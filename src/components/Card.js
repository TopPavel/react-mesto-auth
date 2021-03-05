import React, {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = ({card, onCardClick, onCardDelete, onCardLike}) => {

    const currentUser = useContext(CurrentUserContext)
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikedClass = 'content_liked'

    const handleClick = () => {
        onCardClick(card)
    }

    const handleDelete = () => {
        onCardDelete(card)
    };

    const handleLikeClick = () => {
        onCardLike(card)
    }

    return (
        <>
            <li className="content__list-item">
                <img alt="Изображение места" className="content__item-image" src={card.link} onClick={handleClick}/>
                {
                    isOwn &&
                    <button className="content__remove-button" type="button" onClick={handleDelete}/>
                }
                <div className="content__item-description">
                    <h2 className="content__item-title">{card.name}</h2>
                    <div className="content__like">
                        <button className={`content__like-button ${isLiked && cardLikedClass}`} type="button"
                                onClick={handleLikeClick}/>
                        <p className="content__like-count">{card.likes.length}</p>
                    </div>
                </div>
            </li>
        </>

    )
}

export default Card