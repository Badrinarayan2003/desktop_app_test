import apiClient from "../apiClient";

export async function getAllMaterialCategories() {
    try {
        const response = await apiClient.get(
            "/material/category/all"
        );

        console.log(response.data, "res of all material categories");

        return response.data;

    } catch (error) {
        console.log(error, "err of all material categories");
        throw error;
    }
}