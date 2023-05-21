import axios from 'axios';

const URL = 'https://openlibrary.org';

const getBookDetail = async (book_id: string) => {
  await axios.get(`${URL}${book_id}.json`).then((res) => {
    return res;
  });
};

export default getBookDetail;
