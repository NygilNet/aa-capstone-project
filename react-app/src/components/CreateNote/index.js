import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { readSingleNote } from "../../store/note";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreateNote() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const note = useSelector(state => state.notes.note);

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const [saved, setSaved] = useState('All changes saved');


    useEffect(() => {
        readSingleNote(id);
    }, [dispatch])

    useEffect(() => {
        setSaved('Saving...');



        setSaved('All changes saved');
    }, [title, content, dispatch])

    if (!note) return null;

    return(
        <>
            <h1>hello from create a note</h1>
            <form>
                <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                maxLength="255"
                placeholder="Title"
                />
                <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Start writing..."
                />
            </form>
            <p>{saved}</p>
        </>
    )

}

export default CreateNote;
