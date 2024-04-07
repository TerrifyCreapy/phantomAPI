import useAppSelector from "hooks/useAppSelector";
import { Routes } from "constants/routes";
import {ChangeEvent, Dispatch, FC, SetStateAction, createContext, useEffect, useState} from "react";
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
import { createEntity, fetchProject, getData, removeEntity, updateEntity } from "stores/reducers/Project/ActionCreators";
import IProject from "interfaces/entities/IProject";
import { resetError } from "stores/reducers/Project/ProjectSlice";
import ResourceEdit from "components/ProjectSettings/ResourceEdit";

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
    entityJson: string;
    isLoading: boolean;
    resetError: () => unknown;
    remove: (id: number) => unknown;
    onLoadData: (id: number) => unknown;
    onUpdate: (id: number, name: string, value: string) => unknown;
}

export const ProjectsContext = createContext<ProjectsContextType>({} as ProjectsContextType); 

export const ProjectSettingsContext = createContext<ProjectSettingsContextType>({} as ProjectSettingsContextType);

export const ProjectContext = createContext<ProjectContextType>({} as ProjectContextType);

const ProjectsPage: FC = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const {user, error, isLoading} = useAppSelector(state => state.userReducer);
    const {projects, maxEntities, loaded} = useAppSelector(state => state.projectsReducer);
    const {project, isLoadingProject, errorProject, entityJson} = useAppSelector(state => state.projectReducer);
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

    const [entityName, setEntityName] = useState<string>("");
    const [entityValue, setEntityValue] = useState<string>("[]");

    function changeName(e: ChangeEvent<HTMLInputElement>) {
        setEntityName(e.target.value);
    }

    function changeEntityValue(e: ChangeEvent<HTMLTextAreaElement>) {
        setEntityValue(e.target.value);
    }


    function onCreateEntity() {
        if(id) dispatch(createEntity(entityName, id, entityValue));
        setEntityName("");
    };

    function onLoadValue(id: number) {
        dispatch(getData(id));
    }

    function onUpdateEntity(id: number, name: string, value: string) {
        dispatch(updateEntity(id, name, value));
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
                    entityJson: entityJson,
                    onLoadData: onLoadValue,
                    onUpdate: onUpdateEntity,
                }}>
                    <Outlet/>
                </ProjectContext.Provider>
                
            </Container> 
            <Portal id="root">
                    <Modal isOpen={openModal} setOpen={setOpenModal}>
                        <CreateProject/>
                    </Modal>
                    <Modal isOpen={openResource} setOpen={() => setOpenResource(false)} maxWidth="50">
                        <ProjectsSettings
                            action="создать"
                            text=""
                            color="success"
                            onClick={onCreateEntity}
                            onCancel={() => setOpenResource(false)}
                        >
                            <ResourceEdit 
                                path={`http://${id}.localhost:7000/api/v0.1/`} 
                                name={entityName} 
                                changeName={changeName}
                                value={entityValue}
                                changeValue={changeEntityValue}
                            />
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