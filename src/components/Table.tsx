import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  type ColumnDef,
} from "@tanstack/react-table";
import { CSSProperties } from "react";

/**
 * @Note I added this table so it's reusable, same as the other components like Button, Heading ...
 * @exampleUsage <Table columns={ .... } data={ .... } className = "..." />
 */

type Props<T> = {
  columns: ColumnDef<T, any>[];
  data: T[];
  className?: string;
  style?: CSSProperties;
  header?: { className?: string; style?: CSSProperties };
  headerCell?: { className?: string; style?: CSSProperties };
  body?: { className?: string; style?: CSSProperties };
  rowData?: { className?: string; style?: CSSProperties };
  cell?: { className?: string; style?: CSSProperties };
  [key: string]: any;
};

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
  // Initialize table with TanStack
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...rest,
  });

  return (
    <table className={className} style={style}>
      <thead {...headerProps}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                {...thProps}
                {...header.column.columnDef.meta}
              >
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
      <tbody {...bodyProps}>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} {...trProps}>
            {row.getVisibleCells().map((cell) => (
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
