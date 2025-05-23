"use client";
import { Form } from "@/components/ui/form";
import { IUser } from "@/actions/getUsersAction";
import InputFormField from "@/components/InputFormField";
import SelectFormField from "@/components/SelectFormField";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import useAddUser from "@/hooks/useAddUser";
import { editUserAction } from "@/actions/editUserAction";
import { Option } from "@/components/PengirimanForm";
import { extractFieldNames } from "@/lib/extractFieldNames";
import { handleResponse, Response } from "@/lib/handleResponse";
import { handleError } from "@/lib/handleError";

const formFields = [
  {
    name: "profileImage",
    id: "productImage",
    placeholder: "Enter profile image",
    label: "Profile image",
    type: "file",
  },
  {
    name: "username",
    id: "username",
    placeholder: "Rendi Virgantara Setiawan",
    label: "Username",
  },
  {
    name: "email",
    id: "email",
    placeholder: "example@gmail.com",
    label: "Email",
  },
  {
    name: "role",
    id: "role",
    placeholder: "Enter user role",
    label: "Role",
    options: [
      { value: "user", label: "user" },
      { value: "admin", label: "admin" },
    ],
  },
  {
    name: "password",
    id: "password",
    placeholder: "Masukkan password anda",
    label: "Password",
    type: "password",
  },
];

export default function EditUserForm({ user }: { user: IUser }) {
  const {
    form,
    handleImageChange,
    formData,
    imageFile,
    setIsLoading,
    isLoading,
    handleCancel,
  } = useAddUser();

  const { email, password, username, role } = formData;

  return (
    <Form {...form}>
      <form
        action={async () => {
          try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("profileImage", imageFile as File);
            formData.append("username", username);
            formData.append("email", email);
            formData.append("role", role);
            formData.append("password", password);

            const response = await editUserAction(
              user._id.toString() as string,
              formData,
            );

            const fieldNames = extractFieldNames(formFields);
            handleResponse(response as Response, form, fieldNames);
          } catch (error) {
            handleError("Error adding user.");
          } finally {
            setIsLoading(false);
          }
        }}
        className="space-y-5"
      >
        {formFields.map((field) =>
          field.name === "role" ? (
            <SelectFormField
              key={field.id + field.name}
              label={field.label}
              name={field.name}
              control={form.control}
              options={field.options as Option[]}
            />
          ) : (
            <InputFormField
              key={field.id + field.name}
              control={form.control}
              name={field.name}
              id={field.id}
              placeholder={field.placeholder}
              label={field.label}
              errors={form.formState.errors}
              type={field.type}
              onChange={
                field.name === "profileImage" ? handleImageChange : undefined
              }
            />
          ),
        )}
        <div className="flex gap-6">
          {isLoading ? (
            <>
              <Button
                type="button"
                size="default"
                variant="outline"
                className="w-full"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <LoadingButton>Menambahkan...</LoadingButton>
            </>
          ) : (
            <>
              <Button
                type="button"
                size="default"
                variant="outline"
                className="w-full"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button type="submit" size="default" className="w-full">
                Add User
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
