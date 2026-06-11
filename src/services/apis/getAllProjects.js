import apiClient from "../apiClient";

export async function getAllProjects() {
    try {
        const response =
            await apiClient.get(
                "/project/all"
            );

        console.log(
            response.data,
            "get all projects response"
        );

        return response.data;
    } catch (error) {
        console.log(
            error,
            "get all projects error"
        );

        throw error;
    }
}