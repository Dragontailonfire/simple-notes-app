import { useEffect } from "preact/hooks";
import "./app.css";
import { useSignal } from "@preact/signals";
import { supabase } from "../lib/supabase";

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
      // const res = await fetch("/api/notes");
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

  const login = async () => {
    await supabase.auth.signInWithOAuth({ provider: "github" });
  };

  const logout = () => {
    supabase.auth.signOut();
  };

  if (!session.value) {
    return (
      <div>
        <h1>Please log in</h1>
        <button onClick={login}>Log In with GitHub</button>
      </div>
    );
  }

  return (
    <div>
      <h1>My Notes</h1>
      <button onClick={logout}>Logout</button>
      <form onSubmit={addNote}>
        <input
          value={newNote.value}
          onInput={(e) => (newNote.value = e.currentTarget.value)}
          placeholder="New note..."
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {notes.value.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
}
