import Image from 'next/image';
import React, { useState } from 'react';
import AddBook from './AddBook';

type BookType = {
  key: string;
  title: string;
  author_name: string;
  cover_i: string;
};

type BookProps = {
  book: BookType;
};

const Book = ({ book }: BookProps) => {
  const [modal, setModal] = useState(false);

  const { title, author_name, cover_i } = book;
  return (
    <>
      {modal ? <AddBook modal={modal} setModal={setModal} book={book} /> : null}
      <div className="group w-52 grow">
        <div className="absolute z-10 hidden h-[360px] w-[200px] items-end justify-end group-hover:flex">
          {/* TODO: change button color */}
          <button
            className="h-8 w-8 bg-primary-500 rounded-lg"
            onClick={() => setModal(true)}
          >
            +
          </button>
        </div>
        <Image
          height={1920}
          width={1080}
          src={
            cover_i
              ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`
              : '/default-cover.png'
          }
          alt="cover"
          className="rounded-md shadow"
        />
        <h2 className="text-sm font-bold truncate">{title}</h2>
        <h3 className="text-sm text-foreground-400">{author_name}</h3>
      </div>
    </>
  );
};

export default Book;
