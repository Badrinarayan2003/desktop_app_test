import apiClient from "../apiClient";

export async function editSkill(id, payload) {
  try {
    const response = await apiClient.put(
      `/skill/active/skill/${id}`,
      payload
    );

    console.log(response.data, "res of update skill");

    return response.data;

  } catch (error) {
    console.log(error, "err of update skill");

    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to update skill. Please try again.";

    throw new Error(message);
  }
}