import { type ReactElement } from "react";

export interface FooterProps {}

export default function Footer(props: FooterProps): ReactElement {
  return (
    <footer className="py-3xl">
      <p className="container text-center me-auto ms-auto font-bold text-bodyBlur">
        © Copyright 2024. By Rendi Virgantara Setiawan
      </p>
    </footer>
  );
}
