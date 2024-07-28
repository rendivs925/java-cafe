import { type ReactElement } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface PaginationControlsProps {}

export default function PaginationControls(
  props: PaginationControlsProps
): ReactElement {
  return (
    <Pagination className="justify-end overflow-hidden">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="hover:bg-transparent" href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="hover:after:w-0" href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="hover:bg-transparent" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
