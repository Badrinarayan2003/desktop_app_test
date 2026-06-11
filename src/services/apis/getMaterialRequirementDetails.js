import apiClient from "../apiClient";

export async function getMaterialRequirementDetails(requirementId) {
  try {
    const response = await apiClient.get(
      `/material/requirement/detail/${requirementId}`
    );

    console.log(response.data, "material requirement details");

    return response?.data?.data?.materialRequestDetails || [];
  } catch (error) {
    console.log(error, "material requirement details error");
    throw error;
  }
}