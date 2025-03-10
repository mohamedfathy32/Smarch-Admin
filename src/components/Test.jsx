/* eslint-disable react/prop-types */
import { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Test({ value, onChange }) {
    const quillRef = useRef(null);

    function addImageByURL() {
        const url = prompt("أدخل رابط الصورة:");
        if (url) {
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range.index, "image", url);
        }
    }

    const modules = {
        toolbar: {
            container: [
                [{ font: [] }, { size: [] }],
                ["bold", "italic", "underline", "strike"],
                [{ header: 1 }, { header: 2 }, { header: 3 }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["blockquote", "code-block"],
                ["link", "image", "video"],
                ["clean"],
            ],
        },
    };

    return (
        <div>
            <button
                onClick={addImageByURL}
                className="mb-2 px-4 py-2 bg-blue-500 text-white font-bold rounded-md transition duration-300 hover:bg-blue-700"
            >
                🖼️ إضافة صورة في المحتوى
            </button>

            <ReactQuill
                ref={quillRef}
                value={value}
                onChange={onChange}
                modules={modules}
                theme="snow"
                placeholder="اكتب هنا..."
            />
        </div>
    );
}
