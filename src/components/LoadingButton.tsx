import { Loader2 } from "lucide-react";
import { ReactNode, type ReactElement } from "react";
import { Button } from "./ui/button";

export interface LoadingButtonProps {
  children: ReactNode;
}

export default function LoadingButton({
  children,
}: LoadingButtonProps): ReactElement {
  return (
    <Button type="submit" size="default" className="w-full cursor-progress">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {children}
    </Button>
  );
}
