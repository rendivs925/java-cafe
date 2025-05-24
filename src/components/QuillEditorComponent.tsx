import React from "react";
import { marked } from "marked";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

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

const QuillEditorComponent: React.FC<QuillEditorProps> = ({
  forwardedRef,
  value,
  onChange,
  placeholder = "Write your blog content here...",
  imageHandler,
}) => {
  const content = marked(value);

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
      syntax: true,
      handlers: {
        image: imageHandler,
      },
    },
  };

  return (
    <ReactQuill
      ref={forwardedRef}
      theme="snow"
      value={content as string}
      onChange={onChange}
      modules={quillModules}
      // formats={quillFormats}
      placeholder={placeholder}
    />
  );
};

export default QuillEditorComponent;
