import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { readSingleNote } from "../../store/note";
import { updateNote, resetNote } from "../../store/note";
// import { getNotebooks } from "../../store/notebook";
import OpenModalButton from "../OpenModalButton";
import MoveNote from "./MoveNote";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import Editor from "./Editor";
import "./index.css";

function CreateNote({ noteId }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetNote());
        dispatch(readSingleNote(noteId))
        setTitle(note?.title)
        setContent(note?.content)
    }, [dispatch])


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [saving, setSaving] = useState(false);
    const note = useSelector(state => state.notes.note)
    const notebooks = useSelector(state => Object.values(state.notebooks.all_notebooks))
    const notebook = notebooks?.find(notebook => +notebook.id === +note?.notebookId)

    useEffect(() => {
        setTitle(note?.title)
        setContent(note?.content)
    }, [note])

    let timer;


    const handleChange = async (e) => {
        console.log(title)
        setSaving(true);
        clearTimeout(timer)

        timer = setTimeout(async () => {
            const newNote = {
            title,
            content
        };
        const update = await dispatch(updateNote(noteId, newNote));
        if (update) setSaving(false);
        }, 300)

    }

    if (!note || !notebook) return null;

    return(
            <div className="edit-note-container">
                <div className="edit-note-notebook">
                    <NavLink to={`/notebooks/${notebook.id}`}>{notebook.name}</NavLink>
                    <OpenModalButton
                    buttonText="Move Note"
                    modalComponent={<MoveNote notebooks={notebooks} n={notebook} />}
                    />
                </div>
                <form>
                    <input
                    type="text"
                    value={title}
                    onChange={e => {
                        setTitle(e.target.value)
                        handleChange(e.target.value)
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
                    {/* <Editor

                    /> */}
                </form>
                {saving ? (<p>Saving...</p>) : (<p>All changes saved</p>)}
            </div>
    )

}

export default CreateNote;
