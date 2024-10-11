interface IFormField {
  name: string;
}

export const extractFieldNames = (formFields: IFormField[]): string[] => {
  return formFields.map((field) => field.name);
};
