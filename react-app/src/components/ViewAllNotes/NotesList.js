import React from "react";
import { useDispatch } from "react-redux";
import { putNoteTrash } from "../../store/note";
import { useCurrentNote } from "../../context/CurrentNoteContext";

function NotesList ({notes }) {

    const dispatch = useDispatch();
    const { current, setCurrent } = useCurrentNote();

    const trashBtn = (e) => {
        e.preventDefault();
        dispatch(putNoteTrash(e.target.value));
    }

    return (
        <div className="notes-view-all-notes">
        {notes?.map(note => (
            <div
            id={note.id}
            className="notes-view-all-note curs"
            onClick={e => {
                setCurrent(notes.find(note => +note.id === +e.target.id));
            }}
            >
                <p id={note.id} className="note-title">{note.title ? note.title : "Untitled"}</p>
                <br></br>
                {note.updatedAt}
                <br></br>
                <button className="note-trash-btn curs" value={note.id} onClick={trashBtn}>Move To Trash</button>
            </div>
        ))}
    </div>
    )

}

export default NotesList;
