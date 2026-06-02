"use server";
import { API_BASE_URL } from "./apiBaseUrl";

export async function login(username, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            return {
                success: false,
                message: "Forkert brugernavn eller adgangskode."
            };
        }

        const data = await response.json();
        return {
            success: true,
            data
        };
    } catch (error) {
        console.log("loginUserAPI error:", error);
        return {
            success: false,
            message: "Noget gik galt på serveren, prøv igen senere."
        };
    }
}
