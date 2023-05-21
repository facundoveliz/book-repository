import React from 'react';
import Image from 'next/image';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { postBook } from '../../api/books';
import { useMutation, useQueryClient } from 'react-query';

type IFormInputs = {
  book_id: string;
  status: string;
  review: string;
  score: number;
};

const schema = yup.object({
  status: yup
    .string()
    .required('The status is a required field.')
    .oneOf(['read', 'currently-reading', 'to-read']),
  review: yup
    .string()
    .max(1024, 'The review should not have more than 128 characters.'),
  score: yup
    .number()
    .min(0, 'The score should be at least 1.')
    .max(5, 'The score should not have more than 5.'),
});

type BookType = {
  title: string;
  author_name: string;
  cover_i: string;
  key: string;
};

type AddBookProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  book: BookType;
};

const AddBook = ({ setModal, book }: AddBookProps) => {
  const { title, author_name, cover_i, key } = book;
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      book_id: key,
      score: 0,
    },
  });

  const queryClient = useQueryClient();

  const postBookMutation = useMutation(postBook, {
    onSuccess: () => {
      queryClient.invalidateQueries('entries');
      queryClient.invalidateQueries('user');
      setModal(false);
      resetField('status');
      resetField('score');
      resetField('review');
    },
  });

  const onSubmit = (data: IFormInputs) => {
    postBookMutation.mutate(data);
  };

  return (
    <div onClick={() => setModal(false)}>
      <div className="fixed z-10 bg-gray-900 bg-opacity-80 flex items-center justify-center top-0 left-0 right-0 z-50 w-full h-full p-4 overflow-x-hidden overflow-y-auto md:inset-0">
        <div className="pointer-events-auto relative w-full max-w-md md:h-auto">
          <div className="relative rounded-lg shadow bg-background">
            <button
              type="button"
              className="absolute top-6 right-2.5 text-gray-400 rounded-lg text-sm p-1.5 ml-auto  items-center hover:bg-background-color-2 hover:text-white"
              onClick={() => setModal(false)}
            >
              X
            </button>
            <div className="px-6 py-6 lg:px-8">
              <div className="flex flex-row items-center mb-4">
                <div className="w-24">
                  <Image
                    height={1920}
                    width={1080}
                    src={
                      cover_i
                        ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`
                        : '/default-cover.png'
                    }
                    className="rounded-md shadow"
                  />
                </div>
                <div>
                  <h3 className="ml-4 text-xl font-medium text-white">
                    {title}
                  </h3>
                  <h4 className="ml-4 text-sm font-medium text-white">
                    {author_name}
                  </h4>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Status
                  </label>
                  <select defaultValue="to-read" {...register('status')}>
                    <option value="to-read">To read</option>
                    <option value="currently-reading">Currently reading</option>
                    <option value="read">Read</option>
                  </select>
                  <p>{errors.status?.message}</p>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Score
                  </label>
                  <input
                    placeholder="0"
                    type="number"
                    className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-gray-400 text-white"
                    {...register('score')}
                  />
                  <p>{errors.score?.message}</p>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Review
                  </label>
                  <input
                    className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-gray-400 text-white"
                    {...register('review')}
                  />
                  <p>{errors.review?.message}</p>
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
