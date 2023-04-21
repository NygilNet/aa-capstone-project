import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { createTag } from "../../store/tag";
import "./CreateNewTag.css";

function CreateNewTag({ userId }) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [name, setName] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        name: ''
    });
    const [attempt, setAttempt] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAttempt(true);

        const errors = {};
        if (name.length > 100) errors.name = 'Name can not be more than 100 characters';
        if (Object.values(errors)[0]) {
            setValidationErrors(errors);
            return alert('Name can not be more than 100 characters.')
        }

        const newTag = await dispatch(createTag({
            user_id: userId,
            tag_name: name
        }));
        setAttempt(false);
        if (newTag) closeModal();
    }

    return (
        <div className="create-new-tag-container">
            <h1>Create a New Tag</h1>
                <p>Tags let you add keywords to notes, making them easier to find and browse.</p>
                <form
                className="create-tag-form"
                onSubmit={handleSubmit}
                >
                    <label
                    className="create-tag-name"
                    >
                        Name
                        <input
                            className="create-tag-name-input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tag name"
                        />
                        { attempt && validationErrors.name ? (
                            <div className="errors">{validationErrors.name}</div>
                            ) : null }
                    </label>
                    <input
                        className="create-tag-create-btn curs"
                        type="submit"
                        value="Create"
                        disabled={name ? false: true}
                    />
                    <button
                    className="create-tag-cancel-btn curs"
                    onClick={closeModal}>Cancel</button>
                </form>
        </div>
    )

}

export default CreateNewTag;
