export interface IBrowserRouter {
    path: string;
    element: unknown;
    outlet?: IBrowserRouter[];
}