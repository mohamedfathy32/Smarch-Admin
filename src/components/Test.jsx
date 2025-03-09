import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";


export default function Test() {
    const [editorState, setEditorState] = useState();
    const [htmlContent, setHtmlContent] = useState(""); // لحفظ كود HTML

    const handleConvertToHtml = () => {
        const contentState = editorState.getCurrentContent(); // الحصول على المحتوى
        console.log(contentState)
        const html = stateToHTML(contentState); // تحويله إلى HTML
        setHtmlContent(html); // حفظه في الحالة
        console.log("HTML Content:", html); // طباعته في الكونسول
    };

    return (
        <>
            <div style={{ border: "1px solid #ddd", padding: 10 }}>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    toolbar={{
                        options: [
                            "inline",
                            "textAlign",
                            "history",
                        ],

                    }}

                />
            </div>
            <button onClick={handleConvertToHtml} style={{ marginTop: 10 }}>
                تحويل إلى HTML
            </button>

            {/* عرض الـ HTML بشكل منفذ */}
            <div
                style={{ marginTop: 20, padding: 10, border: "1px solid #ddd", background: "#fafafa" }}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </>
    );
};