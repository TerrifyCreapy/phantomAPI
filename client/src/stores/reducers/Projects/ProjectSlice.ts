import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IReduceProject from "interfaces/entities/IReducedProject";

type InitialStateType = {
    isLoading: boolean;
    projects: IReduceProject[];
    maxEntities: number;
    error: string;
}

const initialState: InitialStateType = {
    isLoading: true,
    projects: [],
    maxEntities: 0,
    error: "",
}

export const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        createProjectSuccess(state, action: PayloadAction<IReduceProject>) {
            state.isLoading = false;
            state.error = "";
            state.projects.push(action.payload);
        },
        setProjectsSuccess(state, action: PayloadAction<IReduceProject[]>) {
            state.isLoading = false;
            state.error = "";
            state.projects = action.payload;
        },
        setMaxEntities(state, action: PayloadAction<number>) {
            state.maxEntities = action.payload;
        },
        projectError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

export default projectSlice.reducer;