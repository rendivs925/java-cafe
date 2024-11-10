import { type ReactElement } from "react";
import { User as UserType } from "@/types";
import { CreditCard, LogOut } from "lucide-react";

import { Avatar, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAppContext from "@/hooks/useAppContext";

export interface AvatarMenuProps {
  user: UserType;
}

export default function AvatarMenu({ user }: AvatarMenuProps): ReactElement {
  const { pushRoute, handleLogout } = useAppContext();

  // A helper to render menu items, improves readability for conditional rendering.
  const renderMenuItem = (
    onClick: () => void,
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
    label: string
  ) => (
    <DropdownMenuItem onClick={onClick}>
      <Icon className="mr-2 h-4 w-4" />
      <span>{label}</span>
    </DropdownMenuItem>
  );

  return (
    <div className="empty:hidden text-sm bg-secondary text-secondary-foreground rounded-full flex items-center justify-center size-9">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer size-full">
            <AvatarImage src={user.imgUrl} alt="User Avatar" />
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {user.role !== "admin" && renderMenuItem(
              () => pushRoute("/account/orders"),
              CreditCard,
              "Orders"
            )}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          {renderMenuItem(handleLogout, LogOut, "Log out")}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
