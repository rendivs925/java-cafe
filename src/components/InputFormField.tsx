"use client";

import { type ReactElement, memo } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";
import { TbPhotoCirclePlus } from "react-icons/tb";

interface InputFormFieldProps {
  control: any;
  name: string;
  id: string;
  placeholder: string;
  label: string;
  errors: any;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imageSrc?: string;
}

const InputFormField = ({
  control,
  name,
  id,
  placeholder,
  label,
  errors,
  type = "text",
  onChange,
  imageSrc,
}: InputFormFieldProps): ReactElement => {

  // Render input or textarea based on field type
  const renderInputField = (field: any) => {
    return field.name === "description" ? (
      <Textarea
        key={id + name}
        id={id}
        placeholder={placeholder}
        className="resize-none h-[200px]"
        {...field}
        maxLength={95}
      />
    ) : (
      <Input key={id + name} id={id} placeholder={placeholder} type={type} {...field} />
    );
  };

  // Render profile image input
  const renderProfileImageInput = () => {
    return (
      <Label
        htmlFor={id}
        className="flex cursor-pointer items-center justify-center mx-auto size-36 shadow rounded-full bg-secondary"
      >
        {!imageSrc ? (
          <TbPhotoCirclePlus className="size-full p-6 text-secondary-foreground" />
        ) : (
          <Avatar className="size-full">
            <AvatarImage src={imageSrc} />
          </Avatar>
        )}
      </Label>
    );
  };

  return (
    <FormField control={control} name={name} render={({ field }) => {
      // If it's a profile image, render the image input and return early
      if (field.name === "profileImage") {
        return (
          <FormItem className="col-span-2">
            {renderProfileImageInput()}
            <FormControl>
              <Input
                key={id + name}
                id={id}
                placeholder={placeholder}
                type={type}
                className="opacity-0 size-0 absolute"
                accept="image/*"
                onChange={(event) => {
                  field.onChange(event?.target?.files ? event.target.files[0] : null);
                  onChange && onChange(event);
                }}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
            </FormControl>
          </FormItem>
        );
      }

      // Otherwise, render the normal input or textarea
      return (
        <FormItem>
          <Label htmlFor={id}>{label}</Label>
          <FormControl>
            {renderInputField(field)}
          </FormControl>
          <FormMessage className="empty:hidden mt-0">
            {errors[name]?.message}
          </FormMessage>
        </FormItem>
      );
    }} />
  );
};

export default memo(InputFormField);
