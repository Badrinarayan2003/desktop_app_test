import apiClient from "../apiClient";

export async function getSubCategoryByCategory(catgId) {
    try {
        const response = await apiClient.get(
            `/brand/select/subcatg?catgId=${catgId}`
        );

        console.log(
            response.data,
            "get sub category response"
        );

        return response.data;
    } catch (error) {
        console.log(
            error,
            "get sub category error"
        );

        throw error;
    }
}