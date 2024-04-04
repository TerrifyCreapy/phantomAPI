import IReduceProject from "interfaces/entities/IReducedProject";

interface IProjectsResponse {
    rows: IReduceProject[],
    count: number;
    maxEntities: number;
}

export default IProjectsResponse;