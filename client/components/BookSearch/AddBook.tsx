import React from 'react';
import Image from 'next/image';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { postBook } from '../../api/books';
import { useMutation, useQueryClient } from 'react-query';
import { Dialog } from '@headlessui/react';

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

const AddBook = ({ modal, setModal, book }: AddBookProps) => {
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
    <Dialog
      open={modal}
      onClose={() => setModal(false)}
      className="relative z-10"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="w-4/5 md:w-8/12 lg:w-4/12 rounded-lg bg-background-500 p-8 p-4">
          <Dialog.Title className="mb-4 flex flex-row items-center text-center">
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
            <div className='w-full'>
              <h3 className="text-xl font-bold">{title}</h3>
              <h4 className="text-sm text-foreground-400">
                {author_name}
              </h4>
            </div>
          </Dialog.Title>
          <Dialog.Description>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium">Status</label>
                <select defaultValue="to-read" {...register('status')}>
                  <option value="to-read">To read</option>
                  <option value="currently-reading">Currently reading</option>
                  <option value="read">Read</option>
                </select>
                <p>{errors.status?.message}</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Score</label>
                <input
                  placeholder="0"
                  type="number"
                  className="block w-full rounded-lg text-sm placeholder-gray-400 focus:ring-blue-500"
                  {...register('score')}
                />
                <p>{errors.score?.message}</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Review</label>
                <input
                  className="block w-full rounded-lg text-sm placeholder-gray-400 focus:ring-blue-500"
                  {...register('review')}
                />
                <p>{errors.review?.message}</p>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddBook;
