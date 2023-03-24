import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetNotebooks } from "../../store/notebook";

function SplashPage() {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetNotebooks());
    }, [dispatch])

    const handleNotebooks = (e) => {
        e.preventDefault();
        return history.push('/notebooks');
    }

    const handleTrash = (e) => {
        e.preventDefault();
        return history.push('/trash');
    }

    return (
        <>
            <h1>Hello from the splash page, make sure you are signed in</h1>
            <button onClick={handleNotebooks}>Notebooks</button>
            <button onClick={handleTrash}>Trash</button>
        </>
    )

}

export default SplashPage;
