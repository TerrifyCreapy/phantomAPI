import instance from "./default";

class EntityAPI {

    public static async getOne(id: number): Promise<string> {
        try {
            const response = await instance.get<string>(`/entity/one/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            if (typeof response.data !== "string") return JSON.stringify(response.data, null, 2);
            return response.data;
        }
        catch (e: any) {
            return "[]";
        }
    }

    public static async add(name: string, link: string, value: Array<any> | string) {
        try {
            const response = await instance.post(`/entity`, {
                name, link, value
            },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    }
                });
            return response.data;
        }
        catch (e: any) {

        }
    }

    public static async update(id: number, name: string, value: string) {
        try {
            console.log(value);
            const response = await instance.patch(`/entity/${id}`, {
                name, value,
            },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    }
                });
            return response.data;
        }
        catch (e: any) {

        }
    }

    public static async remove(id: number) {
        try {
            const response = await instance.delete(`/entity/${id}`, {
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

export default EntityAPI;