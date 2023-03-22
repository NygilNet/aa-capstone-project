
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotebook } from "../../store/notebook";

function ViewSingleNotebook({ notebookId }) {

    const dispatch = useDispatch();
    const notebook = useSelector(state => state.notebooks.notebook);

    useEffect(() => {
        dispatch(getNotebook(notebookId))
    }, [dispatch]);

    return (
        <>
            <h1>hello from single notebook details page</h1>
        </>
    )


}

export default ViewSingleNotebook;
