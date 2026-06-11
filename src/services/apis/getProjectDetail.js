import apiClient from "../apiClient";

export async function getProjectDetail(projectId) {
    try {
        const response =
            await apiClient.get(
                `/project/detail/${projectId}`
            );

        console.log(
            response.data,
            "get project detail response"
        );

        return response.data;
    } catch (error) {
        console.log(
            error,
            "get project detail error"
        );

        throw error;
    }
}