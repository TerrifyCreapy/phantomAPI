import EntityPreview from "components/EntityPreview";
import { Routes } from "constants/routes";
import { ProjectContext } from "pages/ProjectsPage";
import {FC, useContext, useEffect} from "react"
import { useNavigate, useParams } from "react-router";
import styles from "./ProjectContainer.module.scss";

const ProjectContainer: FC = () => {
    const {id} = useParams();

    const {project, error, isLoading, resetError, remove} = useContext(ProjectContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(error, isLoading);
        if(error.length && error.includes("404") && !isLoading) {
            resetError();
            navigate(Routes.PROJECTS_PATH);
        }
    }, [error, isLoading, navigate, resetError]);

    const path = `http://${id}.192.168.1.64:7000/api/v0.1`

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{project?.name}</h1>
            <p className={styles.info}>
                <span className={styles.info__title}>
                    API address
                </span>
                <span className={styles.info__address}>
                    {path + "/:endpoint"}
                </span>
            </p>
            <ul className={styles.entities}>
                {project?.entities?.rows.map(e => {
                    return <EntityPreview key={e.id} id={e.id} endpoint={e.name} item_count={e.item_count} path={`${path}/${e.name}`} remove={remove}/>
                })}
            </ul>
        </div>
 )
};
export default ProjectContainer;