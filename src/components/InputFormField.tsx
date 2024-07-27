"use client";

import { type ReactElement, memo } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";

interface InputFormFieldProps {
  control: any;
  name: string;
  id: string;
  placeholder: string;
  label: string;
  errors: any;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
}: InputFormFieldProps): ReactElement {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <Label htmlFor={id}>{label}</Label>
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
                  accept="image/*"
                  onChange={(event) => {
                    field.onChange(event.target.files);
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
