import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteNotebook } from "../../store/notebook";

function DeleteNotebook({ notebook, notebooks }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const onDelete = async () => {

        if (notebooks.length === 1) return alert('WARNING: User must have at least 1 notebook.');

        await dispatch(deleteNotebook(notebook.id));
        closeModal();
        return history.push('/notebooks');
    }

    return(
        <div>
            <h1>Delete notebook?</h1>
            <p>This cannot be undone.</p>
            <button onClick={closeModal}>Cancel</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    )

}

export default DeleteNotebook;
