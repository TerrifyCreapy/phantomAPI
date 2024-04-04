import IProjectsResponse from "interfaces/common/IProjectsResponse";
import UserAPI from "./User-api";
import instance from "./default";
import IReduceProject from "interfaces/entities/IReducedProject";

class ProjectsAPI {

    private static async checkTokens(): Promise<boolean> {
        if (!localStorage.getItem("refreshToken")) {
            return false;
        }

        if (!localStorage.getItem("accessToken")) {
            const user = await UserAPI.me();
            if (!user) return false;
        }

        return true;
    }


    public static async createProject(name: string) {
        try {

            const auth = await this.checkTokens();

            if (!auth) return;

            const response = await instance.post<IReduceProject>("/project", {
                name
            },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
            return response.data;
        }
        catch (e: any) {

        }

    }
    public static async getProjects() {
        try {
            const auth = await this.checkTokens();

            if (!auth) return;

            const response = await instance.get<IProjectsResponse>("/project", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });


            return response.data;
        }
        catch (e: any) {

        }
    }
}

export default ProjectsAPI;