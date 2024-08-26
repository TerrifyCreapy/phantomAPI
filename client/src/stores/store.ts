import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/User/UserSlice";
import projectsReducer from "./reducers/Projects/ProjectSlice";
import projectReducer from "./reducers/Project/ProjectSlice";


const rootReducer = combineReducers({
    userReducer,
    projectsReducer,
    projectReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];