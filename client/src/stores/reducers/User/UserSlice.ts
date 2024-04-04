import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser from "interfaces/entities/IUser";

type UserState = {
    user: IUser | null;
    isLoading: boolean;
    error: string;
};

const initialState: UserState = {
    user: null,
    isLoading: true,
    error: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state) {
            state.isLoading = true;
        },
        loginSuccess(state, action: PayloadAction<any>) {
            state.isLoading = false;
            state.user = action.payload;
            state.error = "";
        },
        loginError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        loading(state) {
            state.isLoading = true;
        },
        me(state, action: PayloadAction<IUser | null>) {
            state.isLoading = false;
            state.user = action.payload;
        }

    }
});

export default userSlice.reducer;

