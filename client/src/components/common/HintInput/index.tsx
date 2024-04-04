import {FC, ChangeEvent} from "react"

import styles from "./HintInput.module.scss";

import Input from "../Input";

type HintInputType = {
    text: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => unknown;
    type?: string;
    classname?: string;
}

const HintInput: FC<HintInputType> = ({
    text, value, onChange, classname, type = "text",
}) => {
    const classNames = classname || "";
    return (
    <div className={classNames}>
                    <label className={styles.input__form_label}>{text}</label>
                    <Input
                        type={type}
                        value={value}
                        onChange={onChange}
                        autoComplete="false"
                    />
    </div>
 )
};
export default HintInput;