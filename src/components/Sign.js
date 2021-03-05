import React from "react";

const Sign = ({name, title, onSend, children, nav}) => {

    return (
        <div className="sign">
            <h2 className="sign__title">{title}</h2>
            <form className={`popup__edit-form margin__top_45 sign__${name}`} name={`${name}-form`} onSubmit={onSend}>
                {children}
            </form>
            {nav}
        </div>
    );
}

export default Sign