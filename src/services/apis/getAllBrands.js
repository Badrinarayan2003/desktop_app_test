import apiClient from "../apiClient";

export async function getAllBrands() {
    try {
        const response = await apiClient.get(
            "/brand/all"
        );

        console.log(
            response.data,
            "get all brands response"
        );

        return response.data;
    } catch (error) {
        console.log(
            error,
            "get all brands error"
        );
        throw error;
    }
}