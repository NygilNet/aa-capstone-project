import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { changeNotebook } from "../../store/notebook";

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
            return history.push(`/notebooks`);
        }
    }

    return(
        <>
            <h1>Rename notebook</h1>
            <form
            onSubmit={handleSubmit}
            >
                <label>
                    Name
                    <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    { attempt && errors.name ? (
                        <div className="errors">{errors.name}</div>
                    ) : null }
                </label>
                <button onClick={closeModal}>Cancel</button>
                <input
                type="submit"
                value="Continue"
                disabled={name === ON ? true: false}
                />
            </form>
        </>
    )

}

export default EditNotebook;
