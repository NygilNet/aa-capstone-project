
const ADD_NOTE = 'notes/ADD_NOTE';
const LOAD_NOTE = 'notes/LOAD_NOTE';
const LOAD_RECENT_NOTES = 'notes/LOAD_RECENT_NOTES';
const LOAD_TRASHED_NOTES = 'notes/LOAD_TRASHED_NOTES';

const addNote = payload => ({
    type: ADD_NOTE,
    payload
});

const loadNote = payload => ({
    type: LOAD_NOTE,
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

export const createNote = (note) => async dispatch => {
    const response = await fetch(`/api/notes`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note)
    });

    if (response.ok) {
        const data = response.json();
        dispatch(addNote(data));
        return data;
    }
}

export const readSingleNote = (id) => async dispatch => {
    const response = await fetch(`/api/notes/${id}`);
    if (response.ok) {
        const data = response.json();
        dispatch(loadNote(data));
        return data;
    }
}

export const readRecent = () => async dispatch => {
    const response = await fetch(`/api/notes`);
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


const initialState = {
    recent: [],
    trash: {},
    note: {}
}


const noteReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD_NOTE:
            newState.note = action.payload;
            return newState;
        // case ADD_NOTE:
        //     if (action.payload.id === newState.recent[0].id) {
        //         newState.recent[0] = action.payload;
        //     } else {
        //         newState.recent.pop();
        //         newState.recent.unshift(action.payload);
        //     }
        //     return newState;
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
