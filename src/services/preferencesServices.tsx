import { PreferencesFormData } from "../interfaces/preferencesInterface";

export const savePreferences = async (
    data: PreferencesFormData
) => {
    const response = await fetch("/api/preferences", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Failed to save preferences");
    }

    return response.json();
}