"use server";
import { cookies } from "next/headers";
import { API_BASE_URL } from "./apiBaseUrl";

export async function getSingleUser() {
    const cookieStore = await cookies();

    if (!cookieStore.has("userId")) return null;

    const userId = cookieStore.get("userId").value;
    const token = cookieStore.get("token").value;


    const res = await fetch(`${API_BASE_URL}/api/v1/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Status ${res.status}: ${body}`);
    }

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        const data = await res.json();
        console.log("❤️getSingleUser :", data);

        if (Array.isArray(data.classes)) {
            data.classes.forEach((classObj, idx) => {
                console.log(`Class #${idx}:`, classObj);
            });
        }
        return data;
    }

    throw new Error("Not JSON");
}



export async function addUserToClass(userId, classId, token) {
    if (!userId) throw new Error("Missing userId");
    if (!classId) throw new Error("Missing classId");
    if (!token) throw new Error("Missing token");

    const res = await fetch(
        `${API_BASE_URL}/api/v1/users/${userId}/classes/${classId}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return res.json();
}


export async function deleteUserFromClass(userId, classId, token) {
    if (!userId) throw new Error("Missing userId");
    if (!classId) throw new Error("Missing classId");
    if (!token) throw new Error("Missing token");

    const res = await fetch(
        `${API_BASE_URL}/api/v1/users/${userId}/classes/${classId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return {};
}