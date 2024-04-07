import IUserResponse from "interfaces/common/IUserResponse";
import instance from "./default";

class UserAPI {
    public static async login(email: string, password: string) {
        try {
            const response = await instance.post<IUserResponse>("/auth/login", {
                email, password,
            });
            return response.data;
        }
        catch (e: any) {
            console.log(e.message);
            return {} as IUserResponse;
        }

    }
    public static async me() {
        try {
            const refresh = localStorage.getItem("refreshToken");
            if (!refresh) return null;
            const response = await instance.post<IUserResponse>("/auth/me", {
                refresh,
            });
            return response.data;
        }
        catch (e: any) {
            console.log(e.message);
        }

    }

    public static async register(email: string, password: string) {
        const response = await instance.post<IUserResponse>("/auth/register", {
            email, password,
        });
        return response.data;

    }
}

export default UserAPI;