import apiClient from "../apiClient";

export async function getAllMaterialRequirements() {
  try {
    const response = await apiClient.get("/material/requirements");

    console.log(response.data, "material requirements response");

    return response?.data?.data?.materialRequests || [];
  } catch (error) {
    console.log(error, "material requirements error");
    throw error;
  }
}