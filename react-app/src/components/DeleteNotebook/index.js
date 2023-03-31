import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteNotebook } from "../../store/notebook";
import "./index.css";

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
        <div className="delete-notebook-container">
            <div className="delete-notebook-content">
                <h1>Delete notebook?</h1>
                <p>This cannot be undone.</p>
                <button className="delete-notebook-submit curs" onClick={onDelete}>Delete</button>
                <button className="delete-notebook-cancel curs" onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )

}

export default DeleteNotebook;
