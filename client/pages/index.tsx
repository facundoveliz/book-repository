import React from 'react';
import type { NextPage } from 'next';
import BookSearch from '../components/BookSearch';
import UserBooks from '../components/UserBooks';

const Home: NextPage = () => {
  return (
    <>
      <BookSearch />
      <UserBooks />
    </>
  );
};

export default Home;
