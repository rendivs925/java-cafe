"use client";
import { useState, type ReactElement } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import useAppContext from "@/hooks/useAppContext";

export interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalItems: number;
  totalProductsLength: number;
}

export default function PaginationControls({
  hasNextPage,
  hasPrevPage,
  totalItems,
  totalProductsLength,
}: PaginationControlsProps): ReactElement {
  const { moveRoute } = useAppContext();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "1";

  return (
    <Pagination className="justify-end mx-0 overflow-hidden w-full">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              hasPrevPage &&
                moveRoute(
                  `/admin/products/?page=${
                    Number(page) - 1
                  }&per_page=${per_page}`
                );
            }}
            className="hover:bg-transparent cursor-pointer"
          />
        </PaginationItem>
        <PaginationItem>
          {page} / {Math.ceil(totalProductsLength / Number(per_page))}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className="hover:bg-transparent cursor-pointer"
            onClick={() => {
              hasNextPage &&
                moveRoute(
                  `/admin/products/?page=${
                    Number(page) + 1
                  }&per_page=${per_page}`
                );
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
