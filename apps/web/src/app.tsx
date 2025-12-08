import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { supabase } from "../lib/supabase";
import githubMark from "./assets/github-mark-white.svg";

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
  const notes = useSignal<any[]>([]);
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

  const editNote = async (e: Event) => {
    e.preventDefault();
    if (!session.value) return;

    try {
      const res = await fetch(apiUrl(`/notes/${editedNoteId.value}`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.value.access_token}`,
        },
        body: JSON.stringify({ content: editedNote.value }),
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

  if (!session.value) {
    return (
      <div id="app" class="container text-center m-5 p-5">
        <h1 class="m-5">Please log in to view notes</h1>
        <button class="btn btn-dark" onClick={login}>
          <img
            src={githubMark}
            alt="GitHub Invertocat logo"
            class="github-mark"
            width="20"
            height="20"
          />{" "}
          Sign in with GitHub
        </button>
      </div>
    );
  }

  return (
    <div id="app" class="container">
      <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div class="container-fluid">
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
        <form onSubmit={addNote} class="row mt-5 g-3">
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

        <main class="container-fluid">
          <div class="row">
            {notes.value.map((note) => (
              <div class="col-sm-6 mb-3 mb-sm-0">
                <div key={note.id} class="card mb-3">
                  <div class="card-header">#{note.id}</div>
                  <div class="card-body">
                    {editedNoteId.value === note.id ? (
                      <form onSubmit={editNote} class="row g-2">
                        <input
                          value={editedNote.value}
                          onInput={(e) =>
                            (editedNote.value = e.currentTarget.value)
                          }
                          class="form-control"
                          id="edit-note"
                          name="edit-note"
                          aria-label="Edit note"
                        />
                        <div class="col mb-1">
                          <button
                            type="submit"
                            class="btn btn-success"
                            aria-label="Save note"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-floppy"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11 2H9v3h2z" />
                              <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                            </svg>
                          </button>
                        </div>
                        <div class="col mb-1">
                          <button
                            type="reset"
                            class="btn btn-danger"
                            onClick={() => {
                              editedNoteId.value = null;
                              editedNote.value = "";
                            }}
                            aria-label="Cancel edit note"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-x-circle"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg>
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <h5 class="card-title">{note.content}</h5>
                        <div class="row g-3">
                          <div class="col mb-3">
                            <button
                              class="btn btn-primary"
                              onClick={() => {
                                editedNoteId.value = note.id;
                                editedNote.value = note.content ?? "";
                              }}
                              aria-label="Edit note"
                              disabled={editedNoteId.value !== null}
                              aria-disabled={
                                editedNoteId.value !== null ? "true" : "false"
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-pencil"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                              </svg>
                            </button>
                          </div>
                          <div class="col mb-3">
                            <button
                              class="btn btn-danger"
                              onClick={() => deleteNote(note.id)}
                              aria-label="Delete note"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-trash3"
                                viewBox="0 0 16 16"
                              >
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div class="card-footer text-body-secondary">{new Date(note.updated_at).toDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
