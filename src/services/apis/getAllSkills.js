import apiClient from "../apiClient";

export async function getAllSkills() {
    try {
        const response = await apiClient.get("/skill/available/skills");

        console.log(response.data, "res of all skills");

        return response.data;

    } catch (error) {
        console.log(error, "err of all skills");
        throw error;
    }
}