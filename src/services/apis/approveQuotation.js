import apiClient from "../apiClient";

export async function approveQuotation(quotationId) {
    try {
        const response = await apiClient.put(
            `/quotation/${quotationId}/approve`
        );

        console.log(response.data, "approve quotation response");

        return response.data;

    } catch (error) {
        console.log(error, "approve quotation error");
        throw error;
    }
}