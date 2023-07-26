import React, { useState } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import { Dialog } from '@headlessui/react';
import Book from './Book';
import { useMutation, useQuery } from 'react-query';
import { getUser } from '../../api/users';

const Home: NextPage = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('The Name of the Wind');

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
      <div className="mx-8 flex justify-center rounded-lg sm:w-8/12 lg:w-4/12">
        <form onSubmit={(e) => handleSubmit(e)} className="flex w-full">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="p-2.5 pl-10"
              placeholder="Search"
              defaultValue="The Name of the Wind"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
      </div>
      {getBooksMutation.isLoading ? (
        <div>Loading...</div>
      ) : getBooksMutation.isError ? (
        <div>An error has ocurred!</div>
      ) : (
        <div className="flex p-8">
          {!books ? (
            <div>No books founded 😔</div>
          ) : (
            <div className="w-full flex flex-wrap gap-4">
              {books.map((book) => {
                if (book.cover_i) {
                  return <Book book={book} key={book.key} />;
                }
                return null;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
