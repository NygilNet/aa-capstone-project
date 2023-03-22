
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getNotebook } from "../../store/notebook";

function ViewSingleNotebook() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const notebook = useSelector(state => state.notebooks.notebook);
    const notes = notebook.notes?.filter(note => !note.trash);

    useEffect(() => {
        dispatch(getNotebook(id));
    }, [dispatch]);

    if (!notes || !notebook) return null;

    return (
        <>
            <h1>hello from {notebook.name}</h1>
            {
                notes.map(note => (
                    <div className="note-view-all" style={{border: "1px solid purple"}}>
                        <p>{note.title}</p>
                        <p>{note.updatedAt}</p>
                    </div>
                ))
            }
        </>
    )


}

export default ViewSingleNotebook;
