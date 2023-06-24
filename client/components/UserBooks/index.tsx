import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getBooks } from '../../api/books';
import BooksTable from './BooksTable';

type BookType = {
  book_id: string;
  status: string;
  review: string;
  score: number;
};

const UserBooks = () => {
  const [filteredBooks, setFilteredBooks] = useState({
    read: [],
    toRead: [],
    currentlyReading: [],
  });

  // GET request from current logged user books
  const getUserBooksRequest = async () => {
    const res = await getBooks();
    return res.data.result;
  };

  // GET request from current logged user books details
  const getBooksDetailRequest = async (books: BookType[]) => {
    const URL = 'https://openlibrary.org';

    let bookDetails = [];
    for (const book of books) {
      const res = await axios.get(`${URL}${book.book_id}.json`);
      bookDetails.push(res.data);
    }

    return bookDetails;
  };

  // filter books by category, to later make a table for each one
  // HACK: too many any's because the API of the books doesn't have
  // ts support, so...
  const filterBooks = (
    booksData: BookType[],
    booksDetail: any[] | undefined,
  ) => {
    const b: any = {
      read: [],
      toRead: [],
      currentlyReading: [],
    };

    const books = booksDetail?.map((book, index) => ({
      ...book,
      ...booksData[index],
    }));

    for (const book of books) {
      switch (book.status) {
        case 'read':
          b.read.push(book);
          break;
        case 'to-read':
          b.toRead.push(book);
          break;
        case 'currently-reading':
          b.currentlyReading.push(book);
          break;
        default:
          break;
      }
    }

    return b;
  };

  const getBooksDetailMutation = useMutation(getBooksDetailRequest);

  const { status, data } = useQuery('userBooks', getUserBooksRequest, {
    onSuccess: (res) => {
      getBooksDetailMutation.mutate(res);
    },
  });

  useEffect(() => {
    if (data && getBooksDetailMutation.data) {
      setFilteredBooks(filterBooks(data, getBooksDetailMutation.data));
    }
  }, [data, getBooksDetailMutation.data]);

  return (
    <div>
      {status === 'loading' || getBooksDetailMutation.isLoading ? (
        <div>Loading...</div>
      ) : status === 'error' || getBooksDetailMutation.isError ? (
        <div>An error has occurred!</div>
      ) : (
        <div className="m-auto w-11/12">
          <h1 className="m-4 text-2xl font-bold">Readed</h1>
          <BooksTable userBooks={filteredBooks.read} />
          <h1 className="mt-4 text-2xl font-bold">To read</h1>
          <BooksTable userBooks={filteredBooks.toRead} />
          <h1 className="mt-4 text-2xl font-bold">Reading</h1>
          <BooksTable userBooks={filteredBooks.currentlyReading} />
        </div>
      )}
    </div>
  );
};

export default UserBooks;
