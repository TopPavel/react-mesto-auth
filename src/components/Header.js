import React from "react";
import {Link, Route, Switch} from "react-router-dom";

const Header = (props) => {

    return (
        <header className="header">
            <img alt="Логотип Место" className="header__logo" src={props.logo}/>
            <Switch>
                <Route path="/sign-up">
                    <div className={"header__inner-block"}>
                        <Link className="header__link" to="/sign-in">Войти</Link>
                    </div>
                </Route>
                <Route path="/sign-in">
                    <div className={"header__inner-block"}>
                        <Link className={"header__link"} to="/sign-up">Зарегистрироваться</Link>
                    </div>
                </Route>
                <Route path="/">
                    <div className={"header__inner-block"}>
                        <p className="margin_0">{props.email}</p>
                        <Link className={"header__link"} to="/sign-in" onClick={props.onExit}>Выйти</Link>
                    </div>
                </Route>
            </Switch>
        </header>
    );
}


export default Header