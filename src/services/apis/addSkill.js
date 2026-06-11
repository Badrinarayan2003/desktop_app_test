import apiClient from "../apiClient";

export async function addSkill(payload) {
  try {
    const response = await apiClient.post(
      "/skill/add/skills",
      payload
    );

    console.log(response.data, "res of add skill");

    return response.data;

  } catch (error) {
    console.log(error, "err of add skill");

    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to add skill. Please try again.";

    throw new Error(message);
  }
}