import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import AddBook from './AddBook';

type VolumeInfoType = {
  volumeInfo: BookType;
};

type BookType = {
  title: string;
  authors: [];
  categories: [];
  cover_i: ImageLinksType;
};

type ImageLinksType = {
  thumbnail: string;
};

type BookProps = {
  book: VolumeInfoType;
};

const Book = ({ book }: BookProps) => {
  const [modal, setModal] = useState(false);

  const URL = 'https://openlibrary.org/works/';

  const getBookDetailRequest = async () => {
    await axios.get(`${URL}${book.id}.json`).then((res) => console.log(res));
  };

  useEffect(() => {
    // getBookDetailRequest();
  }, []);

  const { title, cover_i } = book;
  return (
    <div>
      {modal ? (
        <AddBook setModal={setModal} title={title} cover_i={cover_i} />
      ) : null}
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
      </div>
    </div>
  );
};

export default Book;
