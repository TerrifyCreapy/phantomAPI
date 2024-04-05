import { AppDispatch } from "stores/store";
import { projectsSlice } from "./ProjectSlice";
import ProjectsAPI from "api/Projects-api";
import IReduceProject from "interfaces/entities/IReducedProject";

export const fetchProjects = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectsSlice.actions.setLoading(true));
        const response = await ProjectsAPI.getProjects();
        dispatch(projectsSlice.actions.setProjectsSuccess(response?.rows || []));
        dispatch(projectsSlice.actions.setMaxEntities(response?.maxEntities || 0));
    }
    catch (e: any) {
        dispatch(projectsSlice.actions.projectError("error"))
    }
};

export const createProject = (name: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectsSlice.actions.setLoading(true));
        const response = await ProjectsAPI.createProject(name);
        dispatch(projectsSlice.actions.createProjectSuccess(response as IReduceProject));
    }
    catch (e: any) {
        dispatch(projectsSlice.actions.projectError("error"));
    }
};

export const removeProject = (link: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectsSlice.actions.setLoading(true));
        const response = await ProjectsAPI.removeProject(link);
        dispatch(projectsSlice.actions.removeProjectsSuccess(link));
    }
    catch (e: any) {
        dispatch(projectsSlice.actions.projectError("error"));
    }
}