import Image from 'next/image';
import React from 'react';

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
  const { title, authors, categories, imageLinks } = book.volumeInfo;
  return (
    <div>
      <h2>{title}</h2>
      <p>{authors}</p>
      <p>{categories}</p>
      <Image
        width={96}
        height={165}
        src={
          // TODO: default image for non existent cover
          imageLinks ? imageLinks.thumbnail : '/default-cover.png'
        }
      />
    </div>
  );
};

export default Book;
