import { AppDispatch } from "stores/store";
import { projectSlice } from "./ProjectSlice";
import ProjectsAPI from "api/Projects-api";
import IProject from "interfaces/entities/IProject";
import EntityAPI from "api/Entity-api";


export const fetchProject = (link: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectSlice.actions.setLoading(true));
        const response = await ProjectsAPI.getProject(link);

        if (typeof response === "string") throw new Error(response);

        if (response)
            dispatch(projectSlice.actions.setProjectSuccess(response as IProject));

    }
    catch (e: any) {
        dispatch(projectSlice.actions.setProjectError(e.message));
    }
};

export const removeEntity = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectSlice.actions.setLoading(true));
        const response = await EntityAPI.remove(id);
        dispatch(projectSlice.actions.setRemoveEntitySuccess(id));
        console.log(response);
    }
    catch (e: any) {

    }
}