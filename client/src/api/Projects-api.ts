import IProjectsResponse from "interfaces/common/IProjectsResponse";
import UserAPI from "./User-api";
import instance from "./default";
import IReduceProject from "interfaces/entities/IReducedProject";
import IProject from "interfaces/entities/IProject";

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

    public static async getProject(link: string): Promise<IProject | string | undefined> {
        try {
            const auth = await this.checkTokens();

            if (!auth) return;
            const response = await instance.get<IProject>(`/project/${link}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                }
            });
            return response.data;
        }
        catch (e: any) {
            console.log("e", e.message);
            return e.message;
        }
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
    public static async removeProject(link: string) {
        try {
            const auth = await this.checkTokens();

            if (!auth) return;
            const response = await instance.delete(`/project/${link}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                }
            });
            return response.data;
        }
        catch (e: any) {

        }
    }
}

export default ProjectsAPI;