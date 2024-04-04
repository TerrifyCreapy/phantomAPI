import {FC} from "react";
import styles from "./ProjectPreview.module.scss";
import { NavLink } from "react-router-dom";
import { Routes } from "constants/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

type ProjectPreviewType = {
    link: string;
    name: string;
    maxEntities: number;
    entity_count: number;
}


const ProjectPreview: FC<ProjectPreviewType> = ({link, name, maxEntities, entity_count}) => {

    return (
        <div className={styles.project}>
            <NavLink to={Routes.PROJECTS_PATH + `/${link}`} className={styles.project__title}>
                <span>{name}</span>
                <FontAwesomeIcon icon={faArrowRight}/>
            </NavLink>
            <div className={styles.project__info}>
                <span className={styles.project__info_progress}>
                    <span className={styles.project__info_progress_fill} style={{"width": `${100 / maxEntities * entity_count}%`}}></span>
                </span>
                <span>{entity_count}/{maxEntities} ресурсов</span>
            </div>
        </div>
 )
};
export default ProjectPreview;