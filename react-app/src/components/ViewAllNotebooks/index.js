import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditNotebook from "../EditNotebook";
import DeleteNotebook from "../DeleteNotebook";
import { getNotebooks } from "../../store/notebook";
import Navigation from "../Navigation";


function ViewAllNotebooks({ sessionUser }) {

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

    if (!notebooks || !sessionUser) return null;

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
                    <button onClick={createNotebook}>New Notebook</button>
                </div>
                {notebooks?.map(notebook => (
                    <div style={{border: "1px solid purple"}}>
                        <NavLink to={`/notebooks/${notebook.id}`}>{notebook.id}</NavLink>
                        <p>{notebook.name} ({notebook.notes?.filter(note => !note.trash).length})</p>
                        <p>{notebook.updatedAt}</p>
                        <OpenModalButton
                        buttonText="Rename notebook"
                        modalComponent={<EditNotebook notebook={notebook} />}
                        />
                        <OpenModalButton
                        buttonText="Delete notebook"
                        modalComponent={<DeleteNotebook notebook={notebook} />}
                        />
                    </div>
                ))}
            </div>
        </div>

    );

}

export default ViewAllNotebooks;
