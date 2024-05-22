import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { readSingleNote } from "../../store/note";
import { updateNote, resetNote } from "../../store/note";
// import { getNotebooks } from "../../store/notebook";
import OpenModalButton from "../OpenModalButton";
import MoveNote from "./MoveNote";
import EditTags from "./EditTags";
// import ReactQuill from "react-quill";
// // import "react-quill/dist/quill.snow.css";
import Editor from "../Editor";
import "./index.css";

function CreateNote({ noteId }) {

    const dispatch = useDispatch();
    const note = useSelector(state => state.notes.note)
    const noteTitle = note.title
    const noteContent = note.content
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [saving, setSaving] = useState(false);
    const notebooks = useSelector(state => Object.values(state.notebooks.all_notebooks))
    const notebook = notebooks?.find(notebook => +notebook.id === +note?.notebookId)
    const tags = useSelector(state => Object.values(state.tags));
    const notesTags = tags.filter(tag => tag.notes.includes(noteId))
    console.log(tags)
    console.log(notesTags)


    useEffect(() => {
        dispatch(resetNote());
        dispatch(readSingleNote(noteId))
    }, [dispatch, noteId])

    useEffect(() => {
        setTitle(noteTitle)
        setContent(noteContent)
    }, [note])


    const handleSubmit = (e) => {
        e.preventDefault();
        setSaving(true);

        const newNote = {
            title,
            content
        }

        const confirm = dispatch(updateNote(noteId, newNote));

        setSaving(false);
        if (confirm) return alert('Save successful!');
    }


    if (!note || !notebook) return null;

    return(

            <div className="edit-note-container">
                <form
                className="edit-note-form"
                onSubmit={handleSubmit}
                >
                <div className="edit-note-notebook" onClick={e => e.preventDefault()}>
                    <NavLink to={`/notebooks/${notebook.id}`}><i class="fa-solid fa-book"></i>{notebook.name}</NavLink>
                    <OpenModalButton
                    nameClass="edit-note-notebook-btn curs"
                    buttonText="Move Note"
                    modalComponent={<MoveNote notebooks={notebooks} n={notebook} id={noteId} />}
                    />
                    <OpenModalButton
                    nameClass="edit-note-notebook-btn curs"
                    buttonText="Edit Tags"
                    modalComponent={<EditTags />}
                    />
                </div>
                    <input
                    className="edit-note-title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value) }
                    maxLength="255"
                    placeholder="Title"
                    />
                    <Editor />
                    {/* <ReactQuill
                    className="edit-note-editor"
                    theme="snow"
                    value={content}
                    onChange={e => setContent(e) }
                    placeholder="Start writing..."
                    /> */}
                    <input
                    className="edit-note-submit curs"
                    type="submit"
                    value={ saving ? "Please wait..." : "Save current changes" }
                    disabled={ saving ? true : false }
                    />
                </form>
            </div>
    )

}

export default CreateNote;
