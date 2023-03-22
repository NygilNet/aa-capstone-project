
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getNotebook } from "../../store/notebook";

function ViewSingleNotebook() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const notebook = useSelector(state => state.notebooks.notebook);

    useEffect(() => {
        dispatch(getNotebook(id));
    }, [dispatch]);

    return (
        <>
            <h1>hello from single notebook details page</h1>
            <p>{notebook.id}</p>
        </>
    )


}

export default ViewSingleNotebook;
