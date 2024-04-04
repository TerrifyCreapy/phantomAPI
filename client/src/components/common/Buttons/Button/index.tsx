import {FC, ButtonHTMLAttributes, ReactNode, MouseEvent} from "react";
import styles from "./Button.module.scss";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => unknown;
    type?: "submit"|"reset"|"button";
}

const Button: FC<IButton> = ({
    children,
    className,
    disabled = false,
    onClick,
    type
}) => {
    const classNames = className?className:"";
    return (
    <button type={type?type: "button"} className={`${classNames} ${styles.btn}`} disabled={disabled} onClick={onClick}>
        {children}
    </button>
 )
};
export default Button;