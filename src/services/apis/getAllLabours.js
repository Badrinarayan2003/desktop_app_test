import apiClient from "../apiClient";

export async function getAllLabours() {
    try {
        const response =
            await apiClient.get(
                "/user/labour/all"
            );

        console.log(
            response.data,
            "get all labours response"
        );

        return response.data;
    } catch (error) {
        console.log(
            error,
            "get all labours error"
        );

        throw error;
    }
}