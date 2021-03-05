import React, {useEffect, useState} from "react";
import '../index.css';
import Header from "./Header";
import Main from "./Main";
import logo from './../images/logo.svg'
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Route, Switch, useHistory} from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import auth from "../utils/auth";
import RegisterNotificationPopup from "./RegisterNotificationPopup";

const App = () => {
    const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isDeleteCard, setIsDeleteCard] = useState(false);
    const [selectedCard, setSelectedCard] = useState(false);
    const [isOpenedCard, setIsOpenedCard] = useState(false); // чтобы картинка не исчезала при плавном закрытии модальника
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(true);
    const [userEmail, setUserEmail] = useState('')
    const [isSuccessRegister, setIsSuccessRegister] = useState({})
    const history = useHistory();

    useEffect(() => {
        api.getUserInfo()
            .then(data => {
                setCurrentUser(data)
            })
            .catch((err) => {
                console.log(err);
            });

        api.getInitialCards()
            .then(data => {
                setCards(data)
            })
            .catch((err) => {
                console.log(err);
            });

        tokenCheck()

    }, [])

    useEffect(() => {
        const handleClosePopup = (event) => {
            if (event.key === 'Escape') {
                closeAllPopups()
            }
        }

        if (
            isEditProfilePopupOpen ||
            isAddPlacePopupOpen ||
            isEditAvatarPopupOpen ||
            selectedCard ||
            isDeleteCard ||
            isNotificationPopupOpen
        ) {
            document.addEventListener('keydown', handleClosePopup);
        }

        return () => {
            document.removeEventListener('keydown', handleClosePopup);
        }

    }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, selectedCard]);


    const tokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.getContent({jwt: jwt})
                .then(res => {
                    if (res) {
                        setLoggedIn(true)
                        setUserEmail(res.data.email)
                        history.push('/')
                    }
                })
                .catch((err) => {
                    setLoggedIn(false)
                    console.log(err);
                });
        } else {
            setLoggedIn(false)
        }

    }

    const handleOpenNotificationPopup = (isSuccess) => {
        setIsSuccessRegister(isSuccess)
        setIsNotificationPopupOpen(true)
    }

    const handleUpdateUser = (data) => {
        api.setUserInfo(data)
            .then(data => {
                setCurrentUser(data)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(
                closeAllPopups
            );
    }

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
                setCards(cards.map((c) => c._id === card._id ? newCard : c));
            }
        ).catch((err) => {
            console.log(err);
        });
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card).then(() =>
            setCards(cards.filter(i => i._id !== card._id))
        ).catch((err) => {
            console.log(err);
        })
    }

    const handleUpdateAvatar = (data) => {
        api.setAvatar(data.avatar)
            .then(data => {
                    setCurrentUser(data)
                }
            ).catch((err) => {
            console.log(err);
        })
            .finally(
                closeAllPopups
            );
    }

    const handleAddPlace = (data) => {
        api.createSomeOneCards(data)
            .then((data) => {
                setCards([data, ...cards])
            }).catch((err) => {
            console.log(err);
        })
            .finally(
                closeAllPopups
            );
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsOpenedCard(false)
        setIsDeleteCard(false)
        setIsNotificationPopupOpen(false)
    }

    const handleCardClick = (card) => {
        setSelectedCard(card)
        setIsOpenedCard(true)

    }

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true)
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true)
    }

    const handleLogin = () => {
        tokenCheck();
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true)
    }

    const handleSignOut = () => {
        localStorage.clear()
    }

    return (

        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header logo={logo} email={userEmail} onExit={handleSignOut}/>
                <Switch>
                    <Route path={"/sign-in"}>
                        <Login handleLogin={handleLogin}/>
                    </Route>
                    <Route path={"/sign-up"}>
                        <Register handleNotification={handleOpenNotificationPopup}/>
                    </Route>
                    <ProtectedRoute
                        path="/"
                        loggedIn={loggedIn}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onSelectCard={handleCardClick}
                        onEditProfile={handleEditProfileClick}
                        cards={cards}
                        onLikeClick={handleCardLike}
                        onCardDelete={handleCardDelete}
                        component={Main}
                    />
                </Switch>
                {/*<Footer/>*/}
                <RegisterNotificationPopup
                    isSuccess={isSuccessRegister}
                    isOpen={isNotificationPopupOpen}
                    onClose={closeAllPopups}
                />
                <ImagePopup card={selectedCard}
                            isOpened={isOpenedCard}
                            onClose={closeAllPopups}
                />
                <EditProfilePopup isOpen={isEditProfilePopupOpen}
                                  onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser}
                />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                                 onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}
                />
                <AddPlacePopup isOpen={isAddPlacePopupOpen}
                               onClose={closeAllPopups}
                               onAddPlace={handleAddPlace}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
