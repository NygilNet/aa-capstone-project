import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { readSingleNote } from "../../store/note";
import { updateNote } from "../../store/note";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreateNote() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    console.log('how often is the id change ===>',id)

    const note = useSelector(state => state.notes.note);
    useEffect(() => {
        dispatch(readSingleNote(id));
        setTitle(note.title);
        setContent(note.content);
    }, [dispatch, id])

    console.log('The note object from state', note)
    const user = useSelector(state => state.session.user);

    const [title, setTitle] = useState(note.title);
    console.log('state variable that had the object passed in ---->', title)
    console.log('The value in the object -->', note.title)
    const [content, setContent] = useState(note.content);
    const [saving, setSaving] = useState(false);


    const handleChange = async (e) => {
        setSaving(true);
        const newNote = {
            title,
            content
        };
        const update = await dispatch(updateNote(id, newNote));
        if (update) setSaving(false);
    }

    console.log(note.userId)
    console.log(user.id)
    console.log(note.userId === user.id)
    // if (note.userId !== user.id) return history.push('/');

    if (!note) return null;
    return(
        <>
            <h1>hello from create a note</h1>
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
        </>
    )

}

export default CreateNote;
