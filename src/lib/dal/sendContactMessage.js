"use server";
import { API_BASE_URL } from "./apiBaseUrl";

export async function sendContactMessage(data) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log("Response status:", response);

        const responseData = await response.json();

        return {
            ok: response.ok,
            status: response.status,
            data: responseData,
        };

    } catch (error) {
        console.error("Error submitting contact message:", error);
        throw error;
    }
}