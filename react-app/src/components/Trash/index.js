import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putNoteTrash } from "../../store/note";
import OpenModalButton from "../OpenModalButton";
import Navigation from "../Navigation";
import DeleteNote from "./DeleteNote";
import "./index.css";

function Trash() {

    const dispatch = useDispatch();
    const trash = useSelector(state => Object.values(state.notes.trash));

    const trashBtn = (e) => {
        e.preventDefault();
        dispatch(putNoteTrash(e.target.value));
    }


    return(
        <div className="display-page">
            <Navigation />
            <div className="trash-view">
                <div className="trash-view-header">
                    <h1>Trash</h1>
                </div>
                <div className="trash-view-action">
                    {trash.length === 1 ? (
                        <p>1 note</p>
                    ) : (
                        <p>{trash.length} notes</p>
                    )}
                </div>
                <div className="trash-view-notes">
                    {trash?.map(note => (
                        <div
                        id={note.id}
                        style={{border: "1px solid purple"}}
                        >
                            {note.title ? note.title : "Untitled"}
                            <br></br>
                            {note.updatedAt}
                            <br></br>
                            <button value={note.id} onClick={trashBtn}>Move out of Trash</button>
                            <OpenModalButton
                            buttonText="Delete"
                            modalComponent={<DeleteNote noteId={note.id} />}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )


}

export default Trash;
