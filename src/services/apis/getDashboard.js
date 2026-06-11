import apiClient from "../apiClient";

export async function getDashboard() {
    try {
        const response =
            await apiClient.get(
                "/dashboard"
            );

        console.log(
            response.data,
            "get dashboard response"
        );

        return response.data;
    } catch (error) {
        console.log(
            error,
            "get dashboard error"
        );

        throw error;
    }
}