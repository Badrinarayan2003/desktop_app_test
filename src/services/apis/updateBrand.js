import apiClient from "../apiClient";

export async function updateBrand(payload) {
    try {
        const response = await apiClient.put(
            "/brand/update",
            payload
        );

        console.log(
            response.data,
            "update brand response"
        );

        return response.data;
    } catch (error) {
        console.log(
            error,
            "update brand error"
        );

        throw error;
    }
}