import { useEffect } from "preact/hooks";
import "./app.css";
import { useSignal } from "@preact/signals";
import { supabase } from "../lib/supabase";
import githubMark from "./assets/github-mark-white.svg";

export function App() {
  const session = useSignal<any>(null);
  const notes = useSignal<any[]>([]);
  const newNote = useSignal("");

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

      const res = await fetch("/api/notes", {
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

    const res = await fetch("/api/notes", {
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

    try {
      const res = await fetch(`/api/notes/${id}`, {
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
      <div id="app" class="centered">
        <h1>Please log in to view notes</h1>
        <div class="github-signin-container">
          <button class="github-signin-btn" onClick={login}>
            <img
              src={githubMark}
              alt="GitHub Invertocat logo"
              class="github-mark"
            />
            Sign in with GitHub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="app">
      <nav class="navbar">
        <div class="nav-left"></div>
        <div class="nav-right">
          {getDisplayName() && (
            <span class="welcome">Hello, {getDisplayName()}</span>
          )}
          <button onClick={logout} class="logout btn btn-danger">
            Logout
          </button>
        </div>
      </nav>
      <header class="header">
        <h1 class="title">My notes</h1>
      </header>

      <form onSubmit={addNote} class="note-form">
        <input
          value={newNote.value}
          onInput={(e) => (newNote.value = e.currentTarget.value)}
          placeholder="Add a new note..."
          class="note-input"
        />
        <button type="submit" class="add-btn btn btn-primary">
          Add
        </button>
      </form>

      <main>
        <ul class="notes-list">
          {notes.value.map((note) => (
            <li key={note.id} class="note-card">
              <span class="note-content">{note.content}</span>
              <button
                class="delete-btn btn btn-danger"
                onClick={() => deleteNote(note.id)}
              >
                -
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
