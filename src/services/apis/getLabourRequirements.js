import apiClient from "../apiClient";

export async function getLabourRequirements() {
    try {
        const response = await apiClient.get(
            "/labour/requirements"
        );

        console.log(
            response.data,
            "get labour requirements response"
        );

        return response.data;
    } catch (error) {
        console.log(
            error,
            "get labour requirements error"
        );

        throw error;
    }
}