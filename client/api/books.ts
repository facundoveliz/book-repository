import axiosClient from './axiosClient';

const booksRoute = '/api/books/';

type Data = {
  book_id: string;
  status: string;
  review: string;
  score: number;
};

export async function getBooks() {
  return axiosClient.get(booksRoute);
}

export async function postBook(data: Data) {
  return axiosClient.post(booksRoute, data);
}

export async function putBook(id: string, data: Data) {
  return axiosClient.put(`${booksRoute}${id}`, data);
}

export async function deleteBook(id: string) {
  return axiosClient.delete(`${booksRoute}${id}`);
}
