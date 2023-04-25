import React, { useEffect, useState } from "react";
import NotesList from "./NotesList";
import CreateNote from "../CreateNote";
import { useCurrentNote } from "../../context/CurrentNoteContext";
import "./index.css";


function ViewAllNotes({ notes, filtered }) {

    const { current, setCurrent } = useCurrentNote();

    if (!notes) return null;

    return (
        <>
            <div className="notes-view-all">
                <div className="notes-view-all-header">
                    <h1><i class="fa-solid fa-file-lines"> </i>  Notes</h1>
                </div>
                <div className="notes-view-all-action">
                    {notes.length === 1 ? (
                        <p>1 note</p>
                    ) : (
                        <p>{notes.length} notes</p>
                    )}
                    { filtered ? <p>(filtered)</p> : null }
                </div>
                <NotesList notes={notes} />
            </div>
            {current ? <CreateNote noteId={current.id} /> : <p className="create-note-no-note">Select a note to update!</p> }
        </>
    )

}

export default ViewAllNotes;
