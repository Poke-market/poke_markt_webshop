import { CSSProperties } from "react";

type Props<T> = {
  columns: any[];
  data: T[];
  className?: string;
  style?: CSSProperties;
};

export function Table<T>({
  columns,
  data = [],
  className = "",
  style,
}: Props<T>) {
  return (
    <table className={className} style={style}>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{}</tbody>
    </table>
  );
}
