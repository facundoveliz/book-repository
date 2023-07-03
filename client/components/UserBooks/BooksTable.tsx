import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';
import Image from 'next/image';

type BookType = {
  title: string;
  covers: [];
  status: string;
  review: string;
  score: number;
};

type BooksTableProps = {
  userBooks: BookType[];
};

const columnHelper = createColumnHelper<BookType>();

const columns = [
  columnHelper.accessor('covers', {
    header: 'Cover',
    cell: (info) => (
      <Image
        width={62}
        height={110}
        src={
          info.getValue()
            ? `https://covers.openlibrary.org/b/id/${info.row.original.covers[0]}-L.jpg`
            : '/default-cover.png'
        }
        alt="cover"
        className="rounded-md shadow"
      />
    ),
  }),
  columnHelper.accessor('title', {
    header: 'Title',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('score', {
    header: 'Score',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('review', {
    header: 'Review',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => info.getValue(),
  }),
];

const BooksTable = ({ userBooks }: BooksTableProps) => {
  const [sorting, setSorting] = React.useState([]);
  const table = useReactTable({
    data: userBooks,
    columns,
    state: {
      sorting,
    }, // @ts-ignore
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="mt-4 w-full table-fixed border-separate border-spacing-y-0 rounded-lg bg-background-variant max-[830px]:table-auto">
        <thead className="cursor-pointer select-none overflow-hidden text-left">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              className="text-center [&>*:first-child]:w-24 [&>*:nth-child(2)]:w-1/2 [&>*:nth-child(2)]:text-left"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="cursor-pointer select-none overflow-hidden px-8 text-sm"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: ' ↑',
                          desc: ' ↓',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="overflow-auto whitespace-nowrap text-center">
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <tr
                  key={row.id}
                  className="cursor-pointer hover:bg-primary [&>*:nth-child(2)]:text-left"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
