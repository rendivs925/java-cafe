import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "align",
  "color",
  "code-block",
];

interface QuillEditorProps {
  forwardedRef: any;
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  imageHandler: () => void;
}

// Remove forwardRef and use params directly
const QuillEditorComponent: React.FC<QuillEditorProps> = ({
  forwardedRef,
  value,
  onChange,
  placeholder = "Write your blog content here...",
  imageHandler,
}) => {
  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "video"],
        [{ align: [] }],
        [{ color: [] }],
        ["code-block"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  return (
    <ReactQuill
      ref={forwardedRef}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={quillModules}
      formats={quillFormats}
      placeholder={placeholder}
    />
  );
};

export default QuillEditorComponent;
