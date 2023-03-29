import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditNotebook from "../EditNotebook";
import DeleteNotebook from "../DeleteNotebook";
import { getNotebooks } from "../../store/notebook";
import Navigation from "../Navigation";
import "./index.css";


function ViewAllNotebooks() {

    const dispatch = useDispatch();
    const history = useHistory();
    const notebooks = useSelector(state => Object.values(state.notebooks.all_notebooks));

    useEffect(() => {
        dispatch(getNotebooks());
    }, [dispatch]);

    const createNotebook = (e) => {
        e.preventDefault();
        return history.push('/notebooks/new');
    }

    if (!notebooks) return null;

    return (
        <div className="display-page">
            <Navigation />
            <div className="notebooks-view-all">
                <div className="notebooks-view-all-header">
                    <h1>Notebooks</h1>
                </div>
                <div className="notebooks-view-all-action">
                    {notebooks.length === 1 ? (
                        <p>1 Notebook</p>
                    ): (
                        <p>{notebooks.length} Notebooks</p>
                    )}
                    <button
                    onClick={createNotebook}
                    className="notebooks-action-new-button curs"
                    >
                        New Notebook
                    </button>
                </div>
                <div
                className="notebooks-view-all-notebooks"
                >
                {notebooks?.map(notebook => (
                    <div
                    id = {notebook.id}
                    className="notebooks-view-all-notebook"
                    style={{border: "1px solid purple"}}>
                        <NavLink to={`/notebooks/${notebook.id}`}>{notebook.name} ({notebook.notes?.filter(note => !note.trash).length})</NavLink>

                        <p>{notebook.updatedAt}</p>
                        <OpenModalButton
                        buttonText="Rename notebook"
                        modalComponent={<EditNotebook notebook={notebook} />}
                        />
                        <OpenModalButton
                        buttonText="Delete notebook"
                        modalComponent={<DeleteNotebook notebook={notebook} notebooks={notebooks} />}
                        />
                    </div>
                ))}
                </div>
            </div>
        </div>

    );

}

export default ViewAllNotebooks;
