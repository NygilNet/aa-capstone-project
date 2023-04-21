
const ADD_TAG = 'tags/ADD_TAG';
const LOAD_TAG = 'tags/LOAD_TAG';
const REMOVE_TAG = 'tags/REMOVE_TAG';
const CLEAR_TAGS = 'tags/CLEAR_TAGS';


const addTag = payload => ({
    type: ADD_TAG,
    payload
});

const loadTag = payload => ({
    type: LOAD_TAG,
    payload
});

const removeTag = payload => ({
    type: REMOVE_TAG,
    payload
});

const clearTags = payload => ({
    type: CLEAR_TAGS,
    payload
});


export const createTag = (tag) => async dispatch => {
    const response = await fetch(`/api/tags`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tag)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addTag(data));
        return data;
    }
}

export const readAllTags = () => async dispatch => {
    const response = await fetch(`/api/tags`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadTag(data));
        return data;
    }
}

export const deleteTag = (id) => async dispatch => {
    const response = await fetch(`/api/tags/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeTag(id));
        return data;
    }
}

export const resetTags = () => async dispatch => {
    dispatch(clearTags())
}


const initialState = {};

const tagReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case CLEAR_TAGS:
            newState = {};
            return newState;
        case REMOVE_TAG:
            delete newState[action.payload];
            return newState;
        case ADD_TAG:
            newState[action.payload.id] = action.payload;
            return newState;
        case LOAD_TAG:
            newState = action.payload;
            return newState;
        default:
            return state;
    }
}

export default tagReducer;
