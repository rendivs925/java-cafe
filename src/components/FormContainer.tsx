import React, { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
  className?: string;
}

const FormContainer = ({ children, className = "" }: FormContainerProps) => {
  return (
    <section className={`bg-background p-8 rounded-lg ${className}`}>
      {children}
    </section>
  );
};

export default FormContainer;
