import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreateNote() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [saved, setSaved] = useState('All changes saved');

    const dispatch = useDispatch();

    useEffect(() => {
        setSaved('Saving...');



        setSaved('All changes saved');
    }, [title, content, dispatch])

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
                <ReactQuill theme="snow" value={content} onChange={setContent} />
            </form>
            <p>{saved}</p>
        </>
    )

}

export default CreateNote;
