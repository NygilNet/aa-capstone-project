
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getNotebook } from "../../store/notebook";
import { readAllNotes } from "../../store/note";
import { createNote } from "../../store/note";
import { putNoteTrash } from "../../store/note";
import OpenModalButton from "../OpenModalButton";
import EditNotebook from "../EditNotebook";
import DeleteNotebook from "../DeleteNotebook";

function ViewSingleNotebook() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const notebook = useSelector(state => state.notebooks.notebook);
    const notes = notebook.notes?.filter(note => !note.trash);

    useEffect(() => {
        dispatch(getNotebook(id));
        dispatch(readAllNotes());
    }, [dispatch]);

    const newNoteBtn = async (e) => {
        e.preventDefault();
        const newNote = await dispatch(createNote({ notebook_id: id }));
        if (newNote) {
            return history.push(`/notes/${newNote.id}`)
        } else {
            return alert('ERROR')
        }
    }

    const trashBtn = async (e) => {
        e.preventDefault();
        dispatch(putNoteTrash(e.target.value));
    }

    if (!notes || !notebook) return null;

    return (
        <>
            <h1>hello from {notebook.name}</h1>
            <OpenModalButton
            buttonText="Rename notebook"
            modalComponent={<EditNotebook notebook={notebook} />}
            />
            <OpenModalButton
            buttonText="Delete notebook"
            modalComponent={<DeleteNotebook notebook={notebook} />}
            />
            <button onClick={newNoteBtn}>New Note</button>
            {
                notes.map(note => (
                    <div className="note-view-all" style={{border: "1px solid purple"}}>
                        {note.title ? (<p>{note.title}</p>) : (<p>Untitled</p>)}
                        <p>{note.updatedAt}</p>
                        <button value={note.id} onClick={trashBtn}>Move To Trash</button>
                    </div>
                ))
            }
        </>
    )


}

export default ViewSingleNotebook;
