import { API_BASE_URL } from "@/lib/dal/apiBaseUrl";

export function resolveAssetUrl(url) {
    if (!url) return "";

    try {
        const parsedUrl = new URL(url);

        if (parsedUrl.hostname === "localhost" || parsedUrl.hostname === "127.0.0.1") {
            return `${API_BASE_URL}${parsedUrl.pathname}${parsedUrl.search}`;
        }

        return url;
    } catch {
        if (url.startsWith("/")) {
            return `${API_BASE_URL}${url}`;
        }

        return url;
    }
}