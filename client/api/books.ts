import axiosClient from './axiosClient';

const booksRoute = '/api/books/';

type Data = {
  name: string;
  status: string;
  review: string;
  rate: number;
};

export async function getBooks() {
  return axiosClient.get(booksRoute);
}

export async function postBooks(data: Data) {
  return axiosClient.post(booksRoute, data);
}

export async function putBooks(id: string, data: Data) {
  return axiosClient.put(`${booksRoute}${id}`, data);
}

export async function deleteBooks(id: string) {
  return axiosClient.delete(`${booksRoute}${id}`);
}
