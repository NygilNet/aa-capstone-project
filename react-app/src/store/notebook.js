
const LOAD_NOTEBOOKS = 'notebooks/LOAD_NOTEBOOKS';
const LOAD_NOTEBOOK = 'notebooks/LOAD_NOTEBOOK';
const CLEAR_NOTEBOOKS = 'notebooks/CLEAR_NOTEBOOKS';


const loadNotebooks = payload => ({
    type: LOAD_NOTEBOOKS,
    payload
});

const loadNotebook = payload => ({
    type: LOAD_NOTEBOOK,
    payload
});

const clearNotebooks = () => ({
    type: CLEAR_NOTEBOOKS
})


export const getNotebooks = () => async dispatch => {
    const response = await fetch(`/api/notebooks`);
    if (response.ok) {
        const payload = await response.json();
        dispatch(loadNotebooks(payload));
    }
}

export const getNotebook = (id) => async dispatch => {
    const response = await fetch(`/api/notebooks/${id}`);
    if (response.ok) {
        const payload = await response.json();
        dispatch(loadNotebook(payload));
    }
}

export const resetNotebooks = () => async dispatch => {
    dispatch(clearNotebooks())
}


const initialState = {
    all_notebooks: {},
    notebook: {}
}


const notebookReducer = (state = initialState, action) => {
    let newState = {...state};

    switch(action.type) {
        case CLEAR_NOTEBOOKS:
            newState = {
                all_notebooks: {},
                notebook: {}
            };
            return newState;
        case LOAD_NOTEBOOK:
            newState.notebook = action.payload;
            return newState;
        case LOAD_NOTEBOOKS:
            newState.all_notebooks = action.payload;
            return newState;
        default:
            return state;
    }
}

export default notebookReducer;
