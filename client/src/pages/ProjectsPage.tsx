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

export const ProjectsContext = createContext<ProjectsContextType>({} as ProjectsContextType); 

export const ProjectSettingsContext = createContext<ProjectSettingsContextType>({} as ProjectSettingsContextType);

const ProjectsPage: FC = () => {


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

    function openResourceModal() {
        setOpenResource(true);
    }

    function openSettingsModal() {
        setOpenSettings(true);
    }

    function openRemoveModal() {
        setOpenRemove(true);
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
                <Outlet/>
            </Container> 
            <Portal id="root">
                    <Modal isOpen={openModal} setOpen={setOpenModal}>
                        <CreateProject/>
                    </Modal>
                    <Modal isOpen={openResource} setOpen={() => setOpenResource(false)}>
                        Создание ресурса
                    </Modal>
                    <Modal isOpen={openSettings} setOpen={() => setOpenSettings(false)}>
                        Настройка проекта
                    </Modal>
                    <Modal isOpen={openRemove} setOpen={() => setOpenRemove(false)} missClose={false}>
                        Удалить проект?
                    </Modal>
            </Portal>
        </ProjectsContext.Provider>
        
    )
};
export default ProjectsPage;