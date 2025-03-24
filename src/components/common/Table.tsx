import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  type ColumnDef,
} from "@tanstack/react-table";
import { CSSProperties } from "react";

type Props<T> = {
  columns: ColumnDef<T, any>[]; // Column definitions
  data: T[]; // Data to be displayed in the table
  className?: string;
  style?: CSSProperties; // Optional inline styles for the table element
  headerProps?: { className?: string; style?: CSSProperties }; // table header
  thProps?: { className?: string; style?: CSSProperties }; // table header cells
  bodyProps?: { className?: string; style?: CSSProperties }; // table body
  trProps?: { className?: string; style?: CSSProperties }; // table rows
  tdProps?: { className?: string; style?: CSSProperties }; // table cells
  [key: string]: any;
};

// Table component definition
export function Table<T>({
  columns,
  data = [],
  className = "",
  style,
  headerProps = {},
  thProps = {},
  bodyProps = {},
  trProps = {},
  tdProps = {},
  ...rest
}: Props<T>) {
  // Initialize the table using TanStack (React Table)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // Sorting functionality
    ...rest,
  });

  return (
    // Table element with optional className and style
    <table className={className} style={style}>
      {/* Table header */}
      <thead {...headerProps}>
        {table.getHeaderGroups().map((headerGroup) => (
          // Render each header group
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              // Render each header cell
              <th
                key={header.id}
                {...thProps} // Spread thProps for custom styling
                {...header.column.columnDef.meta} // Spread meta data from column definition
              >
                {/* Render header content if not a placeholder */}
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      {/* Table body */}
      <tbody {...bodyProps}>
        {table.getRowModel().rows.map((row) => (
          // Render each row
          <tr key={row.id} {...trProps}>
            {row.getVisibleCells().map((cell) => (
              // Render each cell
              <td key={cell.id} {...tdProps}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
