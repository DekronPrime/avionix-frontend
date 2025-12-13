import { Column } from "@/src/types/admin";
import { getNestedValue } from "@/src/utils/loadNestedValue";

type TableRowProps<T> = {
  row: T;
  columns: Column<T>[];
  onClick?: () => void;
};

export const TableRow = <T extends object>({
  row,
  columns,
  onClick,
}: TableRowProps<T>) => {
  return (
    <tr
      className="hover:bg-gray-100 cursor-pointer transition rounded-md"
      onClick={onClick}
    >
      {columns.map((col) => {
        const value = getNestedValue(row, String(col.key));

        return (
          <td
            key={String(col.key)}
            className={`px-3 py-4 border-t text-lg font-poppins font-semibold text-black 
                first-of-type:pl-6 first-of-type:rounded-l-md last-of-type:pr-6 last-of-type:rounded-r-md
                ${
                  col.align === "left"
                    ? "text-left"
                    : col.align === "right"
                    ? "text-right"
                    : "text-center"
                }
            `}
            style={{ width: col.width }}
          >
            {col.render ? col.render(value, row) : String(value ?? "")}
          </td>
        );
      })}
    </tr>
  );
};
