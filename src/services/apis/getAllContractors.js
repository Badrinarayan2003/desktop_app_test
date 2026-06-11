import apiClient from "../apiClient";

export async function getAllContractors() {
    try {
        const response =
            await apiClient.get(
                "/user/contractor/all"
            );

        console.log(
            response.data,
            "get all contractors response"
        );

        return response.data;
    } catch (error) {
        console.log(
            error,
            "get all contractors error"
        );

        throw error;
    }
}