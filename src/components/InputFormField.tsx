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

interface InputFormFieldProps {
  control: any;
  name: string;
  id: string;
  placeholder: string;
  label: string;
  errors: any;
  type?: string;
}

function InputFormField({
  control,
  name,
  id,
  placeholder,
  label,
  errors,
  type = "text",
}: InputFormFieldProps): ReactElement {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Label htmlFor={id}>{label}</Label>
          <FormControl>
            <Input id={id} placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormMessage className="empty:hidden mt-0">
            {errors[name]?.message}
          </FormMessage>
        </FormItem>
      )}
    />
  );
}

export default memo(InputFormField);
