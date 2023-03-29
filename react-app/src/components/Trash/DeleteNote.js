import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteNote } from "../../store/note";

function DeleteNote({ noteId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const onDelete = () => {
        return dispatch(deleteNote(noteId)).then(closeModal)
    }


    return (
        <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this note?</p>
            <button onClick={closeModal}>Cancel</button>
            <button onClick={onDelete}>Confirm</button>
        </div>
    )

}

export default DeleteNote;
