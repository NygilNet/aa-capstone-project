
const LOAD_TAG = 'tags/LOAD_TAG';


const loadTag = payload => ({
    type: LOAD_TAG,
    payload
});


export const readAllTags = () => async dispatch => {
    const response = await fetch(`/api/tags`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadTag(data));
        return data;
    }
}

const initialState = {};

const tagReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD_TAG:
            newState = action.payload;
            return newState;
        default:
            return state;
    }
}

export default tagReducer;
