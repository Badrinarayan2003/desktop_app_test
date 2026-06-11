import apiClient from "../apiClient";

export async function getAllSellers() {
    try {
        const response =
            await apiClient.get(
                "/user/seller/all"
            );

        console.log(
            response.data,
            "get all sellers response"
        );

        return response.data;
    } catch (error) {
        console.log(
            error,
            "get all sellers error"
        );

        throw error;
    }
}