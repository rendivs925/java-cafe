"use client";

import { handleError } from "@/lib/handleError";
import { useCallback, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import TurndownService from "turndown";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { FormLabel, FormMessage } from "@/components/ui/form";
import TagInput from "@/components/TagInput";
import InputFormField from "@/components/InputFormField";
import { FormField as IFormField } from "@/components/AddProductForm";
import { createBlogAction } from "@/actions/createBlogAction";
import { handleUpload } from "@/lib/storage";
import useAppContext from "@/hooks/useAppContext";
import { BlogFormSchema } from "@/schemas/BlogFormSchema";
import { handleResponse, Response } from "@/lib/handleResponse";
import { extractFieldNames } from "@/lib/extractFieldNames";

const QuillEditorComponent = dynamic(
  () => import("@/components/QuillEditorComponent"),
  { ssr: false },
);

const AddBlogForm = () => {
  const [content, setContent] = useState("");
  const [isClient, setIsClient] = useState(false);
  const { user, pushRoute } = useAppContext();
  const reactQuillRef = useRef<any>(null);
  const [isPublished, setIsPublished] = useState(false);

  const formMethods = useForm<z.infer<typeof BlogFormSchema>>({
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      blogTitle: "",
      content: "",
      tags: [],
      description: "",
      previewImage: undefined,
    },
  });

  const { control, setValue, watch, formState } = formMethods;
  const formData = watch();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("previewImage", file, { shouldValidate: true });
    }
  };

  const formFields: IFormField[] = [
    {
      name: "blogTitle",
      id: "blogTitle",
      placeholder: "Enter blog title",
      label: "Title",
      type: "text",
    },
    {
      name: "description",
      id: "description",
      placeholder: "Enter blog description",
      label: "Description",
      type: "text",
    },
    {
      name: "previewImage",
      id: "previewImage",
      placeholder: "Select preview image",
      label: "Preview Image",
      type: "file",
      onChange: handleImageChange,
    },
  ];

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
    setValue("content", newContent, { shouldValidate: true });
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
          const quill = reactQuillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection();
            if (range) quill.insertEmbed(range.index, "image", url);
          }
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    };
  }, [isClient]);

  const handleSubmitForm = async (data: z.infer<typeof BlogFormSchema>) => {
    try {
      const turndownService = new TurndownService();
      const markdownContent = turndownService.turndown(data.content);

      console.log(
        "Image file attached?",
        data.previewImage instanceof File ? "Yes" : "No",
      );
      console.log("Image file object:", data.previewImage);

      const formDataPayload = new FormData();
      formDataPayload.append(
        "author",
        JSON.stringify({
          authorId: user?._id?.toString() ?? "",
          imgUrl: user?.imgUrl ?? "",
          username: user?.username ?? "",
        }),
      );
      formDataPayload.append("content", markdownContent);
      formDataPayload.append("isPublished", String(isPublished));
      formDataPayload.append("title", data.blogTitle);
      formDataPayload.append("description", data.description);
      formDataPayload.append("tags", JSON.stringify(data.tags));

      if (data.previewImage && data.previewImage instanceof File) {
        formDataPayload.append("previewImage", data.previewImage);
      }

      const response = await createBlogAction(formDataPayload);
      const fieldNames = extractFieldNames(formFields);
      handleResponse(response as Response, formMethods, fieldNames);
    } catch {
      handleError("Error creating blog.");
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(handleSubmitForm)}
        className="w-full space-y-6"
        noValidate
      >
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
          <Button
            type="submit"
            onClick={() => setIsPublished(true)}
            aria-label="Publish now"
          >
            Publish now
          </Button>
          <Button
            type="submit"
            onClick={() => setIsPublished(false)}
            variant="outline"
            className="bg-transparent"
            aria-label="Save draft"
          >
            Save draft
          </Button>
          <Button
            type="button"
            onClick={() => pushRoute("/admin/blogs")}
            variant="secondary"
            className="bg-transparent"
            aria-label="Cancel"
          >
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddBlogForm;
