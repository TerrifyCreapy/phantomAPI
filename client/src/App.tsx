import { Routes } from "react-router";

import Header from "./components/Header";
import { mapRoutes } from "./utils/mapRoutes";
import { routes } from "./routes";
import useAppSelector from "./hooks/useAppSelector";
import { useEffect } from "react";
import useAppDispatch from "./hooks/useAppDispatch";
import { me } from "stores/reducers/User/ActionCreators";
import Modal from "components/common/Modal";
import CreateProject from "components/common/Forms/CreateProjectForm";

function App() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(me());
    },[])

    return (
        <div className="App">
            <Header />
            <Routes>{mapRoutes(routes)}</Routes>
        </div>
    );
}

export default App;
