import Input from "components/common/Input";
import {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import styles from "./ResourceEdit.module.scss";

type ResourceEditType = {
    path: string;
    name: string;
    value: string;
    changeName: (e: ChangeEvent<HTMLInputElement>) => unknown;
    changeValue: (e: ChangeEvent<HTMLTextAreaElement>) => unknown;
}

const ResourceEdit: FC<ResourceEditType> = ({path, name, changeName, value, changeValue}) => {

    function keyDownText(e: any) {
        if(e.keyCode === 9) {
            e.preventDefault();
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>resource name:</h2>
            <div className={styles.path}>
                <span className={styles.path__text}>{path}</span>
                <Input type="text" variant="invisible" placeholder="items, users" value={name} onChange={changeName}/>
            </div>
            <textarea className={styles.code} onKeyDown={keyDownText} value={value} onChange={changeValue} name="json_code" id="json_code"></textarea>
        </div>
 )
};
export default ResourceEdit;