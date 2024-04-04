import UserAPI from "api/User-api";
import { AppDispatch } from "stores/store";
import { userSlice } from "./UserSlice";
import IUser from "interfaces/entities/IUser";
import IUserResponse from "interfaces/common/IUserResponse";

function setting(data: IUserResponse) {

    const user: IUser = {
        email: data.email,
    }

    const { refresh, access } = data;

    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh as string);
    return user;

}

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.login());
        const response = await UserAPI.login(email, password);

        const user = setting(response);

        dispatch(userSlice.actions.loginSuccess(user));
    }
    catch (e: any) {
        dispatch(userSlice.actions.loginError(e.response.data));
    }
}

export const me = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.loading());
        const response = await UserAPI.me();
        console.log(response);
        if (!response || !response.email) dispatch(userSlice.actions.me(null));
        else dispatch(userSlice.actions.me({ email: response.email }));
        const { access } = (response || { access: "" });
        localStorage.setItem("accessToken", access);
    }
    catch (e: any) {
        dispatch(userSlice.actions.me(null));
    }
}

export const register = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.login());
        const response = await UserAPI.register(email, password);
        const user = setting(response);
        dispatch(userSlice.actions.loginSuccess(user));

    }
    catch (e: any) {
        dispatch(userSlice.actions.loginError(e.response.data));
    }
}