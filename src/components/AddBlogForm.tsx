"use client";
import { handleError } from "@/lib/handleError";
import { useCallback, useRef, useState, useEffect } from "react";
import RenderBlog from "@/components/RenderBlog";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import TurndownService from "turndown";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { FormLabel, FormMessage } from "@/components/ui/form";
import TagInput from "@/components/TagInput";
import { IBlog } from "@/models/Blog";
import InputFormField from "@/components/InputFormField";
import { FormField as IFormField } from "@/components/AddProductForm";
import { createBlogAction } from "@/actions/createBlogAction";
import { handleUpload } from "@/lib/storage";
import ReactQuill from "react-quill";
import useAppContext from "@/hooks/useAppContext";
import { BlogFormSchema } from "@/schemas/BlogFormSchema";
import { handleResponse, Response } from "@/lib/handleResponse";
import { extractFieldNames } from "@/lib/extractFieldNames";

const QuillEditorComponent = dynamic(
  () => import("@/components/QuillEditorComponent"),
  { ssr: false },
);

const AddBlogForm = () => {
  const [content, setContent] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const { user, pushRoute } = useAppContext();
  const reactQuillRef = useRef<ReactQuill>(null);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [isPublished, setIsPublished] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const formMethods = useForm<z.infer<typeof BlogFormSchema>>({
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      blogTitle: "",
      content: "",
      tags: [],
      description: "",
    },
  });

  const formData = formMethods.watch();

  const { control, setValue, formState } = formMethods;

  const blogData: IBlog = {
    _id: "",
    title: formData?.blogTitle,
    content: formData?.content,
    tags: formData?.tags,
    description: formData?.description,
    author: {
      authorId: user?._id,
      username: user?.username,
      imgUrl: user?.imgUrl,
    },
    isPublished,
    prevImgUrl: imageSrc as string,
    createdAt: new Date(),
    updatedAt: new Date(),
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);

    setValue("content", newContent);
  };

  const imageHandler = useCallback(() => {
    if (!isClient) return;

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

    formDataPayload.append(
      "author",
      JSON.stringify({
        authorId: user._id,
        imgUrl: user.imgUrl,
        username: user.username,
      }),
    );

    formDataPayload.append("content", markdownContent);
    formDataPayload.append("isPublished", String(isPublished));
    formDataPayload.append("title", formData.blogTitle);
    formDataPayload.append("description", formData.description);

    formDataPayload.append("tags", JSON.stringify(formData.tags));

    if (formData.previewImage) {
      formDataPayload.append("previewImage", formData.previewImage);
    }

    try {
      const response = await createBlogAction(formDataPayload);

      const fieldNames = extractFieldNames(formFields);

      handleResponse(response as Response, formMethods, fieldNames);
    } catch (error) {
      handleError("Error creating blog.");
    }
  };

  return (
    <>
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
            <Button type="submit" onClick={() => setIsPublished(true)}>
              Publish now
            </Button>
            <Button
              type="submit"
              onClick={() => setIsPublished(false)}
              variant="outline"
              className="bg-transparent"
            >
              Save draft
            </Button>
            <Button
              onClick={() => pushRoute("/admin/blogs")}
              type="button"
              variant="secondary"
              className="bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>
      {blogData &&
        blogData?.title &&
        blogData?.prevImgUrl &&
        blogData?.content !== "" &&
        blogData?.tags.length !== 0 && <RenderBlog data={blogData} />}
    </>
  );
};

export default AddBlogForm;
