import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteNote } from "../../store/note";
import "./DeleteNote.css";


function DeleteNote({ noteId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const onDelete = () => {
        return dispatch(deleteNote(noteId)).then(closeModal)
    }


    return (
        <div className="delete-note-container">
            <div className="delete-note-content">
                <h1>Confirm Delete</h1>
                <p>Are you sure you want to delete this note?</p>
                <button className="delete-note-submit curs" onClick={onDelete}>Confirm</button>
                <button className="delete-note-cancel curs" onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )

}

export default DeleteNote;
