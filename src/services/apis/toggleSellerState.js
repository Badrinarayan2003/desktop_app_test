import apiClient from "../apiClient";

export async function toggleSellerState(
    payload
) {
    try {
        const response =
            await apiClient.put(
                "/user/seller/state/toggle",
                payload
            );

        console.log(
            response.data,
            "toggle seller state response"
        );

        return response.data;
    } catch (error) {
        console.log(
            error,
            "toggle seller state error"
        );

        throw error;
    }
}