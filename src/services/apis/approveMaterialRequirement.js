import apiClient from "../apiClient";

export async function approveMaterialRequirement(payload) {
  try {
    const response = await apiClient.put(
      "/material/requirement/approve",
      payload
    );

    console.log(response.data, "approve material requirement");

    return response.data;
  } catch (error) {
    console.log(error, "approve material requirement error");
    throw error;
  }
}