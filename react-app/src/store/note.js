
const LOAD_RECENT_NOTES = 'notes/LOAD_RECENT_NOTES';
const LOAD_TRASHED_NOTES = 'notes/LOAD_TRASHED_NOTES';


const loadRecentNotes = payload => ({
    type: LOAD_RECENT_NOTES,
    payload
})

const loadTrashedNotes = payload => ({
    type: LOAD_TRASHED_NOTES,
    payload
});


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
    recent: {},
    trash: {}
}


const noteReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
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
