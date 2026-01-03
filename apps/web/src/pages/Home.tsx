import { NoteList } from "../components/NoteList";
import { notes } from "../store";

export function Home() {

    return (
        <div class="container m-5">
            <NoteList
                notes={notes.value}
            />
        </div>
    );
}