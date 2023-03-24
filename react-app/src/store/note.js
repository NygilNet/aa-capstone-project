
const ADD_NOTE = 'notes/ADD_NOTE';
const LOAD_NOTE = 'notes/LOAD_NOTE';
const LOAD_NOTES = 'notes/LOAD_NOTES';
const LOAD_RECENT_NOTES = 'notes/LOAD_RECENT_NOTES';
const LOAD_TRASHED_NOTES = 'notes/LOAD_TRASHED_NOTES';
const MOVE_NOTE_TO_TRASH = 'notes/MOVE_NOTE_TO_TRASH';

const addNote = payload => ({
    type: ADD_NOTE,
    payload
});

const loadNote = payload => ({
    type: LOAD_NOTE,
    payload
});

const loadNotes = payload => ({
    type: LOAD_NOTES,
    payload
});

const loadRecentNotes = payload => ({
    type: LOAD_RECENT_NOTES,
    payload
});

const loadTrashedNotes = payload => ({
    type: LOAD_TRASHED_NOTES,
    payload
});

const moveNoteToTrash = payload => ({
    type: MOVE_NOTE_TO_TRASH,
    payload
});

export const createNote = (note) => async dispatch => {
    const response = await fetch(`/api/notes`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note)
    });

    if (response.ok) {
        const data = await response.json();
        // dispatch(addNote(data));
        return data;
    }
}

export const readAll = () => async dispatch => {
    const response = await fetch(`/api/notes`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadNotes(data));
        return data;
    }
}

export const readSingleNote = (id) => async dispatch => {
    const response = await fetch(`/api/notes/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadNote(data));
        return data;
    }
}

export const readRecent = () => async dispatch => {
    const response = await fetch(`/api/notes/recent`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadRecentNotes(data));
        return data;
    }
}

export const readTrash = () => async dispatch => {
    const response = await fetch(`/api/notes/trash`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadTrashedNotes(data));
        return data;
    }
}

export const putNoteTrash = (id) => async dispatch => {
    const response = await fetch(`/api/notes/${id}/delete`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(moveNoteToTrash(data));
        return data;
    }
}


const initialState = {
    notes: {},
    recent: [],
    trash: {},
    note: {}
}


const noteReducer = (state = initialState, action) => {
    console.log(action.payload)
    let newState = {...state};
    switch(action.type) {
        case LOAD_NOTES:
            newState.notes = action.payload;
            return newState;
        case LOAD_NOTE:
            return {...state, note: action.payload}
        case LOAD_RECENT_NOTES:
            newState.recent = action.payload;
            return newState;
        case LOAD_TRASHED_NOTES:
            newState.trash = action.payload;
            return newState;
        default:
            return state;
    }
}

export default noteReducer;
