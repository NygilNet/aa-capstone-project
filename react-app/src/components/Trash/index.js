import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readTrash } from "../../store/note";

function Trash() {

    const dispatch = useDispatch();
    const trash = useSelector(state => Object.values(state.notes.trash));

    useEffect(() => {
        dispatch(readTrash());
    }, [dispatch])

    return(
        <h1>hello from trash</h1>
    )


}

export default Trash;
