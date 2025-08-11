import { useMemo } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { Character } from "../types";
import { Link } from "@tanstack/react-router";

interface Props {
  data: Character[];
}

const columnHelper = createColumnHelper<Character>();

export default function CharacterTable({ data }: Props) {
  const columns = useMemo<ColumnDef<Character, any>[]>(
    () => [
      columnHelper.accessor("image", {
        header: "Image",
        cell: (info) => (
          <img src={info.getValue()} alt="character" width={50} height={50} />
        ),
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => (
          <Link
            to="/character/$id"
            params={{ id: String(info.row.original.id) }}
            className="text-blue-500"
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("status", { header: "Status" }),
      columnHelper.accessor("species", { header: "Species" }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table border={1} cellPadding={5}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
