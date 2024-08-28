"use client";
import {
  useCallback,
  useRef,
  useState,
  useEffect,
  type ReactElement,
} from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import DashboardContainer from "@/components/DashboardContainer";
import DashboardContent from "@/components/DashboardContent";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardTitle from "@/components/DashboardTitle";
import { Button } from "@/components/ui/button";
import TurndownService from "turndown"; // Import TurndownService
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

// Import ReactQuill dynamically with no server-side rendering
const QuillEditorComponent = dynamic(
  () => import("@/components/QuillEditorComponent"),
  { ssr: false }
);

const FormSchema = z.object({
  blogTitle: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  author: z.string().min(2, {
    message: "Author name must be at least 2 characters.",
  }),
  content: z.string().min(1, {
    message: "Content cannot be empty.",
  }),
  tags: z
    .array(z.string())
    .nonempty({ message: "At least one tag is required." }),
});

export interface AddBlogPageProps {}

const formFields: IFormField[] = [
  {
    name: "blogTitle",
    id: "blogTitle",
    placeholder: "Enter blog title",
    label: "Title",
  },
  {
    name: "author",
    id: "author",
    placeholder: "Enter author name",
    label: "Author",
  },
];

export default function AddBlogPage(props: AddBlogPageProps): ReactElement {
  const [content, setContent] = useState<string>("");
  const [isClient, setIsClient] = useState(false); // State to check if client-side
  const reactQuillRef = useRef<ReactQuill>(null);
  const formMethods = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      blogTitle: "",
      author: "",
      content: "",
      tags: [],
    },
  });

  const { handleSubmit, control, setValue, formState } = formMethods;

  useEffect(() => {
    setIsClient(true); // Update state to indicate client-side rendering
  }, []);

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
    setValue("content", newContent);
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

  const handleSubmitForm = async (data: z.infer<typeof FormSchema>) => {
    // Convert content to Markdown
    const turndownService = new TurndownService();
    const markdownContent = turndownService.turndown(content);

    const payload: IBlog = {
      author: data.author,
      isPublished: true,
      title: data.blogTitle,
      tags: data.tags,
      content: markdownContent,
    };

    // Log all values
    console.log("Form submitted with values:", payload);

    try {
      await createBlogAction(payload);
      // Handle successful submission (e.g., show a success message)
    } catch (error) {
      console.error("Error creating blog:", error);
      // Handle errors (e.g., show an error message)
    }
  };

  return (
    <DashboardContainer>
      <DashboardHeader className="max-w-[80ch] mx-auto">
        <DashboardTitle>Add New Blog</DashboardTitle>
      </DashboardHeader>
      <DashboardContent className="space-y-12 bg-transparent min-h-96 max-w-[80ch] mx-auto">
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="w-full space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              {formFields.map((field) => (
                <InputFormField
                  key={field.id}
                  control={control}
                  name={field.name}
                  id={field.id}
                  placeholder={field.placeholder}
                  label={field.label}
                  errors={formState.errors}
                  type="text"
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
              <Button type="submit">Publish now</Button>
              <Button
                type="button"
                variant="outline"
                className="bg-transparent"
              >
                Save draft
              </Button>
            </div>
          </form>
        </FormProvider>
        {content}
      </DashboardContent>
    </DashboardContainer>
  );
}
