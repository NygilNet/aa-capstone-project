import React from "react";
import { useHistory } from "react-router-dom";

function SplashPage() {

    const history = useHistory();

    const handleNotebooks = (e) => {
        e.preventDefault();
        return history.push('/notebooks');
    }

    return (
        <>
            <h1>Hello from the splash page, make sure you are signed in</h1>
            <button onClick={handleNotebooks}>Notebooks</button>
        </>
    )

}

export default SplashPage;
