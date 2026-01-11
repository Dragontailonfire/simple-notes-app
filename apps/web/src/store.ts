import { signal } from "@preact/signals";
import type { Note } from "@template/shared-types";
import { supabase } from "../lib/supabase";

export const session = signal<any>(null);
export const notes = signal<Note[]>([]);
export const sortByDescending = signal<boolean>(true);

const raw = import.meta.env.VITE_SERVER_URL ?? "";

const API_BASE = ((): string => {
    if (!raw) return "/api"; // dev: use Vite proxy
    const hasProto = raw.startsWith("http://") || raw.startsWith("https://");
    return (hasProto ? raw : `https://${raw}`).replace(/\/$/, "");
})();

function apiUrl(path: string) {
    return `${API_BASE.replace(/\/$/, "")}/${String(path).replace(/^\//, "")}`;
}

export const fetchNotes = async () => {
    try {
        if (!session.value) return;
        const res = await fetch(apiUrl("/notes"), {
            headers: {
                Authorization: `Bearer ${session.value.access_token}`,
            },
        });
        if (res.ok) {
            notes.value = await res.json();
            if (!sortByDescending.value) {
                sortNotesInAscending();
            }
        } else {
            console.error("Failed to fetch notes:", res.statusText);
        }
    } catch (error) {
        console.error("Error fetching notes:", error);
    }
};

export const sortNotesInAscending = () => {
    notes.value = [...notes.value].sort((a, b) => a.id - b.id);
    sortByDescending.value = false;
}
export const sortNotesInDescending = () => {
    notes.value = [...notes.value].sort((a, b) => b.id - a.id);
    sortByDescending.value = true;
}

export const addNote = async (content: string): Promise<boolean> => {
    if (!session.value) return false;

    const res = await fetch(apiUrl("/notes"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.value.access_token}`,
        },
        body: JSON.stringify({ content: content, title: content }),
    });

    if (res.ok) {
        fetchNotes();
        return true;
    } else {
        console.error("Failed to add note:", res.statusText);
        return false;
    }
};

export const deleteNote = async (id: number): Promise<boolean> => {
    if (!session.value) return false;
    const proceed = window.confirm(
        "Are you sure you want to delete this note?"
    );
    if (!proceed) return false;

    try {
        const res = await fetch(apiUrl(`/notes/${id}`), {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${session.value.access_token}`,
            },
        });

        if (res.ok) {
            notes.value = notes.value.filter((n) => n.id !== id);
            return true;
        } else {
            console.error("Failed to delete note:", res.statusText);
            return false;
        }
    } catch (err) {
        console.error("Error deleting note:", err);
        return false;
    }
};

export const updateNote = async (id: number, newContent: string, newTitle: string): Promise<boolean> => {
    if (!session.value || !id) return false;

    try {
        const res = await fetch(apiUrl(`/notes/${id}`), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.value.access_token}`,
            },
            body: JSON.stringify({ content: newContent, title: newTitle }),
        });

        if (res.ok) {
            fetchNotes();
            return true;
        } else {
            console.error("Failed to edit note:", res.statusText);
            return false;
        }
    } catch (err) {
        console.error("Error editing note:", err);
        return false;
    }
};

export const login = async () => {
    await supabase.auth.signInWithOAuth({ provider: "github" });
};

export const logout = () => {
    supabase.auth.signOut();
};

export const getDisplayName = () => {
    const user = session.value?.user;
    if (!user) return null;
    const meta = user.user_metadata || {};
    const name =
        meta.full_name ||
        meta.name ||
        meta.preferred_username ||
        user.email?.split("@")[0] ||
        "User";
    return name;
};
