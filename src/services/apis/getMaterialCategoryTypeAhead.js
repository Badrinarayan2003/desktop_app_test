import apiClient from "../apiClient";

export async function getMaterialCategoryTypeAhead(searchText) {
    try {
        const response = await apiClient.get(
            `/material/category/typeAhead/${encodeURIComponent(searchText)}`
        );

        console.log(
            response.data,
            "material category typeahead response"
        );

        return response.data;
    } catch (error) {
        console.log(
            error,
            "material category typeahead error"
        );
        throw error;
    }
}