import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNotebook } from "../../store/notebook";
import Navigation from "../Navigation";
import "./index.css";


function CreateNotebook() {

    const dispatch = useDispatch();
    const history = useHistory();
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
            return alert('Can not submit');
        }

        const newNotebook = await dispatch(createNotebook({ name }));
        setAttempt(false);
        if (newNotebook) return history.push(`/notebooks`);

    }


    return (
        <div className="display-page">
            <Navigation />
            <div className="create-notebook-page">
                <h1>Create a New Notebook</h1>
                <p>Notebooks are useful for grouping notes around a common topic.</p>
                <form
                className="create-notebook-form"
                onSubmit={handleSubmit}
                >
                    <label
                    className="create-notebook-name"
                    >
                        Name
                        <input
                            className="create-notebook-name-input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Notebook name"
                        />
                        { attempt && validationErrors.name ? (
                            <div className="errors">{validationErrors.name}</div>
                            ) : null }
                    </label>
                    <input
                        className="create-notebook-create-btn curs"
                        type="submit"
                        value="Create"
                        disabled={name ? false: true}
                    />
                    <button
                    className="create-notebook-cancel-btn curs"
                    onClick={(e) => history.push(`/notebooks`)}>Cancel</button>
                </form>
            </div>
        </div>
    )

}

export default CreateNotebook;
