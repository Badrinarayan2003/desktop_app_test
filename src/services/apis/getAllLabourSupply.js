import apiClient from "../apiClient";

export async function getAllLabourSupply() {
    try {

        const response = await apiClient.get(
            "/labour/supply/all"
        );

        console.log(
            response.data,
            "all labour supply response"
        );

        return response.data;

    } catch (error) {

        console.log(
            error,
            "all labour supply error"
        );

        throw error;
    }
}