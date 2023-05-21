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
      {modal ? <AddBook setModal={setModal} book={book} /> : null}
      <div className="w-52 group">
        <div className="hidden group-hover:flex w-[200px] h-[360px] absolute justify-end items-end z-10">
          {/* TODO: change button color */}
          <button
            className="bg-primary w-8 h-8 rounded-3xl text-white"
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
        <h2 className="font-bold text-sm">{title}</h2>
        <h3 className="text-sm">{author_name}</h3>
      </div>
    </>
  );
};

export default Book;
