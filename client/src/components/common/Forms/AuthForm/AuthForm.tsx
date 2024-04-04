import { ChangeEvent, FC, SyntheticEvent, useContext, useState } from "react";

import styles from "./AuthForm.module.scss";
import Button from "components/common/Buttons/Button";
import { useSearchParams } from "react-router-dom";
import HintInput from "components/common/HintInput";
import { AuthContext } from "pages/AuthPage";

const AuthForm: FC = () => {


    
    const [seachParams, setSearchParams] = useSearchParams();
    const [isAuth, setIsAuth] = useState<boolean>(Boolean(seachParams.get("singup")));
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPass, setRepeatPassword] = useState<string>("");

    const { loginAction, registerAction } = useContext(AuthContext);

    function onChangeEmail(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function onChangePassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function onChangeRepPass(event: ChangeEvent<HTMLInputElement>) {
        setRepeatPassword(event.target.value);
    }

    function submit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        e.stopPropagation();
        e.preventDefault();
        if(!isAuth) {
            return loginAction(email, password);
        }
        if(password !== repeatPass) return;
        return registerAction(email, password);
    }

    function changeAuth() {
        if(isAuth) {
            setSearchParams((prev) => ({...prev, signup: false}));
        }
        else {
            setSearchParams((prev) => ({...prev, signup: true}));
        }
        setIsAuth(prev => !prev);
    }

    function isDisabled() {
        return isAuth ? repeatPass !== password : false;
    }


    return (
        <form action="submit" onSubmit={submit} className={styles.auth}>
            <HintInput classname={styles.input__form} text="email" value={email} onChange={onChangeEmail}/>
            <HintInput classname={styles['input__form']} text="password" value={password} onChange={onChangePassword} type="password"/>
            {
                isAuth ? <HintInput classname={styles['input__form']} text="repeAt Password" value={repeatPass} onChange={onChangeRepPass} type="password"/> : null
            }
            {isDisabled()? <span>Пароли не совпадают</span>: null}
            <div className={styles.auth__buttons}>
                <Button type="submit" className={styles.auth__buttons_sign} disabled={isDisabled()}>
                    {isAuth?"Зарегистрироваться": "Войти"}
                </Button>
                <span className={styles.auth__buttons_change} onClick={() => changeAuth()}>
                    {isAuth? "Авторизация": "Регистрация"}
                </span>
            </div>
            
        </form>
    );
};
export default AuthForm;
