import { AppDispatch } from "stores/store";
import { projectSlice } from "./ProjectSlice";
import ProjectsAPI from "api/Projects-api";

export const fetchProjects = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectSlice.actions.setLoading(true));
        const response = await ProjectsAPI.getProjects();
        dispatch(projectSlice.actions.setProjectsSuccess(response?.rows || []));
        dispatch(projectSlice.actions.setMaxEntities(response?.maxEntities || 0));
    }
    catch (e: any) {
        dispatch(projectSlice.actions.projectError("error"))
    }
}

export const createProject = (name: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectSlice.actions.setLoading(true));
        const response = await ProjectsAPI.createProject(name);
        if (!response) throw new Error();
        dispatch(projectSlice.actions.createProjectSuccess(response));
    }
    catch (e: any) {
        dispatch(projectSlice.actions.projectError("error"));
    }
}