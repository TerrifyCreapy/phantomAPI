import {FC, useContext, useState} from "react";
import styles from "./ControlPanel.module.scss";
import Button from "components/common/Buttons/Button";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Routes } from "constants/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { ProjectsContext } from "pages/ProjectsPage";
import ProjectControl from "components/ProjectControl";

const ControlPanel: FC = () => {
    const {id} = useParams();
    const {setOpenModal} = useContext(ProjectsContext);

    function openModalFunc(){
        setOpenModal(true);
    }

    return (
    <section className={styles.projects__control}>
                        <nav className={styles.projects__control_path}>
                            <NavLink to={Routes.MAIN_PATH} className={`${styles.projects__control_item} ${styles.projects__path_item}`}>home</NavLink>
                            <span className={styles.projects__path_item}>/</span>
                            <NavLink to={Routes.PROJECTS_PATH} className={`${styles.projects__control_item} ${styles.projects__path_item} ${id?"":styles.projects__control_path_active}`}>projects</NavLink>
                            {id && <>
                                <span className={styles.projects__path_item}>/</span>
                                <NavLink to={Routes.PROJECTS_PATH + `/${id}`} className={`${styles.projects__control_item} ${styles.projects__path_item} ${id?styles.projects__control_path_active:""}`}>project view</NavLink>
                            </>}
                        </nav>
                        {id?
                        <ProjectControl/>
                        :<Button className={styles.projects__control_btn} onClick={openModalFunc} icon={faFolderPlus} text="добавить проект"/>}


                        


                </section>
 )
};
export default ControlPanel;