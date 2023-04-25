import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewAllNotes from "./ViewAllNotes";
import Navigation from "../Navigation";

function NotesPage ({ tags }) {

    const notes = useSelector(state => state.notes.notes);
    const notesArr = Object.values(notes).reverse();

    return (
        <div className="display-page">
            <Navigation />
            <ViewAllNotes notes={notesArr} filtered={false} />
        </div>
    )

}

export default NotesPage;
