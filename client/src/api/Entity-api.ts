import instance from "./default";

class EntityAPI {
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