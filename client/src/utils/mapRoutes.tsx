import { ReactNode } from "react";
import { Route } from "react-router";
import { IBrowserRouter } from "@/interfaces/common/IBrowserRouter";

export function mapRoutes(routes: IBrowserRouter[]) {
    return routes.map((route: IBrowserRouter) => {
        const element = route.element as ReactNode;
        if (route.outlet) {
            const outlets = mapRoutes(route.outlet);
            return (
                <Route key={route.path} path={route.path} element={element}>
                    {outlets}
                </Route>
            );
        } else {
            return (
                <Route key={route.path} path={route.path} element={element} />
            );
        }
    });
}
