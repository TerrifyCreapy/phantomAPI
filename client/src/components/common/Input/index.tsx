import { FC, InputHTMLAttributes } from "react";

import styles from "./Input.module.scss";

function getVariant(variant?: string) {
    switch (variant) {
        default: {
            return styles.default;
        }
    }
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: string;
    placeholder?: string;
    className?: string;
}

const Input: FC<InputProps> = ({ variant, placeholder = "", className= "", ...props }) => {
    return <input {...props} className={`${getVariant(variant)} ${className}`} placeholder={placeholder} />;
};
export default Input;
