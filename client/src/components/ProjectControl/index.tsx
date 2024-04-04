import {FC} from "react";
import Button from "components/common/Buttons/Button";

import styles from "./ProjectControl.module.scss";
import { faCog, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";


const ProjectControl: FC = () => {
    return (
        <div className={styles.section}>
            <Button text="добавить ресурс" icon={faPlus} color="success" />
            <Button icon={faCog} color="gray" outline/>
            <Button icon={faTrash} color="warn" outline/>
        </div>
 )
};
export default ProjectControl;