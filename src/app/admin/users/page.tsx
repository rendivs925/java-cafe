import AddUserButton from "@/components/AddUserButton";
import DashboardContainer from "@/components/DashboardContainer";
import DashboardContent from "@/components/DashboardContent";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardTitle from "@/components/DashboardTitle";
import SelectShowing from "@/components/SelectShowing";
import UsersTable from "@/components/UsersTable";
import { type ReactElement } from "react";

export default function Users({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): ReactElement {
  return (
    <DashboardContainer>
      <DashboardHeader className="flex justify-between">
        <DashboardTitle>Users</DashboardTitle>
        <div className="flex gap-6">
          <SelectShowing />
          <AddUserButton />
        </div>
      </DashboardHeader>
      <DashboardContent className="bg-background p-6 rounded-lg">
        <UsersTable searchParams={searchParams} />
      </DashboardContent>
    </DashboardContainer>
  );
}
