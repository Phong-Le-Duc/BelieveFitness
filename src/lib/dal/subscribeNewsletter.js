"use server";
import { API_BASE_URL } from "./apiBaseUrl";


export async function subscribeNewsletter(email) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/newsletter`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error(`Failed to subscribe: ${response.status}`);
        }

        return { success: true, message: "Success! Check your email." };
    } catch (error) {
        return { success: false, message: error.message || "An error occurred" };
    }
}