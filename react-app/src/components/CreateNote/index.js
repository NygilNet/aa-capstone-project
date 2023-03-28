import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { readSingleNote } from "../../store/note";
import { updateNote, resetNote } from "../../store/note";
import Navigation from "../Navigation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreateNote({ note }) {

    const dispatch = useDispatch();
    // const history = useHistory();
    // const { id } = useParams();

    // useEffect(() => {
    //     dispatch(readSingleNote(id));
    //     setTitle(note.title);
    //     setContent(note.content);
    // }, [dispatch, id])

    // const note = useSelector(state => state.notes.note);

    useEffect(() => {
        dispatch(resetNote());
        dispatch(readSingleNote(note?.id))
        setTitle(note?.title)
        setContent(note?.content)
    }, [note])

    const [title, setTitle] = useState(note?.title);
    const [content, setContent] = useState(note?.content);
    const [saving, setSaving] = useState(false);
    const id = note?.id;

    let timer;


    const handleChange = async (e) => {

        setSaving(true);

        timer = setTimeout(async () => {
            const newNote = {
            title,
            content
        };
        const update = await dispatch(updateNote(id, newNote));
        if (update) setSaving(false);
        }, 2000)

    }

    if (!note) return null;

    return(
            <div className="edit-note-container">
                <form>
                    <input
                    type="text"
                    value={title}
                    onChange={e => {
                        setTitle(e.target.value)
                        handleChange(e)
                    }}
                    maxLength="255"
                    placeholder="Title"
                    />
                    <ReactQuill
                    className="edit-note-editor"
                    theme="snow"
                    value={content}
                    onChange={e => {
                        setContent(e)
                        handleChange(e)
                    }}
                    placeholder="Start writing..."
                    />
                </form>
                {saving ? (<p>Saving...</p>) : (<p>All changes saved</p>)}
            </div>
    )

}

export default CreateNote;
