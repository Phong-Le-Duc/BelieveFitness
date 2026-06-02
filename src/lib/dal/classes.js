"use server";
import { cookies } from "next/headers";
import { z } from "zod/v4";
import { createClassSchema } from "@/lib/schemas";
import { API_BASE_URL } from "./apiBaseUrl";


export async function getAllClasses() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/classes`);
        if (!res.ok) {
            throw new Error("Something went wrong");
        }

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            console.log("getAllClasses data:", data);
            return data;
        }

        throw new Error("Not JSON");
    } catch (error) {
        console.log("getAllClasses error:", error);
        return [];
    }
}

export async function getSingleClassById(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/classes/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch class ${id} (${res.status})`);
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Not JSON");
        }

        return await res.json();
    } catch (error) {
        console.log("getClassById error:", error);
        return null;
    }
}

// create, update, delete class virker ikke endnu så er ikke implementeret i opgaven.

export async function createClass(prevState, formData) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const file = formData.get("file");

    if (!file || (typeof file === "object" && file.size === 0)) {
        return {
            ...prevState,
            assetId: { errors: ["Image is required"] },
        };
    }

    let assetData;
    try {
        const assetResponse = await fetch(`${API_BASE_URL}/api/v1/assets`, {
            method: "POST",
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            body: formData,
        });

        assetData = await assetResponse.json();

        if (!assetResponse.ok || !assetData?.id) {
            return {
                ...prevState,
                assetId: { errors: ["Failed to upload image"] },
            };
        }
    } catch (error) {
        console.error("createClass asset upload error:", error);
        return {
            ...prevState,
            assetId: { errors: ["Failed to upload image"] },
        };
    }

    const payload = {
        className: formData.get("className"),
        classDescription: formData.get("classDescription"),
        classDay: formData.get("classDay"),
        classTime: formData.get("classTime"),
        trainerId: formData.get("trainerId"),
        assetId: assetData.id,
        maxParticipants: formData.get("maxParticipants"),
    };

    const validation = createClassSchema.safeParse(payload);
    if (!validation.success) {
        return z.treeifyError(validation.error).properties;
    }

    const classFormData = new FormData();
    classFormData.append("className", validation.data.className);
    classFormData.append("classDescription", validation.data.classDescription);
    classFormData.append("classDay", validation.data.classDay);
    classFormData.append("classTime", validation.data.classTime);
    classFormData.append("trainerId", String(validation.data.trainerId));
    classFormData.append("assetId", String(validation.data.assetId));
    classFormData.append("maxParticipants", String(validation.data.maxParticipants));

    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/classes`, {
            method: "POST",
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            body: classFormData,
        });

        if (!res.ok) {
            return {
                ...prevState,
                className: { errors: ["Failed to create class"] },
            };
        }

        return {
            success: true,
        };
    } catch (error) {
        console.error("createClass error:", error);
        return {
            ...prevState,
            className: { errors: ["Failed to create class"] },
        };
    }
}
