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
import { Option } from "./PengirimanForm";

interface SelectFormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  options: Option[];
}

const SelectFormField = forwardRef<HTMLSelectElement, SelectFormFieldProps>(
  ({ control, name, label, options }, ref) => {
    const isLayanan = name === "layanan";
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <FormItem className="bg-transparent box-border px-0 w-full">
              <FormLabel>{label}</FormLabel>
              <Select
                {...field}
                // @ts-ignore
                ref={ref} // Ignore the type error for ref prop
                defaultValue={JSON.stringify(field.value)}
                onValueChange={field.onChange}
              >
                <FormControl className="bg-secondary">
                  <SelectTrigger>
                    <SelectValue
                      placeholder={`Pilih ${
                        isLayanan ? "layanan" : label.toLowerCase()
                      }`}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((option) => {
                    return (
                      <SelectItem
                        key={`${option.value}`} 
                        value={`${option.value}`}
                      >
                        {option.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    );
  },
);

SelectFormField.displayName = "SelectFormField";

export default SelectFormField;
