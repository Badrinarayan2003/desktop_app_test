import apiClient from "../apiClient";

export async function getLabourSupplyApplicationDetail(applicationId) {
    try {

        const response = await apiClient.get(
            `/labour/supply/application/${applicationId}/detail`
        );

        console.log(
            response.data,
            "labour supply application detail response"
        );

        return response.data;

    } catch (error) {

        console.log(
            error,
            "labour supply application detail error"
        );

        throw error;
    }
}