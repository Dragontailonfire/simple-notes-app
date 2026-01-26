import { useEffect } from "preact/hooks";
import { supabase } from "../lib/supabase";
import { Login } from "./components/Login";
import {
    allFolders,
    fetchFolders,
    fetchNotes,
    folderTree,
    getDisplayName,
    logout,
    notes,
    selectedFoldersToView,
    session,
} from "./store";
import { Home } from "./pages/Home";
import { Route, Switch, Link } from "wouter-preact";
import { NoteDetail } from "./pages/NoteDetail";
import { Common } from "./pages/Common";

export function App() {
    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, s) => {
            session.value = s;
            if (s) {
                fetchFolders();
                fetchNotes();
            } else {
                notes.value = [];
                selectedFoldersToView.value = [];
                allFolders.value = [];
                folderTree.value = [];
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    if (!session.value) {
        return <Login />;
    }

    return (
        <>
            <header class="container-fluid">
                <div class="row row-cols-auto justify-content-between align-items-center bg-primary-subtle p-2 shadow-sm">
                    <div class="col">
                        <Link
                            class="align-items-center link-body-emphasis text-decoration-none fw-semibold text-primary-emphasis"
                            href="/"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                class="bi bi-file-post"
                                viewBox="0 0 16 16"
                            >
                                <path d="M4 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z"></path>
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1"></path>
                            </svg>
                            {` ${getDisplayName()}'s Notes `}
                        </Link>
                    </div>
                    <div class="col">
                        <button
                            onClick={logout}
                            class="btn btn-danger btn-sm"
                            aria-label="Logout"
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-power"
                                viewBox="0 0 16 16"
                            >
                                <path d="M7.5 1v7h1V1z"></path>
                                <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
            <main class="container-fluid my-3">
                <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/note/:id" component={NoteDetail} />
                    <Route component={Common} />
                </Switch>
            </main>
            <footer class="bg-body-tertiary p-5 mt-5">
                <span class="text-body-secondary p-1">
                    © 2026 Dragontailonfire
                </span>
            </footer>
        </>
    );
}
