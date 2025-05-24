import AddUserButton from "@/components/AddUserButton";
import DashboardContainer from "@/components/DashboardContainer";
import DashboardContent from "@/components/DashboardContent";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardTitle from "@/components/DashboardTitle";
import SelectShowing from "@/components/SelectShowing";
import UsersTable from "@/components/UsersTable";
import { Suspense, type ReactElement } from "react";

export default async function Users(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
): Promise<ReactElement> {
  const searchParams = await props.searchParams;
  return (
    <Suspense>
      <DashboardContainer>
        <DashboardHeader className="flex justify-between">
          <DashboardTitle>Users</DashboardTitle>
          <div className="flex gap-6">
            <SelectShowing />
            <AddUserButton />
          </div>
        </DashboardHeader>
        <DashboardContent className="bg-background shadow p-6 rounded-lg">
          <UsersTable searchParams={searchParams} />
        </DashboardContent>
      </DashboardContainer>
    </Suspense>
  );
}
