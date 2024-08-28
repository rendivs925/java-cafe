import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useController } from "react-hook-form";

// Define the type for the props
interface TagInputProps {
  control: any; // Control from react-hook-form
}

const TagInput: React.FC<TagInputProps> = ({ control }) => {
  const { field } = useController({
    name: "tags",
    control,
    defaultValue: [],
  });

  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedValue = inputValue.trim();

      if (trimmedValue && !field.value.includes(trimmedValue)) {
        field.onChange([...field.value, trimmedValue]);
      }
      setInputValue("");
    }

    // Handle backspace to remove last tag
    if (e.key === "Backspace" && !inputValue) {
      field.onChange(field.value.slice(0, field.value.length - 1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    field.onChange(
      field.value.filter((_: unknown, index: number) => index !== indexToRemove)
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border rounded-md px-3 py-2 bg-background border-input ring-offset-background outline-none placeholder:text-muted-foreground file:text-sm file:font-medium file:border-0 min-h-10 focus-visible:ring-offset-2 text-sm file:bg-transparent focus-within:border-primary focus-within:ring-2 ring-primary">
      {field.value.map((tag: string, index: number) => (
        <Badge
          key={index}
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1 text-muted-foreground"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="text-muted-foreground hover:text-primary"
          >
            <X size={16} />
          </button>
        </Badge>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter a tag and press Enter"
        className="flex-grow text-sm placeholder:text-muted-foreground min-w-[100px] border-none outline-none focus:ring-0"
      />
    </div>
  );
};

export default TagInput;
