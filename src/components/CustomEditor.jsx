/* eslint-disable react/prop-types */
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";

export default function CustomEditor({ onChange, placeholder }) {
    const [editorState, setEditorState] = useState();

    const handleEditorChange = (state) => {
        setEditorState(state);
        const contentState = state.getCurrentContent();
        const html = stateToHTML(contentState);
        onChange(html); // إرسال كود HTML إلى الـ Parent Component
    };

    return (
        <div style={{ border: "1px solid #ddd", padding: 10 }}>
            <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                toolbar={{
                    options: ["inline", "textAlign", "history"],
                }}
                placeholder={placeholder}
            />
        </div>
    );
}
