import { Column } from "@/src/types/admin";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

export type WithId = {
  id: string;
};

type AdminTableProps<T extends WithId> = {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;

  onRowClick?: (id: string) => void;
  onSort?: (field: keyof T | string) => void;
  sortField?: keyof T | string;
  sortDirection?: "asc" | "desc" | null;
};

export const AdminTable = <T extends WithId>({
  columns,
  data,
  loading,
  onRowClick,
  onSort,
  sortField,
  sortDirection,
}: AdminTableProps<T>) => {
  return (
    <>
      <div className="flex w-full bg-white rounded-md">
        <table className="border-collapse w-full">
          <TableHeader
            columns={columns}
            onSort={onSort}
            sortField={sortField}
            sortDirection={sortDirection}
          />

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-4 text-center text-black"
                >
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-4 text-center font-poppins font-semibold text-lg text-black"
                >
                  No records found
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <TableRow
                  key={idx}
                  row={row}
                  columns={columns}
                  onClick={() => onRowClick?.(row.id)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
