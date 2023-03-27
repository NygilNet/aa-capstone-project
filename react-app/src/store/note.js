
const ADD_NOTE = 'notes/ADD_NOTE';
const LOAD_NOTE = 'notes/LOAD_NOTE';
const LOAD_NOTES = 'notes/LOAD_NOTES';
const LOAD_RECENT_NOTES = 'notes/LOAD_RECENT_NOTES';
const LOAD_TRASHED_NOTES = 'notes/LOAD_TRASHED_NOTES';
const MOVE_NOTE_TO_TRASH = 'notes/MOVE_NOTE_TO_TRASH';
const CHANGE_NOTE = 'notes/CHANGE_NOTE';

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

const changeNote = payload => ({
    type: CHANGE_NOTE,
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
        dispatch(changeNote(data));
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
    let newState = {...state};
    switch(action.type) {
        case CHANGE_NOTE:
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
                return {...state, trash: {...state.trash, note}}
            } else {
                return {...state, notes: {...state.notes, note}}
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
