import { useEffect } from "preact/hooks";
import "./app.css";
import { useSignal } from "@preact/signals";

export function App() {
  const notes = useSignal<any[]>([]);
  const newNote = useSignal("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes");
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
    console.log("Adding note:", newNote.value);
  };

  return (
    <div>
      <h1>My Notes</h1>
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
