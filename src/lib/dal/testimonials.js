"use server";
import { API_BASE_URL } from "./apiBaseUrl";

export async function getAllTestimonials() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/testimonials`);
        if (!res.ok) {
            throw new Error("Something went wrong");
        }

        if (res.status !== 200) {
            throw new Error(res.statusText);
        }

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await res.json();
        }

        throw new Error("Not JSON");
    } catch (error) {
        console.log("getAllTestimonials error:", error);
        return {
            success: false,
            message: "something went wrong on the server, try again later",
        }
    }
}