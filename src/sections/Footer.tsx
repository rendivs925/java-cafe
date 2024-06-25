import { type ReactElement } from "react";

export interface FooterProps {}

export default function Footer(props: FooterProps): ReactElement {
  return (
    <footer className="py-12">
      <p className="container text-center me-auto ms-auto font-medium text-muted-foreground">
        © Copyright 2024. By Rendi Virgantara Setiawan
      </p>
    </footer>
  );
}
