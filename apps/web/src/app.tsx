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

  const addNewNote = async (content: string): Promise<boolean> => {
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

  const saveEditedNote = async (newContent: string, newTitle: string) => {
    if (!session.value || !editedNoteId.value) return;

    try {
      const res = await fetch(apiUrl(`/notes/${editedNoteId.value}`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.value.access_token}`,
        },
        body: JSON.stringify({ content: newContent, title: newTitle }),
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
      "User";
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
      <header class="d-flex flex-wrap align-items-center justify-content-between border-bottom py-3 mb-4">
        <nav class="navbar navbar-expand-lg bg-body fixed-top">
          <div class="container">
            <a class="navbar-brand d-inline-flex" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                fill="currentColor"
                class="bi bi-text-fill"
                viewBox="0 0 16 16"
                role="img"
                aria-label="Simple Notes App"
              >
                <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1" />
              </svg>
            </a>
            <form class="justify-content-center">
              <AddNote onAddNote={addNewNote} />
              {/* <input class="form-control" type="search" placeholder="Search" aria-label="Search" hidden /> */}
            </form>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarContent">
              <ul class="navbar-nav justify-content-center me-auto">
                <li class="nav-item"></li>
              </ul>
              <span class="navbar-text me-3">Hello, {getDisplayName()}</span>
              <button
                onClick={logout}
                class="btn btn-danger btn-sm rounded-pill"
                aria-label="Logout"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="40"
                  fill="currentColor"
                  class="bi bi-power"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.5 1v7h1V1z" />
                  <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>
      <div class="container text-center mt-5">
        {/* <AddNote onAddNote={addNewNote} /> */}
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
