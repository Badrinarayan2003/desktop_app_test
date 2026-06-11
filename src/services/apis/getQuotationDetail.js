import apiClient from "../apiClient";

export async function getQuotationDetail(quotationId) {
    try {
        const response = await apiClient.get(
            `/quotation/detail/${quotationId}`
        );

        console.log(response.data, "quotation detail response");

        return response.data;

    } catch (error) {
        console.log(error, "quotation detail error");
        throw error;
    }
}