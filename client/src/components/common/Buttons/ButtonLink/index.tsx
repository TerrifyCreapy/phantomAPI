import { FC, ReactNode, forwardRef } from "react";

import { NavLink } from "react-router-dom";

import styles from "./ButtonLink.module.scss";

type variants = "solid" | "gradient";

type ButtonLinkType = {
    to: string;
    className?: string;
    children: ReactNode;
    variant?: variants;
};

function getClassName(variant: variants) {
    switch (variant) {
        case "solid": {
            return "";
        }
        case "gradient": {
            return styles.gradient;
        }
        default: {
            return "";
        }
    }
}

type Ref = HTMLAnchorElement;

const ButtonLink = forwardRef<Ref, ButtonLinkType>(({
    to,
    className,
    children,
    variant = "solid",
}, ref) => {
    return (
        <NavLink
            to={to}
            className={`${styles.button_link} ${getClassName(variant)} ${
                className || ""
            }`}
            ref={ref}
        >
            {children}
        </NavLink>
    );
});
export default ButtonLink;
