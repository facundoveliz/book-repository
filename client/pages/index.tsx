import React, { useState } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import Book from '../components/Book';

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const URL = 'http://openlibrary.org/search.json?title=';

  const getBookRequest = async () => {
    setLoading(true);
    await axios.get(`${URL}${searchTerm}`).then((res) => {
      if (res) {
        const newBooks = res.data.docs?.slice(0, 20).map((bookSingle) => {
          const {
            key,
            author_name,
            cover_i,
            edition_count,
            first_publish_year,
            title,
          } = bookSingle;

          return {
            id: key,
            author: author_name,
            cover: cover_i,
            edition_count: edition_count,
            first_publish_year: first_publish_year,
            title: title,
          };
        });

        console.log(res.data);
        setBooks(newBooks);
      } else {
        setBooks([]);
      }
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
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-1/2 m-auto my-8"
      >
        <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit" className="mt-2 btn btn-primary">
          Submit
        </button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex justify-center">
          {!books ? (
            <div>No books founded 😔</div>
          ) : (
            <div className="w-full grid grid-cols-auto-fit gap-8 m-8 ">
              {books.map((b) => (
                <Book book={b} key={b.id} />
              ))}
            </div>
          )}
        </div>
      )}
      <div className="w-full flex justify-center">
        {books && books.length >= 1 ? (
          <button className="btn-primary my-8" onClick={() => loadMore()}>
            Load more
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
