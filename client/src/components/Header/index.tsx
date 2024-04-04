import { MouseEvent, FC } from "react";
import { useNavigate } from "react-router";

import Container from "components/common/Container";
import Logo from "./Logo";
import styles from "./Header.module.scss";
import HeaderButton from "./HeaderButton";

import { ReactComponent as HomeIcon } from "../../assets/house-solid.svg";

const Header: FC = () => {

    const navigate = useNavigate();

    function onHomeButton(event: MouseEvent) {
        navigate("/");
    }

    function onDocumentationButton(event: MouseEvent) {
        navigate("/documentation");
    }

    return (
        <header className={styles.header}>
            <Container className={styles._container}>
                <Logo />
                <div className={styles.header__buttons}>
                    <HeaderButton onClick={(event) => onHomeButton(event)} className={styles.header__button}><HomeIcon className={`${styles.button_icon} ${styles.button__home}`}/> Стартовая</HeaderButton>
                    <HeaderButton onClick={(event) => onDocumentationButton(event)} className={styles.header__button}>Документация</HeaderButton>
                </div>
            </Container>
        </header>
    );
};
export default Header;
