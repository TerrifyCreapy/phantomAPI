import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import AuthContainer from "components/common/Containers/AuthContainer";
import { FC, createContext, useEffect } from "react";
import { login, register } from "stores/reducers/User/ActionCreators";
import IUser from "interfaces/entities/IUser";
import { useNavigate } from "react-router";
import { Routes } from "constants/routes";

type AuthContextType = {
    loginAction: (email: string, password: string) => unknown;
    registerAction: (email: string, password: string) => unknown;
    user: IUser | null;
    error: string;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthPage: FC = () => {

    const dispatch = useAppDispatch();
    const {error, user} = useAppSelector(state => state.userReducer);

    const navigate = useNavigate();

    
    useEffect(() => {
        console.log(user, error)
        if(user && !error) {
            navigate(Routes.PROJECTS_PATH);
        }
    }, [user, error, navigate])



    function loginAction(email: string, password: string) {
        dispatch(login(email, password));
    }

    function registerAction(email: string, password: string) {
        dispatch(register(email, password));
    }

    return (
        <AuthContext.Provider value={{
            loginAction,
            registerAction,
            user,
            error
        }}>
            <AuthContainer />
        </AuthContext.Provider>
    );
};
export default AuthPage;
