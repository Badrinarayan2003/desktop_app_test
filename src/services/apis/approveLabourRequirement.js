import apiClient from "../apiClient";

export async function approveLabourRequirement(
    payload
) {
    try {
        const response =
            await apiClient.put(
                "/labour/requirement/approve",
                payload
            );

        console.log(
            response.data,
            "approve labour requirement response"
        );

        return response.data;
    } catch (error) {
        console.log(
            error,
            "approve labour requirement error"
        );

        throw error;
    }
}