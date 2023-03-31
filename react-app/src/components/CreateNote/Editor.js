import React, { useEffect, useState } from "react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add css for snow theme

function Editor() {

    const { quill, quillRef } = useQuill();
    const [value, setValue] = useState();

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
            //   console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
              setValue(quillRef.current.firstChild.innerHTML)
            });
          }
    }, [quill])

    return(
        <div className="edit-note-editor" data-value={value}>
            <div style={{ width: 500, height: 300 }}>
                <div ref={quillRef} />
            </div>
        </div>
    )

}

export default Editor;
