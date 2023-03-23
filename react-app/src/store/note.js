
const LOAD_TRASHED_NOTES = 'notes/LOAD_TRASHED_NOTES';


const loadTrashedNotes = payload => ({
    type: LOAD_TRASHED_NOTES,
    payload
});


export const readTrash = () => async dispatch => {
    const response = await fetch(`/api/notes/trash`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadTrashedNotes(data));
        return data;
    }
}


const initialState = {}


const noteReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD_TRASHED_NOTES:
            newState = action.payload;
            return newState;
        default:
            return state;
    }
}

export default noteReducer;
