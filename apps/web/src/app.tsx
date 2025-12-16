import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { supabase } from "../lib/supabase";
import { Login } from "./components/Login";
import { NoteList } from "./components/NoteList";
import type { Note } from "@template/shared-types";
import { AddNote } from "./components/AddNote";

const raw = import.meta.env.VITE_SERVER_URL ?? "";

const API_BASE = ((): string => {
  if (!raw) return "/api"; // dev: use Vite proxy
  const hasProto = raw.startsWith("http://") || raw.startsWith("https://");
  return (hasProto ? raw : `https://${raw}`).replace(/\/$/, "");
})();

function apiUrl(path: string) {
  return `${API_BASE.replace(/\/$/, "")}/${String(path).replace(/^\//, "")}`;
}

export function App() {
  const session = useSignal<any>(null);
  const notes = useSignal<Note[]>([]);
  const newNote = useSignal("");
  const editedNote = useSignal<string>("");
  const editedNoteId = useSignal<number | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      session.value = s;
      if (s) fetchNotes();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      session.value = s;
      if (s) fetchNotes();
      else notes.value = [];
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchNotes = async () => {
    try {
      if (!session.value) return;

      const res = await fetch(apiUrl("/notes"), {
        headers: {
          Authorization: `Bearer ${session.value.access_token}`,
        },
      });
      if (res.ok) {
        notes.value = await res.json();
      } else {
        console.error("Failed to fetch notes:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNewNote = async () => {
    if (!session.value) return;

    const res = await fetch(apiUrl("/notes"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.value.access_token}`,
      },
      body: JSON.stringify({ content: newNote.value }),
    });

    if (res.ok) {
      newNote.value = "";
      fetchNotes();
    } else {
      console.error("Failed to add note:", res.statusText);
    }
  };

  const deleteNote = async (id: number) => {
    if (!session.value) return;
    const proceed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!proceed) return;

    try {
      const res = await fetch(apiUrl(`/notes/${id}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.value.access_token}`,
        },
      });

      if (res.ok) {
        notes.value = notes.value.filter((n) => n.id !== id);
      } else {
        console.error("Failed to delete note:", res.statusText);
      }
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const saveEditedNote = async (newContent: string) => {
    if (!session.value || !editedNoteId.value) return;

    try {
      const res = await fetch(apiUrl(`/notes/${editedNoteId.value}`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.value.access_token}`,
        },
        body: JSON.stringify({ content: newContent }),
      });

      if (res.ok) {
        editedNoteId.value = null;
        editedNote.value = "";
        fetchNotes();
      } else {
        console.error("Failed to edit note:", res.statusText);
      }
    } catch (err) {
      console.error("Error editing note:", err);
    }
  };

  const login = async () => {
    await supabase.auth.signInWithOAuth({ provider: "github" });
  };

  const logout = () => {
    supabase.auth.signOut();
  };

  const getDisplayName = () => {
    const user = session.value?.user;
    if (!user) return null;
    const meta = user.user_metadata || {};
    const name =
      meta.full_name ||
      meta.name ||
      meta.preferred_username ||
      user.email?.split("@")[0] ||
      null;
    return name;
  };

  const editANote = (id: number, content: string) => {
    editedNoteId.value = id;
    editedNote.value = content ?? "";
  };

  if (!session.value) {
    return (
      <div id="app">
        <Login onLogin={login} />
      </div>
    );
  }

  return (
    <div id="app">
      <nav class="navbar navbar-expand-lg bg-body fixed-top">
        <div class="container">
          <a class="navbar-brand" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="24"
              fill="currentColor"
              class="bi bi-text-fill"
              viewBox="0 0 16 16"
            >
              <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1" />
            </svg>{" "}
            Simple Notes App
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item"></li>
              {getDisplayName() && (
                <span class="navbar-text">Hello, {getDisplayName()}</span>
              )}
            </ul>
            <form class="d-flex">
              <button
                onClick={logout}
                class="btn btn-danger"
                aria-label="Logout"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-box-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div class="container text-center mt-5">
        <AddNote newNoteSignal={newNote} onAddNote={addNewNote} />
        <NoteList
          notes={notes.value}
          onDelete={deleteNote}
          onEdit={editANote}
          onSaveEditedNote={saveEditedNote}
          onCancelEditNote={() => {
            editedNoteId.value = null;
            editedNote.value = "";
          }}
          editedNoteId={editedNoteId.value}
          disableEdit={editedNoteId.value !== null}
        />
      </div>
      <footer class="d-flex flex-wrap justify-content-between align-items-center p-3 my-4 border-top">
        <div class="col-md-4 d-flex align-items-center">
          <span class="mb-3 mb-md-0 text-body-secondary">
            © 2025 Dragontailonfire
          </span>
        </div>
      </footer>
    </div>
  );
}
