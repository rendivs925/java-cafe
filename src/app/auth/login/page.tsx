import FormContainer from "@/components/FormContainer";
import { type ReactElement } from "react";

export interface pageProps {}

export default function page(props: pageProps): ReactElement {
  return (
    <FormContainer className="absolute inset-0">
      <h1>Login</h1>
    </FormContainer>
  );
}
