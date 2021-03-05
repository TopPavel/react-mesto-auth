import React, {useEffect, useState} from "react";
import PopupWithNotification from "./PopupWithNotification";

const RegisterNotificationPopup = React.memo(({isSuccess, isOpen, onClose}) => {
        const [message, setMessage] = useState('')

        useEffect(() => {
            handleNotification()
        }, [isSuccess])

        const handleNotification = () => {
            isSuccess ? setMessage(
                'Вы успешно зарегистрировались'
            ) : setMessage(
                'Что-то пошло не так! Попробуйте еще раз'
            )
        }

        return (
            <PopupWithNotification isSuccess={isSuccess}
                                   isOpened={isOpen}
                                   onClose={onClose}
                                   message={message}
            />
        )
    }
)

export default RegisterNotificationPopup
