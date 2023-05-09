import Image from 'next/image';
import React, { useState } from 'react';
import AddBook from './AddBook';

type VolumeInfoType = {
  volumeInfo: BookType;
};

type BookType = {
  title: string;
  authors: [];
  categories: [];
  imageLinks: ImageLinksType;
};

type ImageLinksType = {
  thumbnail: string;
};

type BookProps = {
  book: VolumeInfoType;
};

const Book = ({ book }: BookProps) => {
  const [modal, setModal] = useState(false);

  const { title, imageLinks } = book.volumeInfo;
  return (
    <div>
      {modal ? (
        <AddBook setModal={setModal} title={title} imageLinks={imageLinks} />
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
            // TODO: default image for non existent cover
            imageLinks ? imageLinks.thumbnail : '/default-cover.png'
          }
          className="rounded-md shadow"
        />
        <h2 className="font-bold text-sm">{title}</h2>
      </div>
    </div>
  );
};

export default Book;
