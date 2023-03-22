
const LOAD_NOTEBOOKS = 'notebooks/LOAD_NOTEBOOKS';
const LOAD_NOTEBOOK = 'notebooks/LOAD_NOTEBOOK';


const loadNotebooks = payload => ({
    type: LOAD_NOTEBOOKS,
    payload
});

const loadNotebook = payload => ({
    type: LOAD_NOTEBOOK,
    payload
});


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


const initialState = {
    all_notebooks: {},
    notebook: {}
}


const notebookReducer = (state = initialState, action) => {
    let newState = {...state};

    switch(action.type) {
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
