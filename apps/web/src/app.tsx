import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { supabase } from "../lib/supabase";
import { Login } from "./components/Login";
import { NoteList } from "./components/NoteList";
import type { Note } from "@template/shared-types";


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

  const addNote = async (e: Event) => {
    e.preventDefault();
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
  }

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
              class="bi bi-card-text"
              viewBox="0 0 16 16"
            >
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
              <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
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
        <div class="row mt-5">
          <div class="col mt-5">
            <form onSubmit={addNote}>
              <div class="input-group mb-3">
                <input
                  id="add-note"
                  name="add-note"
                  value={newNote.value}
                  onInput={(e) => (newNote.value = e.currentTarget.value)}
                  placeholder="Add a new note..."
                  class="form-control form-control-lg"
                  type="text"
                  aria-label="Add new note"
                />
                <button
                  type="submit"
                  class="btn btn-lg btn-primary"
                  aria-label="Add note"
                  disabled={newNote.value === ""}
                  aria-disabled={newNote.value === "" ? "true" : "false"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-plus-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
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
          disableEdit={editedNoteId.value !== null}/>
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
