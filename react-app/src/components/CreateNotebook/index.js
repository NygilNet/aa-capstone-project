import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


function CreateNotebook() {

    const [name, setName] = useState('');


    return (
        <>
            <h1>hello from create notebook form</h1>
            <form>
                <label>
                    Name
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Notebook name"
                    />
                </label>
                <button>Cancel</button>
                <input
                type="submit"
                value="Create"
                />
            </form>
        </>
    )

}

export default CreateNotebook;
