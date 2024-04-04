import { FC, useEffect, useRef } from "react";

import ButtonLink from "components/common/Buttons/ButtonLink";
import Container from "components/common/Container";
import { Routes } from "constants/routes";

import styles from "./WelcomeContainer.module.scss";
import IUser from "interfaces/entities/IUser";

type WelcomeContainerType = {
    user: IUser | null;
}

const WelcomeContainer: FC<WelcomeContainerType> = ({user}) => {
    const isAuth = false;

    const buttonRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        
        setTimeout(() => {
            if(buttonRef && buttonRef.current) {
                buttonRef.current.classList.remove(`${styles.starting_anim}`);
            } 
        }, 1000);
        



    }, []);


    return (
        <main className={styles.welcome}>
            <Container className={styles._container}>
                <h1 className={styles.welcome__title}>
                    BaumanAPI - сервис для генерации REST API
                </h1>
                <p className={styles.welcome__subtitle}>
                    Данный сервис предоставляет тестовый API для вашего проекта.
                </p>
                <div className={styles.welcome__links}>
                    <ButtonLink
                        className={`${styles.welcome__link} ${styles.starting_anim} ${isAuth? "" : styles.welcome_auth}`}
                        to={user?Routes.PROJECTS_PATH:Routes.AUTH_PATH}
                        variant="gradient"
                        ref={buttonRef}
                    >
                        Попробовать
                    </ButtonLink>
                    <ButtonLink
                        className={styles.welcome__link}
                        to={Routes.DOCS_PATH}
                    >
                        Документация
                    </ButtonLink>
                </div>
            </Container>
        </main>
    );
};
export default WelcomeContainer;
