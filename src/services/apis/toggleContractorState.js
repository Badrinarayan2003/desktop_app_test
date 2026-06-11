import apiClient from "../apiClient";

export async function toggleContractorState(
    payload
) {
    try {
        const response =
            await apiClient.put(
                "/user/contractor/state/toggle",
                payload
            );

        console.log(
            response.data,
            "toggle contractor state response"
        );

        return response.data;
    } catch (error) {
        console.log(
            error,
            "toggle contractor state error"
        );

        throw error;
    }
}