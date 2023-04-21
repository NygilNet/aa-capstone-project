import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteTag } from "../../store/tag";
import "./DeleteTag.css";

function DeleteTag({ tagId }) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const onDelete = async () => {
        await dispatch(deleteTag(tagId));
        closeModal();
    }

    return (
        <div className="delete-tag-container">
            <div className="delete-tag-content">
                <h1>Delete this tag?</h1>
                <p>This cannot be undone.</p>
                <button className="delete-tag-submit curs" onClick={onDelete}>Delete</button>
                <button className="delete-tag-cancel curs" onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )

}

export default DeleteTag;
