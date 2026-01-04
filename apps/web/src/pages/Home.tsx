import { NoteList } from "../components/NoteList";
import { notes } from "../store";

export function Home() {

    return (
        <div class="container-fluid">
            <NoteList
                notes={notes.value}
            />
        </div>
    );
}