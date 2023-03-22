
const ADD_NOTEBOOK = 'notebooks/ADD_NOTEBOOK';
const LOAD_NOTEBOOKS = 'notebooks/LOAD_NOTEBOOKS';
const LOAD_NOTEBOOK = 'notebooks/LOAD_NOTEBOOK';
const CLEAR_NOTEBOOKS = 'notebooks/CLEAR_NOTEBOOKS';


const addNotebook = payload => ({
    type: ADD_NOTEBOOK,
    payload
});

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


export const createNotebook = (notebook) => async dispatch => {
    const response = await fetch(`/api/notebooks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notebook)
    });

    if (response.ok) {
        const data = response.json();
        dispatch(addNotebook(data));
        return data;
    }
}

export const getNotebooks = () => async dispatch => {
    const response = await fetch(`/api/notebooks`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadNotebooks(data));
        return data;
    }
}

export const getNotebook = (id) => async dispatch => {
    const response = await fetch(`/api/notebooks/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadNotebook(data));
        return data;
    }
}

export const changeNotebook = (id, notebook) => async dispatch => {
    const response = await fetch(`/api/notebooks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notebook)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addNotebook(data));
        return data;
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
        case ADD_NOTEBOOK:
            newState.all_notebooks[action.payload.id] = action.payload;
            return newState;
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
