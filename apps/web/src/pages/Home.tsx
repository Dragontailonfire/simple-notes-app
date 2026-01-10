import { NoteList } from "../components/NoteList";
import { notes } from "../store";

export function Home() {

    return (
        <>
            <NoteList
                notes={notes.value}
            />
        </>
    );
}