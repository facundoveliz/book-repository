import React from 'react';
import { useQuery } from 'react-query';
import { getBooks } from '../../api/books';
import Book from './Book';

const UserBooks = () => {
  // GET request from current logged user books
  const getUserBooksRequest = async () => {
    const res = await getBooks();
    return res.data.result;
  };

  const userBooks = useQuery('userBooks', getUserBooksRequest);

  if (userBooks.isLoading) {
    return <div>Loading...</div>;
  }

  if (userBooks.isError) {
    return <div>An error has ocurred!</div>;
  }

  return (
    <div>
      {!userBooks ? (
        <div>No books founded 😔</div>
      ) : (
        <div className="w-full grid grid-cols-auto-fit gap-8 m-8 ">
          {userBooks.data.map((book) => (
            <Book book={book} key={book.book_id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBooks;
