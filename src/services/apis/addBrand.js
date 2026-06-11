import apiClient from "../apiClient";

export async function addBrand(payload) {
    try {
        const response = await apiClient.post(
            "/brand/add",
            payload
        );

        console.log(
            response.data,
            "add brand response"
        );

        return response.data;
    } catch (error) {
        console.log(
            error,
            "add brand error"
        );

        throw error;
    }
}