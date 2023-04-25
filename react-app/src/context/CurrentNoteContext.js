import { createContext, useContext, useState } from "react";

export const CurrentNoteContext = createContext();
export const useCurrentNote = () => useContext(CurrentNoteContext);

function CurrentNoteProvider (props) {

    const [current, setCurrent] = useState(null);

    return (
        <CurrentNoteContext.Provider value={{current, setCurrent}}>
            { props.children }
        </CurrentNoteContext.Provider>
    )

}

export default CurrentNoteProvider;
