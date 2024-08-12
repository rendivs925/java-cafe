import React, { forwardRef } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";

export interface Option {
  value: string;
  label: string;
}

interface SelectFormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  options: Option[];
}

const SelectFormField = forwardRef<HTMLSelectElement, SelectFormFieldProps>(
  ({ control, name, label, options }, ref) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <FormItem className="bg-background box-border px-0 w-full">
              <FormLabel>{label}</FormLabel>
              <Select
                {...field}
                defaultValue={field.value}
                onValueChange={field.onChange}
              >
                <FormControl className="bg-background">
                  <SelectTrigger>
                    <SelectValue placeholder={`Pilih ${label.toLowerCase()}`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem
                      key={option.value} // Use unique value as key
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    );
  }
);

SelectFormField.displayName = "SelectFormField";

export default SelectFormField;
