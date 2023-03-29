import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readTrash } from "../../store/note";
import Navigation from "../Navigation";

function Trash() {

    const dispatch = useDispatch();
    const trash = useSelector(state => Object.values(state.notes.trash));


    return(
        <div className="display-page">
            <Navigation />
            <h1>hello from trash</h1>
        </div>
    )


}

export default Trash;
