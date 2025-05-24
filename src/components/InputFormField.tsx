"use client";

import { type ReactElement, memo, ChangeEvent } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { TbPhotoCirclePlus } from "react-icons/tb";
import { FieldValues, Control } from "react-hook-form";

interface InputFormFieldProps {
  control: Control<FieldValues>;
  name: string;
  id: string;
  placeholder?: string;
  label: string;
  errors: Record<string, { message?: string }>;
  type?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
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
  const renderFileInput = (field: any) => (
    <div className="space-y-1.5 w-full">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <FormControl>
        <Input
          id={id}
          type="file"
          accept="image/*"
          onChange={(event) => {
            field.onChange(event.target.files?.[0]);
            onChange?.(event);
          }}
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
        />
      </FormControl>
    </div>
  );

  const renderStandardInput = (field: any) => (
    <div className="space-y-1.5">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <FormControl>
        <Input
          id={id}
          placeholder={placeholder}
          type={type}
          {...field}
          value={field.value ?? ""}
        />
      </FormControl>
    </div>
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full space-y-1">
          {type === "file"
            ? renderFileInput(field)
            : renderStandardInput(field)}
          <FormMessage className="empty:hidden mt-1 text-sm text-destructive">
            {errors?.[name]?.message as string}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};

export default memo(InputFormField);
