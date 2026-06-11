import apiClient from "../apiClient";

export async function addMaterialCategory(payload) {
  try {

    console.log(payload, "payload in handler")
    const response = await apiClient.post(
      "/material/category/add",
      payload
    );

    console.log(response.data, "add category response");

    return response.data;

  } catch (error) {
    console.log(error, "add category error");
    throw error;
  }
}