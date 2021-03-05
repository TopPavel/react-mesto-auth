import React, {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Main = (props) => {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                        <img alt="Аватар" className="profile__avatar" src={currentUser.avatar}/>
                        <span className="profile__avatar-hover"/>
                    </div>
                    <div className="profile__description">
                        <div className="profile__title">
                            <h1 className="profile__title-text">{currentUser.name}</h1>
                            <p className="profile__specialisation">{currentUser.about}</p>
                        </div>
                        <button className="profile__setting" type="button" onClick={props.onEditProfile}/>
                    </div>
                </div>
                <button className="add-content" type="button" onClick={props.onAddPlace}/>
            </section>
            <section className="content">
                <ul className="content__list">
                    {props.cards.length > 0 &&
                    props.cards.map(item => (
                            <Card key={item._id}
                                  card={item}
                                  onCardClick={props.onSelectCard}
                                  onCardDelete={props.onCardDelete}
                                  onCardLike={props.onLikeClick}
                            />
                        )
                    )
                    }
                </ul>
            </section>
        </main>
    );
}

export default Main