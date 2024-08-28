import { getBlogByIdAction } from "@/actions/getBlogByIdAction";
import BaseContainer from "@/components/BaseContainer";
import BaseContent from "@/components/BaseContent";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism"; // or another theme

export default async function Page({ params }: { params: { blogId: string } }) {
  const { blogId } = params;
  const response = await getBlogByIdAction(blogId);
  const data = response.data;

  if (!data) {
    return <div>Error: Blog not found.</div>;
  }

  return (
    <BaseContainer>
      <BaseContent className="max-w-[80ch] mx-auto">
        <h1 className="mb-10">{data.title}</h1>
        <div className="flex gap-3 items-center">
          <Avatar className="size-11 rounded-full overflow-hidden cursor-pointer">
            <AvatarImage src={data.author.imgUrl} className="object-cover" />
          </Avatar>
          <span>
            <p className="mt-0 font-medium text-primary">
              {data.author.username}
            </p>
            <p className="mt-0 text-sm">{data.createdAt?.toLocaleString()}</p>
          </span>
        </div>
        <div className="relative my-10 w-full overflow-hidden">
          <Image
            src={data.prevImgUrl}
            alt={data.title}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            objectFit="contain"
          />
        </div>
        <ReactMarkdown
          className="prose max-w-[80ch]"
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={dracula} // Apply your preferred color scheme here
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {data.content}
        </ReactMarkdown>
        <div className="mt-12 flex gap-4">
          {data.tags.map((tag) => (
            <Badge
              key={tag}
              variant="default"
              className="bg-background px-3 py-1 font-normal text-muted-foreground text-lg hover:bg-background/85"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </BaseContent>
    </BaseContainer>
  );
}
