
const ADD_NOTE = 'notes/ADD_NOTE';
const LOAD_NOTE = 'notes/LOAD_NOTE';
const LOAD_NOTES = 'notes/LOAD_NOTES';
const LOAD_RECENT_NOTES = 'notes/LOAD_RECENT_NOTES';
const LOAD_TRASHED_NOTES = 'notes/LOAD_TRASHED_NOTES';
const MOVE_NOTE_TO_TRASH = 'notes/MOVE_NOTE_TO_TRASH';
// const CHANGE_NOTE = 'notes/CHANGE_NOTE';
const REMOVE_NOTE = 'notes/REMOVE_NOTE';
const CLEAR_NOTE = 'notes/CLEAR_NOTE';
const CLEAR_NOTES = 'notes/CLEAR_NOTES';

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

// const changeNote = payload => ({
//     type: CHANGE_NOTE,
//     payload
// });

const removeNote = payload => ({
    type: REMOVE_NOTE,
    payload
});

const clearNote = payload => ({
    type: CLEAR_NOTE,
    payload
});

const clearNotes = payload => ({
    type: CLEAR_NOTES,
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
        dispatch(addNote(data));
        return data;
    }
}

export const readAllNotes = () => async dispatch => {
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

export const updateNote = (id, note) => async dispatch => {
    const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addNote(data));
        return data;
    }
}

export const deleteNote = (id) => async dispatch => {
    const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeNote(id));
        return data;
    }
}

export const resetNote = () => async dispatch => {
    dispatch(clearNote())
}

export const resetNotes = () => async dispatch => {
    dispatch(clearNotes())
}


const initialState = {
    notes: {},
    recent: [],
    trash: {},
    note: {}
}


const noteReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case REMOVE_NOTE:
            delete newState.trash[action.payload];
            return newState;
        case CLEAR_NOTES:
            newState = {
                notes: {},
                recent: [],
                trash: {},
                note: {}
            };
            return newState;
        case CLEAR_NOTE:
            newState.note = {};
            return newState;
        case ADD_NOTE:
            newState.notes[action.payload.id] = action.payload;
            if (newState.recent[0]) {
                if (newState.recent[0].id === action.payload.id) {
                    newState.recent[0] = action.payload;
                } else {
                    newState.recent.pop();
                    newState.recent.unshift(action.payload);
                }
            }
            newState.note = action.payload;
            return newState;
        case MOVE_NOTE_TO_TRASH:
            let note = action.payload
            if (note.trash) {
                newState.trash[note.id] = note;
                delete newState.notes[note.id];
                return newState;
                // return {...state, trash: {...state.trash, note}}
            } else {
                newState.notes[note.id] = note;
                delete newState.trash[note.id];
                return newState;
                // return {...state, notes: {...state.notes, note}}
            }
        case LOAD_NOTES:
            newState.notes = action.payload;
            return newState;
        case LOAD_NOTE:
            return {...state, note: action.payload}
        case LOAD_RECENT_NOTES:
            newState.recent = action.payload;
            return newState;
        case LOAD_TRASHED_NOTES:
            return {...state, trash: action.payload}
        default:
            return state;
    }
}

export default noteReducer;
