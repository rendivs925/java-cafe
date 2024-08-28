"use client";

import { type ReactElement, memo } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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

function InputFormField({
  control,
  name,
  id,
  placeholder,
  label,
  errors,
  type = "text",
  onChange,
  imageSrc,
}: InputFormFieldProps): ReactElement {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const isProfileImage = field.name === "profileImage";

        return (
          <FormItem className={`${field.name === "blogTitle" && "col-span-2"}`}>
            {!isProfileImage ? (
              <Label htmlFor={id}>{label}</Label>
            ) : (
              <Label
                htmlFor={id}
                className="flex cursor-pointer items-center justify-center mx-auto size-36 shadow rounded-full bg-secondary"
              >
                {!imageSrc ? (
                  <TbPhotoCirclePlus className="size-full p-6 text-secondary-foreground" />
                ) : (
                  <>
                    <Avatar className="size-full">
                      <AvatarImage src={imageSrc} />
                    </Avatar>
                  </>
                )}
              </Label>
            )}
            <FormControl>
              {!onChange ? (
                <>
                  {field.name === "description" ? (
                    <Textarea
                      key={id + name}
                      id={id}
                      placeholder={placeholder}
                      className="resize-none h-[200px]"
                      {...field}
                      maxLength={95}
                    />
                  ) : (
                    <Input
                      key={id + name}
                      id={id}
                      placeholder={placeholder}
                      type={type}
                      {...field}
                    />
                  )}
                </>
              ) : (
                <Input
                  key={id + name}
                  id={id}
                  placeholder={placeholder}
                  type={type}
                  className={isProfileImage ? "opacity-0 size-0 absolute" : ""}
                  accept="image/*"
                  onChange={(event) => {
                    field.onChange(
                      event?.target?.files && event.target.files[0]
                    );

                    onChange(event);
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              )}
            </FormControl>
            <FormMessage className="empty:hidden mt-0">
              {errors[name]?.message}
            </FormMessage>
          </FormItem>
        );
      }}
    />
  );
}

export default memo(InputFormField);
