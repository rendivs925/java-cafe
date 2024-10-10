"use client";
import RenderBlog from "@/components/RenderBlog";
import {
  useCallback,
  useRef,
  useEffect,
  useState,
  type ReactElement,
} from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import useClientComponent from "@/hooks/useClientComponent";
import { Button } from "@/components/ui/button";
import TurndownService from "turndown";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { FormLabel, FormMessage } from "@/components/ui/form";
import TagInput from "@/components/TagInput";
import InputFormField from "@/components/InputFormField";
import { FormField as IFormField } from "@/components/AddProductForm";
import { updateBlogAction } from "@/actions/updateBlogAction";
import { handleUpload } from "@/lib/storage";
import ReactQuill from "react-quill";
import useAppContext from "@/hooks/useAppContext";
import { BlogFormSchema } from "@/schemas/BlogFormSchema";
import { IBlog } from "@/models/Blog";

const QuillEditorComponent = dynamic(
  () => import("@/components/QuillEditorComponent"),
  { ssr: false },
);

export interface EditBlogFormProps {
  blog: IBlog;
}

export default function EditBlogForm({
  blog,
}: EditBlogFormProps): ReactElement {
  const [content, setContent] = useState<string>("");
  const isClient = useClientComponent();
  const { user } = useAppContext();
  const reactQuillRef = useRef<ReactQuill>(null);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const formMethods = useForm<z.infer<typeof BlogFormSchema>>({
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      blogTitle: blog?.title,
      content: blog?.content,
      tags: blog?.tags,
      description: blog?.description,
    },
  });
  console.log(blog);

  const currentBlogData = formMethods.watch();

  const blogData = {
    title: currentBlogData?.title || blog?.title,
    content: currentBlogData?.content || blog?.content,
    tags: currentBlogData?.tags || blog?.tags,
    description: currentBlogData?.description || blog?.description,
    author: {
      authorId: blog?.author?.authorId,
      username: blog?.author?.username,
      imgUrl: blog?.author?.imgUrl,
    },
    prevImgUrl: imageSrc || blog?.prevImgUrl,
    createdAt: blog?.createdAt,
    updatedAt: blog?.updatedAt,
  };

  useEffect(() => {
    setContent(blog?.content);
  }, []);

  const { handleSubmit, control, setValue, formState } = formMethods;

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
    setValue("content", newContent);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const imageHandler = useCallback(() => {
    if (!isClient) return; // Prevent execution on server-side

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        try {
          const url = await handleUpload(file, "files/");
          console.log(url);

          const quill = reactQuillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection();
            if (range) {
              quill.insertEmbed(range.index, "image", url);
            }
          }
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    };
  }, [isClient]);

  const handleSubmitForm = async () => {
    const turndownService = new TurndownService();
    const markdownContent = turndownService.turndown(content);

    const formDataPayload = new FormData();

    // Append author object properties as JSON
    formDataPayload.append(
      "author",
      JSON.stringify({
        authorId: user._id,
        imgUrl: user.imgUrl,
        username: user.username,
      }),
    );

    if (blog?._id) {
      formDataPayload.append("_id", blog._id.toString());
    }

    formDataPayload.append("content", markdownContent);
    formDataPayload.append("isPublished", "true");
    formDataPayload.append("title", formMethods.getValues("blogTitle"));
    formDataPayload.append("description", formMethods.getValues("description"));
    formDataPayload.append(
      "tags",
      JSON.stringify(formMethods.getValues("tags")),
    );

    if (imageFile) {
      formDataPayload.append("previewImage", imageFile);
    }

    try {
      await updateBlogAction(formDataPayload);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const formFields: IFormField[] = [
    {
      name: "blogTitle",
      id: "blogTitle",
      placeholder: "Enter blog title",
      label: "Title",
    },
    {
      name: "description",
      id: "description",
      placeholder: "Enter blog description",
      label: "Description",
    },
    {
      name: "previewImage",
      id: "previewImage",
      placeholder: "Enter preview image",
      label: "Preview Image",
      type: "file",
      onChange: handleImageChange,
    },
  ];

  return (
    <>
      {" "}
      <FormProvider {...formMethods}>
        <form action={handleSubmitForm} className="w-full space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {formFields.map((field) => (
              <InputFormField
                key={field.id}
                control={control}
                name={field.name}
                id={field.id}
                onChange={field.onChange}
                placeholder={field.placeholder}
                label={field.label}
                errors={formState.errors}
                type={field.type}
              />
            ))}

            <div className="space-y-1.5">
              <FormLabel>Tags</FormLabel>
              <TagInput control={control} />
              <FormMessage>{formState.errors.tags?.message}</FormMessage>
            </div>
          </div>

          <div className="space-y-1.5">
            <FormLabel>Content</FormLabel>
            {isClient && (
              <QuillEditorComponent
                forwardedRef={reactQuillRef}
                imageHandler={imageHandler}
                value={content}
                onChange={handleEditorChange}
                placeholder="Write your blog content here..."
              />
            )}
            <FormMessage>{formState.errors.content?.message}</FormMessage>
          </div>

          <div className="space-x-3">
            <Button type="submit">Update Blog</Button>
            <Button type="button" variant="outline" className="bg-transparent">
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>
      <RenderBlog data={blogData} />
    </>
  );
}
