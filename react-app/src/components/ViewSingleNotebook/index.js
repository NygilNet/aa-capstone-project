
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getNotebook } from "../../store/notebook";
import { readAllNotes } from "../../store/note";
import { createNote } from "../../store/note";
import { putNoteTrash } from "../../store/note";
import Navigation from "../Navigation";
import OpenModalButton from "../OpenModalButton";
import EditNotebook from "../EditNotebook";
import DeleteNotebook from "../DeleteNotebook";
import "./index.css";


function ViewSingleNotebook({ user }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const notebooks = useSelector(state => Object.values(state.notebooks.all_notebooks));
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
            return history.push(`/notes`)
        } else {
            return alert('ERROR')
        }
    }

    const trashBtn = async (e) => {
        e.preventDefault();
        dispatch(putNoteTrash(e.target.value));
    }

    // if (notebook.userId !== user.id) return history.push('/');
    if (!notes || !notebook) return null;

    return (
        <div className="display-page">
            <Navigation />

            { user.id === notebook.userId && (

            <div className="view-single-notebook-container">
                <h1>Hello from {notebook.name}</h1>
                <div className="single-notebook-actions">
                    <OpenModalButton
                    buttonText="Rename notebook"
                    modalComponent={<EditNotebook notebook={notebook} />}
                    />
                    <OpenModalButton
                    buttonText="Delete notebook"
                    modalComponent={<DeleteNotebook notebook={notebook} notebooks={notebooks} />}
                    />
                    <button onClick={newNoteBtn}>New Note</button>
                </div>
                <div className="single-notebook-view-notes">
                {
                    notes.map(note => (
                        <div className="note-view-all" >
                            {note.title ? (<p className="notebook-note-title">{note.title}</p>) : (<p className="notebook-note-title">Untitled</p>)}
                            <p>{note.updatedAt}</p>
                            <button className="notebook-note-trash curs" value={note.id} onClick={trashBtn}>Move To Trash</button>
                        </div>
                    ))
                }
                </div>
            </div>
            )}
        </div>
    )


}

export default ViewSingleNotebook;
