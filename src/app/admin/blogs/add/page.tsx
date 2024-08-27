"use client";
import { useState, type ReactElement } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import DashboardContainer from "@/components/DashboardContainer";
import DashboardContent from "@/components/DashboardContent";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardTitle from "@/components/DashboardTitle";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export interface AddBlogPageProps {}

export default function AddBlogPage(props: AddBlogPageProps): ReactElement {
  const [content, setContent] = useState("");
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

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

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    console.log(newContent);
  };

  return (
    <DashboardContainer className="mx-auto max-w-[80ch]">
      <DashboardHeader>
        <DashboardTitle>Add New Blog</DashboardTitle>
      </DashboardHeader>
      <DashboardContent className="bg-background">
        <QuillEditor
          value={content}
          onChange={handleEditorChange}
          modules={quillModules}
          formats={quillFormats}
          className="w-full h-full bg-transparent"
        />
      </DashboardContent>
    </DashboardContainer>
  );
}
