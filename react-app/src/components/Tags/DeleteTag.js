import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteTag.css";

function DeleteTag({ tagId }) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const onDelete = async () => {
        // await dispatch
        closeModal();
    }

    return (
        <div className="delete-tag-container">
            <div className="delete-tag-content">
                <h1>Delete this tag?</h1>
                <p>This cannot be undone.</p>
                <button className="delete-tag-submit curs">Delete</button>
                <button className="delete-tag-cancel curs">Cancel</button>
            </div>
        </div>
    )

}

export default DeleteTag;
