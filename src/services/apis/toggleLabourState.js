import apiClient from "../apiClient";

export async function toggleLabourState(
    payload
) {
    try {
        const response =
            await apiClient.put(
                "/user/labour/state/toggle",
                payload
            );

        console.log(
            response.data,
            "toggle labour state response"
        );

        return response.data;
    } catch (error) {
        console.log(
            error,
            "toggle labour state error"
        );

        throw error;
    }
}