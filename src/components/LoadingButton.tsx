import { Loader2 } from "lucide-react";
import { ReactNode, type ReactElement } from "react";
import { Button, ButtonProps } from "./ui/button";

export interface LoadingButtonProps extends ButtonProps {
  children: ReactNode;
  className?: string;
}

export default function LoadingButton({
  children,
  className,
}: LoadingButtonProps): ReactElement {
  return (
    <Button
      type="submit"
      size="default"
      disabled
      className={`w-full cursor-progress ${className}`}
    >
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {children}
    </Button>
  );
}
