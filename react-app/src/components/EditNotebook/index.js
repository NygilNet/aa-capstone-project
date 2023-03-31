import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { changeNotebook } from "../../store/notebook";
import "./index.css";

function EditNotebook({ notebook }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const [name, setName] = useState(notebook.name);
    const ON = notebook.name;
    const [errors, setErrors] = useState({});
    const [attempt, setAttempt] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAttempt(true);

        const error = {};
        if (name.length > 100) error.name = 'Name can not be more than 100 characters';
        setErrors(error);

        if (Object.values(errors).length) return alert('Can not submit');

        const editedNotebook = await dispatch(changeNotebook(notebook.id, { name }));
        if (editedNotebook) {
            closeModal();
            return history.push('/notebooks');
        }
    }

    return(
        <div className="edit-notebook-container">
            <h1>Rename notebook</h1>
            <form
            className="edit-notebook-form"
            onSubmit={handleSubmit}
            >
                <label
                className="edit-notebook-name"
                >
                    Name
                    <input
                    className="edit-notebook-name-input"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    { attempt && errors.name ? (
                        <div className="errors">{errors.name}</div>
                    ) : null }
                </label>
                <input
                className="edit-notebook-submit curs"
                type="submit"
                value="Continue"
                disabled={name === ON ? true: false}
                />
                <button className="edit-notebook-cancel curs" onClick={closeModal}>Cancel</button>
            </form>
        </div>
    )

}

export default EditNotebook;
