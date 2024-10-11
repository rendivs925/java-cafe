import { toast } from "@/hooks/use-toast";

type Status = "success" | "error";

export interface ErrorDetail {
  path: string[];
  message: string;
}

export interface Response {
  status: Status;
  message: string;
  errors?: ErrorDetail[];
}

export const handleFormErrors = <T>(
  response: Response,
  formMethods: any,
  fields: T[],
) => {
  if (response.status === "error" && "errors" in response && response.errors) {
    response.errors.forEach((error: ErrorDetail) => {
      if (fields.includes(error.path[0] as T)) {
        formMethods.setError(error.path[0] as T, {
          type: "manual",
          message: error.message,
        });
      }
    });
  }
};

export const handleResponse = (
  response: Response,
  formMethods: any,
  formFields: string[],
) => {
  if (response.status === "error") {
    const errorMessage = response.message || "An error occurred";

    if (response.errors) {
      handleFormErrors(response, formMethods, formFields);
    }

    toast({ description: errorMessage, variant: "destructive" });
    return;
  }

  toast({ description: response.message, variant: "default" });
};
