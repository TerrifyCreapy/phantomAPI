import {CSSProperties, FC, InputHTMLAttributes, useState} from "react";
import styles from "./SwitchInput.module.scss";

type SwitchInputType = {
    hint: string;
    checked?: boolean;
    onClick: () => unknown;
}

const SwitchInput: FC<SwitchInputType> = ({
    hint, checked, onClick
}) => {

    return (
        <div className={styles.container} onClick={onClick}>
            <label className={styles.switch} >
                <input className={styles.switch__input} checked={checked} onChange={() => 1} type="checkbox"/>
                <span className={styles.switch__slider}></span>
            </label>
            <span className={styles.hint}>{hint}</span>
        </div>
            
       
        
 )
};
export default SwitchInput;