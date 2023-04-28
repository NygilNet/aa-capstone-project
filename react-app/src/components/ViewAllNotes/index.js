import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFilterParams } from "../../context/FilterParamsContext";
import ViewAllNotes from "./ViewAllNotes";
import Navigation from "../Navigation";

function NotesPage ({ tags }) {

    const notes = useSelector(state => state.notes.notes);
    const { filterParams, setFilterParams } = useFilterParams();
    const [notesArr, setNotesArr] = useState(Object.values(notes).reverse());

    useEffect(() => {

        if (filterParams === "All") {
            setNotesArr(Object.values(notes).reverse());
        } else {
            const filteredArr = [];
            tags[filterParams].notes.forEach(note => filteredArr.push(notes[note]))
            setNotesArr(filteredArr);
        }

    }, [filterParams])

    return (
        <div className="display-page">
            <Navigation />
            <ViewAllNotes notes={notesArr} tags={tags}  />
        </div>
    )

}

export default NotesPage;
