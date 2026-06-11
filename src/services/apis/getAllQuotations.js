import apiClient from "../apiClient";

export async function getAllQuotations() {
    try {
        const response = await apiClient.get(
            "/quotation/all"
        );

        console.log(response.data, "all quotations response");

        return response.data;

    } catch (error) {
        console.log(error, "all quotations error");
        throw error;
    }
}