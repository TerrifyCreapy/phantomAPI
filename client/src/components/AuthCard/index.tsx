import { FC } from "react";

import styles from "./AuthCard.module.scss";
import AuthForm from "components/common/Forms/AuthForm/AuthForm";

const AuthCard: FC = () => {
    return (
        <div className={styles.auth_card}>
            <AuthForm />
        </div>
    );
};
export default AuthCard;
