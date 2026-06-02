"use server";
import { API_BASE_URL } from "./apiBaseUrl";


export async function getRatingByClassId(classId) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/classes/${classId}/ratings`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch ratings (${res.status})`);
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Response is not JSON");
        }

        return await res.json();
    } catch (error) {
        console.error("getRatingByClassId error:", error);
        return [];
    }
}



