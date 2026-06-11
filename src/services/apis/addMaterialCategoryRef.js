import apiClient from "../apiClient";

export async function addMaterialCategoryRef(catgName) {
    try {
        const response = await apiClient.post(
            `/material/cateRef/add?catgName=${encodeURIComponent(catgName)}`
        );

        console.log(
            response.data,
            "add material category ref response"
        );

        return response.data;
    } catch (error) {
        console.log(
            error,
            "add material category ref error"
        );
        throw error;
    }
}