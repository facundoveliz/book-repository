import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';

type BookType = {
  book_id: string;
  status: string;
  review: string;
  score: number;
};

type BookProps = {
  book: BookType;
};

const Book = ({ book }: BookProps) => {
  const [bookDetail, setBookDetail] = useState([]);

  const getBooksDetailRequest = async (b) => {
    const URL = 'https://openlibrary.org';
    const res = await axios.get(`${URL}${b.book_id}.json`);
    return res;
  };

  const getBooksDetailMutation = useMutation(getBooksDetailRequest, {
    onSuccess: (res) => {
      setBookDetail(res.data);
    },
  });

  useEffect(() => {
    getBooksDetailMutation.mutate(book);
  }, []);

  if (getBooksDetailMutation.isLoading || getBooksDetailMutation.isIdle) {
    return <div>Loading...</div>;
  }

  if (getBooksDetailMutation.isError) {
    return <div>An error has ocurred!</div>;
  }

  return (
    <div>
      <p>{bookDetail.title}</p>
      <p>Review: {book.review}</p>
      <p>Score: {book.score}</p>
      <Image
        height={1920}
        width={1080}
        src={
          bookDetail.covers[0]
            ? `https://covers.openlibrary.org/b/id/${bookDetail.covers[0]}-L.jpg`
            : '/default-cover.png'
        }
        className="rounded-md shadow"
      />
    </div>
  );
};

export default Book;
