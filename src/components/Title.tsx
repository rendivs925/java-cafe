import { type ReactElement } from "react";

export interface TitleProps {
  title: string;
  description: string;
}

export default function Title({
  description,
  title,
}: TitleProps): ReactElement {
  return (
    <div className="mb-14">
      <h2 className="text-center">{title}</h2>
      <p className="text-center me-auto ms-auto max-w-[50ch]">{description}</p>
    </div>
  );
}
