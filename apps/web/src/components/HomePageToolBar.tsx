import {
    addNote,
    sortByDescending,
    sortNotesInAscending,
    sortNotesInDescending,
} from "../store";
import { AddNote } from "./AddNote";

export function HomePageToolBar() {
    return (
        <div class="container d-inline-flex justify-content-center mb-2">
            <div
                role="toolbar"
                class="btn-toolbar row p-1 gx-2 row-cols-auto justify-content-evenly border align-items-center bg-body-tertiary rounded-0 shadow-sm"
            >
                <div class="col">
                    <button
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#folderTree"
                        aria-expanded="true"
                        aria-controls="#folderTree"
                        class="btn btn-outline-secondary border-0 w-100 rounded-0 col-md-4 d-md-none"
                        name="expand-all"
                        id="expand-all"
                    >
                        View/Hide folders
                    </button>
                </div>
                <div class="col">
                    <div
                        class="btn-group btn-group-sm rounded-0"
                        role="group"
                        aria-label="Sorting button group"
                    >
                        <input
                            type="radio"
                            class="btn-check"
                            name="btnradiosort"
                            onClick={sortNotesInDescending}
                            id="sortByDescending"
                            autocomplete="off"
                            checked={sortByDescending.value}
                        />
                        <label
                            class="btn btn-outline-primary"
                            for="sortByDescending"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-sort-numeric-down-alt"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98"
                                ></path>
                                <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z"></path>
                            </svg>
                            <span class="visually-hidden">
                                Sort in Descending
                            </span>
                        </label>
                        <input
                            type="radio"
                            class="btn-check"
                            name="btnradiosort"
                            onClick={sortNotesInAscending}
                            id="sortByAscending"
                            autocomplete="off"
                            checked={!sortByDescending.value}
                        />
                        <label
                            class="btn btn-outline-primary"
                            for="sortByAscending"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-sort-numeric-down"
                                viewBox="0 0 16 16"
                            >
                                <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z"></path>
                                <path
                                    fill-rule="evenodd"
                                    d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98"
                                ></path>
                                <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z"></path>
                            </svg>
                            <span class="visually-hidden">
                                Sort in Ascending
                            </span>
                        </label>
                    </div>
                </div>
                <div class="col">
                    <AddNote onAddNote={addNote} />
                </div>
                {/* <div class="col">
                    <div class="btn-group btn-group-sm" role="group" aria-label="Layout button group">
                        <input type="radio" class="btn-check" name="btnradioview" id="card" autocomplete="off" checked />
                        <label class="btn btn-outline-primary" for="card">Card</label>
                        <input type="radio" class="btn-check" name="btnradioview" id="list" autocomplete="off" />
                        <label class="btn btn-outline-primary" for="list">List</label>
                    </div>
                </div> */}
                {/* <div class="col">
                    <button class="btn btn-sm btn-outline-primary" data-bs-toggle="button">Favourite</button>
                </div>
                <div class="col">
                    <button class="btn btn-sm btn-outline-primary" data-bs-toggle="button">Archive</button>
                </div> */}
            </div>
        </div>
    );
}
