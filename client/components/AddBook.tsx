import React from 'react';
import Image from 'next/image';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { postBooks } from '../api/books';

type Iforminputs = {
  name: string;
  status: string;
  review: string;
  rate: number;
};

const schema = yup.object({
  status: yup
    .string()
    .required('The status is a required field.')
    .oneOf(['read', 'currently-reading', 'to-read']),
  review: yup
    .string()
    .min(8, 'The review should be at least 8 characters.')
    .max(1024, 'The review should not have more than 128 characters.'),
  rate: yup
    .number()
    .min(0, 'The rate should be at least 1.')
    .max(5, 'The rate should not have more than 5.'),
});

type ImageLinksType = {
  thumbnail: string;
};

type AddBookProps = {
  title: string;
  imageLinks: ImageLinksType;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddBook = ({ setModal, title, imageLinks }: AddBookProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Iforminputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: title,
    },
  });

  const onSubmit = (data: Iforminputs) => {
    postBooks(data);
  };

  return (
    <div className="fixed bg-gray-900 bg-opacity-80 flex items-center justify-center top-0 left-0 right-0 z-50 w-full h-full p-4 overflow-x-hidden overflow-y-auto md:inset-0">
      <div className="pointer-events-auto relative w-full max-w-md md:h-auto">
        <div className="relative rounded-lg shadow bg-background">
          <button
            type="button"
            className="absolute top-6 right-2.5 text-gray-400 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-background-color-2 hover:text-white"
            onClick={() => setModal(false)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <div className="flex flex-row items-center mb-4">
              <div className="w-24">
                <Image
                  height={1920}
                  width={1080}
                  src={imageLinks ? imageLinks.thumbnail : '/default-cover.png'}
                  className="rounded-md shadow"
                />
              </div>
              <h3 className="ml-4 text-xl font-medium text-white">{title}</h3>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              action="#"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Status
                </label>
                <select {...register('status')}>
                  <option value="read" selected>
                    Read
                  </option>
                  <option value="currently-reading">Currently reading</option>
                  <option value="to-read">To read</option>
                </select>
                <p>{errors.name?.message}</p>
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
                  {...register('rate')}
                />
                <p>{errors.rate?.message}</p>
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
  );
};

export default AddBook;
