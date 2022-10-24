import React, { useState } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import Book from '../components/book';

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getBookRequest = async () => {
    setLoading(true);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=11`,
      )
      .then((res) => {
        setBooks(res.data.items);
      });
    setLoading(false);
  };

  const loadMore = async () => {
    await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=8&startIndex=${books.length}`,
      )
      .then((res) => {
        setBooks((oldBooks) => [...oldBooks, ...res.data.items]);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getBookRequest();
  };

  return (
    <div>
      <h3>Bookshelves</h3>
      <ul>
        <ul>All(24)</ul>
        <ul>Read</ul>
        <ul>Want to Read</ul>
        <ul>Currently Reading</ul>
      </ul>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {!books ? (
            <div>No books founded 😔</div>
          ) : (
            <div>
              {books.map((b) => (
                <Book book={b} key={b.volumeInfo.id} />
              ))}
              <button onClick={() => loadMore()}>Load more</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
