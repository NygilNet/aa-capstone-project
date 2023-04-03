import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { updateNote } from "../../store/note";

function MoveNote({ notebooks, n }) {

    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const [current, setCurrent] = useState(n.id);
    const original = n.id;

    const onSubmit = (e) => {
        e.preventDefault();
        const change = {
            notebook_id: change
        }
        dispatch(updateNote(change));
    }

    return (
        <div className="move-note-modal">
            <h2>Move note to...</h2>
            <form className="move-note-list">
                <select
                value={current}
                onChange={e => setCurrent(e.target.value)}
                >
                    {notebooks.map(notebook => (
                        <option
                        value={notebook.id}
                        >
                            {notebook.name}
                        </option>
                    ))}
                </select>
                <div className="move-note-buttons">
                    <button
                    className="move-note-submit"
                    onClick={onSubmit}
                    disabled= {original === current ? true : false}
                    >
                        Done
                    </button>
                    <button className="move-note-cancel" onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    )


}

export default MoveNote;
