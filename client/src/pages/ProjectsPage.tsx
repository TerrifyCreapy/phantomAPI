import useAppSelector from "hooks/useAppSelector";
import { Routes } from "constants/routes";
import {Dispatch, FC, SetStateAction, createContext, useEffect, useState} from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import ControlPanel from "components/ControlPanel";
import Container from "components/common/Container";
import useAppDispatch from "hooks/useAppDispatch";
import { createProject, fetchProjects } from "stores/reducers/Projects/ActionCreators";
import IReduceProject from "interfaces/entities/IReducedProject";
import Portal from "components/common/Portal";
import Modal from "components/common/Modal";
import CreateProject from "components/common/Forms/CreateProjectForm";
import ProjectControl from "components/ProjectControl";

type ProjectsContextType = {
    getProjects: () => unknown;
    createProject: (name: string) => unknown;
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>
    projects: IReduceProject[];
    maxEntities: number;
}

export const ProjectsContext = createContext<ProjectsContextType>({} as ProjectsContextType); 

const ProjectsPage: FC = () => {

    const {id} = useParams();

    const {user, error, isLoading} = useAppSelector(state => state.userReducer);
    const navigate = useNavigate();
    const {projects, maxEntities, loaded} = useAppSelector(state => state.projectsReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if((!user || error.length) && !isLoading) {
            navigate(Routes.MAIN_PATH);
        } 

    }, [user, error, navigate, isLoading]);

    const [openModal, setOpenModal] = useState<boolean>(false);

    function getProjects() {
        if(loaded) return;
        dispatch(fetchProjects());
    }

    function createProjectFunc(name: string) {
        dispatch(createProject(name));
    }

    



    return (
        <ProjectsContext.Provider value={{
            getProjects,
            createProject: createProjectFunc,
            projects,
            maxEntities,
            openModal,
            setOpenModal
        }}>
            <Container>
                <ControlPanel/>
                <Outlet/>
            </Container> 
            <Portal id="root">
                    <Modal isOpen={openModal} setOpen={setOpenModal}>
                        {!id? <CreateProject/>:null}
                    </Modal>
            </Portal>
        </ProjectsContext.Provider>
        
    )
};
export default ProjectsPage;