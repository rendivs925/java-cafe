import { User as UserType } from "@/types";
import { Avatar, AvatarImage } from "./ui/avatar";
import { type ReactElement } from "react";
import { CreditCard, LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAppContext from "@/hooks/useAppContext";

export interface AvatarMenuProps {
  user: UserType;
}

export default function AvatarMenu({ user }: AvatarMenuProps): ReactElement {
  const { pushRoute, handleLogout } = useAppContext();

  return (
    <div className="empty:hidden text-sm bg-secondary text-secondary-foreground rounded-full leading-0 flex items-center justify-center size-9">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-full cursor-pointer">
            <AvatarImage src={user.imgUrl} />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {/* <DropdownMenuItem> */}
            {/*   <User className="mr-2 h-4 w-4" /> */}
            {/*   <span>Profile</span> */}
            {/*   <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
            {/* </DropdownMenuItem> */}
            { user.role !== "admin" && <DropdownMenuItem onClick={() => pushRoute("/account/orders")}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Orders</span>
              {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
            </DropdownMenuItem> }
            {/* <DropdownMenuItem> */}
            {/*   <Settings className="mr-2 h-4 w-4" /> */}
            {/*   <span>Settings</span> */}
            {/*   <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
            {/* </DropdownMenuItem> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
