"use client";
import DashboardContainer from "@/components/DashboardContainer";
import DashboardContent from "@/components/DashboardContent";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardTitle from "@/components/DashboardTitle";
import { type ReactElement } from "react";
import { Form } from "@/components/ui/form";
import useAddUser from "@/hooks/useAddUser";
import InputFormField from "@/components/InputFormField";
import { addUserAction } from "@/actions/addUserAction";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import SelectFormField, { Option } from "@/components/SelectFormField";

export interface pageProps {}

export default function AddNewUser(props: pageProps): ReactElement {
  const {
    form,
    handleUpload,
    handleImageChange,
    formData,
    imageSrc,
    onSubmit,
    setImageSrc,
    imageFile,
    setIsLoading,
    isLoading,
    handleCancel,
  } = useAddUser();
  const { email, password, username, profileImage, role } = formData;

  const formFields = [
    {
      name: "profileImage",
      id: "productImage",
      placeholder: "Enter profile image",
      label: "Profile image",
      type: "file",
      onChange: handleImageChange,
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

  return (
    <DashboardContainer className="max-w-[700px] mx-auto">
      <DashboardHeader>
        <DashboardTitle>Add New User</DashboardTitle>
      </DashboardHeader>
      <DashboardContent className="bg-background p-6 rounded-lg">
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

                const response = await addUserAction(formData);

                console.log(response.message);
              } catch (error) {
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
                  onChange={field.onChange}
                  imageSrc={imageSrc as string}
                />
              )
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
      </DashboardContent>
    </DashboardContainer>
  );
}
