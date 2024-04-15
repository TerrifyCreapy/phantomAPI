import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IProject from "interfaces/entities/IProject";
import IReduceProject from "interfaces/entities/IReducedProject";

type InitialStateType = {
    isLoadingProject: boolean;
    project: IProject | null;
    entityJson: string;
    errorProject: string;
}

const initialState: InitialStateType = {
    isLoadingProject: true,
    project: null,
    entityJson: "[]",
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

        setJsonSuccess(state, action: PayloadAction<{id: number, count: number}>) {
            console.log(action.payload, state.entityJson);
            if(state.project && state.project.entities) state.project.entities.rows = state.project.entities.rows.map(e => {
                if(e.id === action.payload.id) return {
                    ...e,
                    item_count: action.payload.count,
                };
                return e;
            });
            console.log(state.project?.entities.rows, "123");
        },
        setJSONNew(state, action: PayloadAction<string>) {
            state.entityJson = action.payload;
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