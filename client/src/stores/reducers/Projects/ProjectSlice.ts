import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IReduceProject from "interfaces/entities/IReducedProject";

type InitialStateType = {
    isLoading: boolean;
    projects: IReduceProject[];
    maxEntities: number;
    error: string;
    loaded: boolean;
}

const initialState: InitialStateType = {
    isLoading: true,
    projects: [],
    maxEntities: 0,
    error: "",
    loaded: false,
}

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loaded = true;
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

        removeProjectsSuccess(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = "";
            state.projects = state.projects.filter(e => e.link !== action.payload);
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

export default projectsSlice.reducer;