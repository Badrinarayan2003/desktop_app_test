import apiClient from "../apiClient";

export async function getLabourRequirementDetail(
    requirementId
) {
    try {
        const response =
            await apiClient.get(
                `/labour/requirement/detail/${requirementId}`
            );

        console.log(
            response.data,
            "get labour requirement detail response"
        );

        return response.data;
    } catch (error) {
        console.log(
            error,
            "get labour requirement detail error"
        );

        throw error;
    }
}