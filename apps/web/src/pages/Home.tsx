import { HomePageToolBar } from "../components/HomePageToolBar";
import { NoteList } from "../components/NoteList";
import { notes } from "../store";

export function Home() {

    return (
        <>
            <HomePageToolBar />
            <NoteList
                notes={notes.value}
            />
        </>
    );
}