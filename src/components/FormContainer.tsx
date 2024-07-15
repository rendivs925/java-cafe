import React, { ReactNode } from "react";
import { Card } from "./ui/card";

interface FormContainerProps {
  children: ReactNode;
  className?: string;
}

const FormContainer = ({ children, className = "" }: FormContainerProps) => {
  return (
    <Card className={`bg-background rounded-lg shadow ${className}`}>
      {children}
    </Card>
  );
};

export default FormContainer;
