import { type ReactElement } from "react";

export interface TitleProps {
  title: string;
  description?: string;
  position?: "left" | "right" | "center";
}

export default function Title({
  description,
  title,
  position = "center",
}: TitleProps): ReactElement {
  return (
    <div className="mb-14">
      <h2 className={`text-${position}`}>{title}</h2>
      <p className={`text-${position} me-auto ms-auto max-w-[50ch]`}>
        {description}
      </p>
    </div>
  );
}
