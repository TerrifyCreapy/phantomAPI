import { FC, ReactNode } from "react";

import styles from "./Container.module.scss";

type ContainerType = {
    children: ReactNode;
    className?: string;
};

const Container: FC<ContainerType> = ({ children, className }) => {
    return (
        <div className={`${styles.container} ${className || ""}`}>
            {children}
        </div>
    );
};
export default Container;
