import React, { useState } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import Book from './Book';
import { useMutation, useQuery } from 'react-query';
import { getUser } from '../../api/users';

const Home: NextPage = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('A Court of Thorns and Roses');

  // GET request from API
  const getBookRequest = async () => {
    const URL = 'http://openlibrary.org/search.json?title=';
    const res = await axios.get(`${URL}${searchTerm}`);
    return res.data.docs;
  };

  const getBooksMutation = useMutation(getBookRequest, {
    onSuccess: (res) => {
      setBooks(res);
    },
  });

  // GET request from current logged user
  const getUserRequest = async () => {
    const { data } = await getUser();
    return data.result;
  };

  const user = useQuery('user', getUserRequest);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getBooksMutation.mutate();
  };

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (user.isError) {
    return <div>An error has ocurred!</div>;
  }

  return (
    <div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-1/2 my-8 mx-8"
      >
        <input
          type="text"
          defaultValue="A Court of Thorns and Roses"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="mt-2 btn btn-primary">
          Submit
        </button>
      </form>
      {getBooksMutation.isLoading ? (
        <div>Loading...</div>
      ) : getBooksMutation.isError ? (
        <div>An error has ocurred!</div>
      ) : (
        <div className="flex justify-center">
          {!books ? (
            <div>No books founded 😔</div>
          ) : (
            <div className="w-full grid grid-cols-auto-fit gap-8 m-8 ">
              {books.map((book) => (
                <Book book={book} key={book.key} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
