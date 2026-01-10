export function HomePageToolBar() {
    return (
        <div class="position-relative container d-flex justify-content-center">
            <div class="row row-cols-auto align-items-center bg-body-tertiary border-bottom border-5 rounded-3 my-3 p-2">
                <div class="col">
                    <div class="btn-group btn-group-sm" role="group" aria-label="Sorting button group">
                        <input type="radio" class="btn-check" name="btnradiosort" id="latest" autocomplete="off" checked />
                        <label class="btn btn-outline-primary" for="latest">Latest</label>
                        <input type="radio" class="btn-check" name="btnradiosort" id="oldest" autocomplete="off" />
                        <label class="btn btn-outline-primary" for="oldest">Oldest</label>
                    </div>
                </div>
                <div class="col">
                    <div class="btn-group btn-group-sm" role="group" aria-label="Layout button group">
                        <input type="radio" class="btn-check" name="btnradioview" id="card" autocomplete="off" checked />
                        <label class="btn btn-outline-primary" for="card">Card</label>
                        <input type="radio" class="btn-check" name="btnradioview" id="list" autocomplete="off" />
                        <label class="btn btn-outline-primary" for="list">List</label>
                    </div>
                </div>
                <div class="col">
                    <button class="btn btn-sm btn-outline-primary" data-bs-toggle="button">Favourite</button>
                </div>
                <div class="col">
                    <button class="btn btn-sm btn-outline-primary" data-bs-toggle="button">Archive</button>
                </div>
            </div>
        </div>
    );
}