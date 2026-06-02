"use server";
import { API_BASE_URL } from "./apiBaseUrl";

export async function registerUser(data) {
    try {
        const body = new URLSearchParams();
        body.set("username", data.username);
        body.set("userFirstName", data.username);
        body.set("email", data.email);
        body.set("password", data.password);
        body.set("confirmPassword", data.confirmPassword);

        const response = await fetch(`${API_BASE_URL}/api/v1/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body,
        });

        const responseData = await response.json();

        return {
            ok: response.ok,
            status: response.status,
            data: responseData,
        };
    } catch (error) {
        console.error("Error submitting register request:", error);
        throw error;
    }
}
