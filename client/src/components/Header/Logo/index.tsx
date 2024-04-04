import { FC } from "react";

import { Routes } from "constants/routes";
import { NavLink } from "react-router-dom";

import styles from "./Logo.module.scss";

const Logo: FC = () => {
    return (
        <fieldset className={styles.logo}>
            <legend>BaumanApi logotype</legend>
            <NavLink to={Routes.MAIN_PATH} className={styles.logo__link}>
                BaumanAPI
            </NavLink>
        </fieldset>
    );
};
export default Logo;
