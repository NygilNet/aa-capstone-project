import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";

function EditTags() {

    const { closeModal } = useModal();
    const dispatch = useDispatch();

    return (
        <div className="edit-tags-modal">
            editing tags coming soon
        </div>
    )

}

export default EditTags;
