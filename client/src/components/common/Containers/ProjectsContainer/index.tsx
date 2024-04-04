import Container from "components/common/Container";
import {FC, useContext, useEffect} from "react"

import styles from "./ProjectsContainer.module.scss";
import ProjectPreview from "components/ProjectPreview";
import { ProjectsContext } from "pages/ProjectsPage";

const ProjectsContainer: FC = () => {

    const {projects, getProjects, maxEntities} = useContext(ProjectsContext);
    
    useEffect(() => {
        getProjects();
    }, [])

    return (
       <section className={styles.projects_grid}>
        {projects.map(e => {
            return <ProjectPreview link={e.link} name={e.name} key={e.link} entity_count={e.entity_count} maxEntities={maxEntities}/>
        })}
       </section>
 )
};
export default ProjectsContainer;