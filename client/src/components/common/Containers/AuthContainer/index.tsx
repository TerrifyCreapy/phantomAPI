import Container from "components/common/Container";
import { FC } from "react";

import styles from "./AuthContainer.module.scss";
import AuthCard from "components/AuthCard";

const AuthContainer: FC = () => {
    return (
        <main className={styles.auth}>
            <h1 className={styles.auth__title}>Авторизация</h1>
            <Container className={styles._container}>
                <AuthCard />
            </Container>
        </main>
    );
};
export default AuthContainer;
