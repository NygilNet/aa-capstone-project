import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteNotebook } from "../../store/notebook";

function DeleteNotebook({ notebook }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const onDelete = async () => {
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
