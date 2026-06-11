import apiClient from "../apiClient";

export async function editMaterialCategory(catgId, subCatgId, payload) {
  try {

    console.log(catgId,"catgId in handler")
    console.log(subCatgId,"subCatgId in handler")
    console.log(payload,"payload in handler")
    const response = await apiClient.put(
      `/material/category/update/${catgId}/${subCatgId}`,
      payload
    );

    console.log(response.data, "edit category response");

    return response.data;
  } catch (error) {
    console.log(error, "edit category error");
    throw error;
  }
}