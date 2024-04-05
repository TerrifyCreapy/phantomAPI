import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IProject from "interfaces/entities/IProject";
import IReduceProject from "interfaces/entities/IReducedProject";

type InitialStateType = {
    isLoadingProject: boolean;
    project: IProject | null;
    errorProject: string;
}

const initialState: InitialStateType = {
    isLoadingProject: true,
    project: null,
    errorProject: "",
}

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoadingProject = action.payload;
        },
        setProjectSuccess(state, action: PayloadAction<IProject>) {
            state.isLoadingProject = false;
            state.errorProject = "";
            state.project = action.payload;
        },
        setProjectError(state, action: PayloadAction<string>) {
            state.errorProject = action.payload;
            state.isLoadingProject = false;
        },

        setRemoveEntitySuccess(state, action: PayloadAction<number>) {
            if (!state.project) return;
            state.project.entities.rows = state.project?.entities.rows.filter(e => e.id !== action.payload);
        },

        resetError(state) {
            state.errorProject = "";
        }
    }
});

export const { resetError } = projectSlice.actions;

export default projectSlice.reducer;