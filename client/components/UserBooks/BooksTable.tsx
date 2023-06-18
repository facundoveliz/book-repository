import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
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
    header: 'COVER',
    cell: (info) => (
      <Image
        width={124}
        height={220}
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
    header: 'TITLE',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'STATUS',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('review', {
    header: 'REVIEW',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('score', {
    header: 'SCORE',
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
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <table className="w-full border-separate border-spacing-y-8 bg-red-800">
        <thead className="text-left">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="text-xl overflow-hidden cursor-pointer select-none"
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
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <tr key={row.id}>
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
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1">
          <p>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </p>
        </span>
        <div>
          <button
            className="btn"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="btn"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="btn"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="btn"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
        </div>
      </div>
    </>
  );
};

export default BooksTable;
