import { Routes } from "constants/routes";
import WelcomePage from "pages/WelcomePage";
import { IBrowserRouter } from "interfaces/common/IBrowserRouter";
import AuthPage from "pages/AuthPage";
import ProjectsPage from "pages/ProjectsPage";
import ProjectsContainer from "components/common/Containers/ProjectsContainer";
import ProjectContainer from "components/common/Containers/ProjectContainer";

export const routes: IBrowserRouter[] = [
    {
        path: Routes.MAIN_PATH,
        element: <WelcomePage />,
    },
    {
        path: Routes.AUTH_PATH,
        element: <AuthPage />,
    },
    {
        path: Routes.PROJECTS_PATH,
        element: <ProjectsPage  />,
        outlet: [
            {
                path: Routes.PROJECTS_MAIN_PATH,
                element: <ProjectsContainer/>
            },
            {
                path: Routes.PROJECTS_ONE_PATH,
                element: <ProjectContainer/>
            }
        ]
    }
];
