import {FC, useContext, useState} from "react";
import Button from "components/common/Buttons/Button";

import styles from "./ProjectControl.module.scss";
import { faCog, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ProjectSettingsContext } from "pages/ProjectsPage";


const ProjectControl: FC = () => {

    const {add, settings, remove} = useContext(ProjectSettingsContext);


    return (
        <div className={styles.section}>
            <Button text="добавить ресурс" icon={faPlus} color="success" onClick={add}/>
            <Button icon={faCog} color="gray" outline onClick={settings}/>
            <Button icon={faTrash} color="warn" outline onClick={remove}/>
            
        </div>
 )
};
export default ProjectControl;