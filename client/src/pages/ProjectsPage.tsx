import useAppSelector from "hooks/useAppSelector";
import { Routes } from "constants/routes";
import {Dispatch, FC, SetStateAction, createContext, useEffect, useState} from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import ControlPanel from "components/ControlPanel";
import Container from "components/common/Container";
import useAppDispatch from "hooks/useAppDispatch";
import { createProject, fetchProjects, removeProject } from "stores/reducers/Projects/ActionCreators";
import IReduceProject from "interfaces/entities/IReducedProject";
import Portal from "components/common/Portal";
import Modal from "components/common/Modal";
import CreateProject from "components/common/Forms/CreateProjectForm";
import ProjectsSettings from "components/ProjectSettings";
import Remove from "components/ProjectSettings/Remove";
import { fetchProject, removeEntity } from "stores/reducers/Project/ActionCreators";
import IProject from "interfaces/entities/IProject";
import { resetError } from "stores/reducers/Project/ProjectSlice";

type ProjectsContextType = {
    getProjects: () => unknown;
    createProject: (name: string) => unknown;
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>
    projects: IReduceProject[];
    maxEntities: number;
};

type ProjectSettingsContextType = {
    add: () => unknown;
    settings: () => unknown;
    remove: () => unknown;
};

type ProjectContextType = {
    project: IProject | null;
    error: string;
    isLoading: boolean;
    resetError: () => unknown;
    remove: (id: number) => unknown;
}

export const ProjectsContext = createContext<ProjectsContextType>({} as ProjectsContextType); 

export const ProjectSettingsContext = createContext<ProjectSettingsContextType>({} as ProjectSettingsContextType);

export const ProjectContext = createContext<ProjectContextType>({} as ProjectContextType);

const ProjectsPage: FC = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const {user, error, isLoading} = useAppSelector(state => state.userReducer);
    const {projects, maxEntities, loaded} = useAppSelector(state => state.projectsReducer);
    const {project, isLoadingProject, errorProject} = useAppSelector(state => state.projectReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if((!user || error.length) && !isLoading) {
            navigate(Routes.MAIN_PATH);
        } 
        else {
            if(id) {
                dispatch(fetchProject(id));
            }
        }

    }, [user, error, navigate, isLoading, projects, dispatch, id]);

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openResource, setOpenResource] = useState<boolean>(false);
    const [openSettings, setOpenSettings] = useState<boolean>(false);
    const [openRemove, setOpenRemove] = useState<boolean>(false);

    function getProjects() {
        if(loaded) return;
        dispatch(fetchProjects());
    }

    function createProjectFunc(name: string) {
        dispatch(createProject(name));
    }

    function onRemoveEntity(id: number) {
        if(id) {
            dispatch(removeEntity(id));
        }
    }

    function onRemoveProject() {
        if(id) {
            dispatch(removeProject(id));
            setOpenRemove(false);
        }
    }

    function openResourceModal() {
        setOpenResource(true);
    }

    function openSettingsModal() {
        setOpenSettings(true);
    }

    function openRemoveModal() {
        setOpenRemove(true);
    }

    function onResetError() {
        dispatch(resetError());
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
                <ProjectSettingsContext.Provider value={{
                    add: openResourceModal,
                    remove: openRemoveModal,
                    settings: openSettingsModal,
                }}>
                    <ControlPanel/>
                </ProjectSettingsContext.Provider>
                <ProjectContext.Provider value={{
                    project,
                    error: errorProject,
                    isLoading: isLoadingProject,
                    resetError: onResetError,
                    remove: onRemoveEntity,
                }}>
                    <Outlet/>
                </ProjectContext.Provider>
                
            </Container> 
            <Portal id="root">
                    <Modal isOpen={openModal} setOpen={setOpenModal}>
                        <CreateProject/>
                    </Modal>
                    <Modal isOpen={openResource} setOpen={() => setOpenResource(false)}>
                        <ProjectsSettings
                            action="создать"
                            text="создание ресурса"
                            color="success"
                            onClick={() => 1}
                            onCancel={() => setOpenResource(false)}
                        >
                            <span> Вы действительно хотите создать ресурс?</span>
                        </ProjectsSettings>
                    </Modal>
                    <Modal isOpen={openSettings} setOpen={() => setOpenSettings(false)}>
                    <ProjectsSettings
                            action="сохранить"
                            text="создание ресурса"
                            color="success"
                            onClick={() => 1}
                            onCancel={() => setOpenSettings(false)}
                        >
                            <span> Вы действительно хотите настроить проект?</span>
                        </ProjectsSettings>
                    </Modal>
                    <Modal isOpen={openRemove} setOpen={() => setOpenRemove(false)} missClose={false}>
                        <ProjectsSettings
                            action="удалить"
                            text="удалить проект?"
                            color="warn"
                            outline
                            onClick={onRemoveProject}
                            onCancel={() => setOpenRemove(false)}
                        >
                            <Remove/>
                        </ProjectsSettings>
                    </Modal>
                    
            </Portal>
        </ProjectsContext.Provider>
        
    )
};
export default ProjectsPage;