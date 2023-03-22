import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotebooks } from "../../store/notebook";


function ViewAllNotebooks() {

    const dispatch = useDispatch();
    const notebooks = useSelector(state => Object.values(state.notebooks.all_notebooks));

    useEffect(() => {
        dispatch(getNotebooks());
    }, [dispatch]);


    return (
        <>
            <h1>Hello from view all notebooks component</h1>
            {notebooks.map(notebook => (
                <div style={{border: "1px solid purple"}}>
                    <p>{notebook.id}</p>
                    <p>{notebook.name}</p>
                </div>
            ))}
        </>

    );

}

export default ViewAllNotebooks;
