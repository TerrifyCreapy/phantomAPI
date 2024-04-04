import {FC, ButtonHTMLAttributes, CSSProperties} from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import styles from "./Button.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>{
    text?: string;
    className?: string;
    icon?: IconDefinition;
    color?: "warn" | "success" | "blue" | "gray";
    outline?: boolean;
    textColor?: "same"
}

const colors: any = {
    "blue": `rgb(22, 173, 243)`,
    "dark-blue": `rgb(9, 111, 158)`,
    "success": `rgb(80, 190, 46)`,
    "dark-success": `rgb(43, 145, 12)`,
    "warn": `rgb(163, 23, 23)`,
    "dark-warn": `rgb(110, 5, 5, .5)`,
    "gray": `rgb(139, 139, 139)`,
    "dark-gray": `rgb(83, 82, 82)`,
};

const Button: FC<IButton> = ({
    className,
    icon,
    text,
    color = "blue",
    outline = false,
    textColor,
    ...props
}) => {
    const classNames = className?className:"";

    const style = {
        "--background": colors[color],
        "--hover": colors["dark-" + color],
        "--color": textColor?"gray": colors[color],
    } as CSSProperties;

    return (
    <button {...props} style={style} className={`${classNames} ${styles.btn} ${outline?styles.outline:""}`}>
        {icon?<FontAwesomeIcon icon={icon}/>:null}
        {text?<span>{text}</span>:null}
    </button>
 )
};
export default Button;