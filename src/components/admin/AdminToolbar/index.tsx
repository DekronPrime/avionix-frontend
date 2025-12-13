"use client";

import React from "react";
import Button from "../../common/Button";
import { Search } from "./Search";

import AddItem from "@/public/icons/add-item-light.png";

type AdminToolbarProps = {
  onCreate?: () => void;
  filters?: React.ReactNode;
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
};

export const AdminToolbar: React.FC<AdminToolbarProps> = ({
  onCreate,
  filters,
  onSearch,
  searchPlaceholder,
}: AdminToolbarProps) => {
  return (
    <>
      <div className="flex items-stretch justify-between gap-3 w-full">
        <div className="inline-flex items-stretch gap-3 h-full">
          <Button
            onClick={onCreate}
            icon={AddItem}
            iconSize={30}
            variant="admin"
            size="adm"
          >
            New Airport
          </Button>
        </div>

        <Search onSearch={onSearch} placeholder={searchPlaceholder} />
        {filters}
      </div>
    </>
  );
};
