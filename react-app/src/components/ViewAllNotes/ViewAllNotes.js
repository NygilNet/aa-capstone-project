import React, { useEffect, useState } from "react";
import NotesList from "./NotesList";
import CreateNote from "../CreateNote";
import { useCurrentNote } from "../../context/CurrentNoteContext";
import { useFilterParams } from "../../context/FilterParamsContext";
import "./index.css";


function ViewAllNotes({ notes, tags }) {

    const { current, setCurrent } = useCurrentNote();
    const { filterParams, setFilterParams } = useFilterParams();
    const filtered = filterParams === "All" ? false : true;
    const tagsArr = Object.values(tags)

    if (!notes) return null;

    return (
        <>
            <div className="notes-view-all">
                <div className="notes-view-all-header">
                    <h1><i class="fa-solid fa-file-lines"> </i>  Notes</h1>
                </div>
                <div className="notes-view-all-filter">
                    <i class="fa-solid fa-filter"></i>
                    <select
                    value={filterParams}
                    onChange={e => setFilterParams(e.target.value)}
                    >
                        <option value="All">All</option>
                        { tagsArr[0] ?
                            tagsArr.map(tag => (
                                <option value={tag.id}>{tag.tagName}</option>
                            )) : null
                        }
                    </select>
                </div>
                <div className="notes-view-all-action">
                    {notes.length === 1 ? (
                        <p>1 note</p>
                    ) : (
                        <p>{notes.length} notes</p>
                    )}
                    { filtered ? <p style={{marginLeft: "10px"}}>(filtered)</p> : null }
                </div>
                <NotesList notes={notes} />
            </div>
            {current ? <CreateNote noteId={current.id} /> : <p className="create-note-no-note">Select a note to update!</p> }
        </>
    )

}

export default ViewAllNotes;
