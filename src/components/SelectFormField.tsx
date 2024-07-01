import React from "react";
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
import { Control } from "react-hook-form"; // Adjust the import according to your form library

interface Option {
  value: string;
  label: string;
}

interface SelectFormFieldProps {
  control: Control<any>; 
  name: string;
  label: string;
  options: Option[];
}

const SelectFormField: React.FC<SelectFormFieldProps> = ({ control, name, label, options }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="bg-secondary w-full">
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl className="bg-secondary">
              <SelectTrigger>
                <SelectValue placeholder={`Pilih ${label.toLowerCase()}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectFormField;
