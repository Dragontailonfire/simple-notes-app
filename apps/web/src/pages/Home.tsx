import { HomePageToolBar } from "../components/HomePageToolBar";
import { NoteList } from "../components/NoteList";
import { FoldersTree } from "../components/FoldersTree";
import { folderTree, notes, selectedFoldersToView } from "../store";

export function Home() {
    return (
        <>
            <div class="row">
                <div class="sticky-top vstack gap-2 col-md-5 mx-auto mb-2">
                    <HomePageToolBar />
                </div>
                <div class="row">
                    <div class="col-md-4 col-lg-3 mb-3">
                        <div class="sticky-top">
                            <FoldersTree folders={folderTree.value} />
                        </div>
                    </div>
                    <div class="col-md-8 col-lg-9">
                        <NoteList
                            notes={notes.value}
                            selectedFoldersToView={selectedFoldersToView.value}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
