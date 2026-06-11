import apiClient from "../apiClient";

export async function approveLabourSupply(applicationId) {
    try {

        const response = await apiClient.put(
            `/labour/supply/application/${applicationId}/approve`
        );

        console.log(
            response.data,
            "approve labour supply response"
        );

        return response.data;

    } catch (error) {

        console.log(
            error,
            "approve labour supply error"
        );

        throw error;
    }
}