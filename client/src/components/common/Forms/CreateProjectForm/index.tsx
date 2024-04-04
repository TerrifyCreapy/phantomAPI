import {ChangeEvent, FC, MouseEvent, SyntheticEvent, useContext, useState} from "react";
import styles from "./CreateProject.module.scss";
import Input from "components/common/Input";
import Button from "components/common/Buttons/Button";
import { ProjectsContext } from "pages/ProjectsPage";

const CreateProject: FC = () => {

    const [name, setName] = useState<string>("");
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const {createProject, setOpenModal} = useContext(ProjectsContext);

    function touched() {
        if(isTouched) return;
        setIsTouched(true);
        if(!name.length) setError("Имя не должно быть пустым!");        
    }

    function nameChange(e: ChangeEvent<HTMLInputElement>) {
        if(!e.target.value.length) setError("Имя не должно быть пустым!");
        else setError("");
        setName(e.target.value);
    }

    function isError() {
        console.log(error, error.length);
        if(isTouched && error.length) return true;
        return false;
    }

    function onSubmit() {
        createProject(name);
        setOpenModal(false);
    }

    function onCancel(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        e.preventDefault();
        setOpenModal(false);
    }

    return (
        <form className={styles.control} action="submit" onSubmit={onSubmit}>
            <h1 className={styles.control__title}>новый проект</h1>
            <Input placeholder="Введите название" className={styles.control__input} onBlur={touched} value={name} onChange={nameChange}/>
            {isError() && <span className={styles.control__error}>{error}</span>}
            <div className={styles.control__buttons}>
                <Button type="submit" className={styles.control__button} disabled={(isTouched && error.length) || !name.length?true:false} onClick={onSubmit} text="создать"/>
                <Button className={styles.control__button} onClick={onCancel} text="отменить"/>
            </div>
        </form>
 )
};
export default CreateProject;