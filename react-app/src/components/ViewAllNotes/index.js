import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { resetNote, readSingleNote, readAllNotes, putNoteTrash } from "../../store/note";
import Navigation from "../Navigation";
import CreateNote from "../CreateNote";
import "./index.css";


function ViewAllNotes() {

    const dispatch = useDispatch();
    const history = useHistory();
    const notes = useSelector(state => Object.values(state.notes.notes)).reverse();
    const [current, setCurrent] = useState(null);


    // useEffect(() => {
    //     dispatch(resetNote());
    //     const func = async e => {
    //         const notesArr = Object.values(await dispatch(readAllNotes()));
    //     }
    //     func()
    // }, [dispatch]);

    // useEffect(() => {
    //     dispatch(readSingleNote(current?.id));

    // }, [current])

    const trashBtn = (e) => {
        e.preventDefault();
        dispatch(putNoteTrash(e.target.value));
    }

    if (!notes) return null;

    return (
        <div className="display-page">
            <Navigation />
            <div className="notes-view-all">
                <div className="notes-view-all-header">
                    <h1>Notes</h1>
                </div>
                <div className="notes-view-all-action">
                    {notes.length === 1 ? (
                        <p>1 note</p>
                    ) : (
                        <p>{notes.length} notes</p>
                    )}
                </div>
                <div className="notes-view-all-notes">
                    {notes?.map(note => (
                        <div
                        id={note.id}
                        className="notes-view-all-note curs"
                        onClick={e => {
                            setCurrent(notes.find(note => +note.id === +e.target.id));
                        }}
                        style={{border: "1px solid purple"}}
                        >
                            <p id={note.id} className="note-title">{note.title ? note.title : "Untitled"}</p>
                            <br></br>
                            {note.updatedAt}
                            <br></br>
                            <button value={note.id} onClick={trashBtn}>Move To Trash</button>
                        </div>
                    ))}
                </div>
            </div>
            {current ? <CreateNote noteId={current.id} /> : <p>Select a note to update!</p> }
        </div>
    )

}

export default ViewAllNotes;
