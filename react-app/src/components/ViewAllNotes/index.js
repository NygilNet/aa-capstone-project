import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { readAllNotes } from "../../store/note";
import { resetNote, readSingleNote } from "../../store/note";
import Navigation from "../Navigation";
import CreateNote from "../CreateNote";
import "./index.css";


function ViewAllNotes() {

    const dispatch = useDispatch();
    const history = useHistory();
    const notes = useSelector(state => Object.values(state.notes.notes));
    const [note, setNote] = useState(null);


    useEffect(() => {
        dispatch(resetNote());
        const func = async e => {
            const notesArr = Object.values(await dispatch(readAllNotes()));
        }
        func()
    }, [dispatch]);

    useEffect(() => {
        dispatch(resetNote());
        dispatch(readSingleNote(note?.id));

    }, [note])

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
                {notes?.map(note => (
                    <div
                    id={note.id}
                    className="curs"
                    onClick={e => {
                        setNote(notes.find(note => +note.id === +e.target.id));
                    }}
                    style={{border: "1px solid purple"}}
                    >
                        {note.title ? note.title : "Untitled"}
                        <br></br>
                        {note.updatedAt}
                    </div>
                ))}
            </div>
            {note ? <CreateNote note={note} /> : <p>Select a note to update!</p> }
        </div>
    )

}

export default ViewAllNotes;
