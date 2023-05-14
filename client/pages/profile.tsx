import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { deleteUser, getUser, putUser } from '../api/users';

type IFormInputs = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const schema = yup.object({
  username: yup
    .string()
    .min(3, 'The name should be at least 3 characters.')
    .max(128, 'The name should not have more than 128 characters.'),
  email: yup
    .string()
    .min(1, 'The email is a required field')
    .email('Email must be a valid email.')
    .required(),
  password: yup
    .string()
    .notRequired()
    .matches(/.{8,}/, {
      excludeEmptyString: true,
      message: 'The password should be at least 8 characters.',
    })
    .max(128, 'The password should not have more than 128 characters.'),
  passwordConfirm: yup
    .string()
    .notRequired()
    .matches(/.{8,}/, {
      excludeEmptyString: true,
      message: 'The password should be at least 8 characters.',
    })
    .max(128, 'The password should not have more than 128 characters.')
    .oneOf([yup.ref('password'), null], 'Passwords must match.'),
});

const Profile: NextPage = function Profile() {
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInputs) => putUser(data);

  const getUserRequest = async () => {
    setLoading(true);
    const res = await getUser();
    if (res) {
      reset({
        username: res.data.result.username,
        email: res.data.result.email,
        password: '',
        passwordConfirm: '',
      });
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    deleteUser().then(() => {
      localStorage.removeItem('x-auth-token');
      window.location.href = '/login';
    });
  };

  useEffect(() => {
    getUserRequest();
  }, []);

  return (
    <>
      {loading ? (
        <div>div...</div>
      ) : (
        <div>
          <h1>Profile</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p>Username</p>
              <input error={!!errors.password} {...register('username')} />
              <p>{errors.username?.message}</p>
            </div>

            <div>
              <p>Email Adress</p>
              <input error={!!errors.email} {...register('email')} />
              <p>{errors.email?.message}</p>
            </div>

            <div>
              <p>Password</p>
              <input
                error={!!errors.password}
                {...register('password')}
                type="password"
              />
              <p>{errors.password?.message}</p>
            </div>

            <div>
              <p>Confirm password</p>
              <input
                error={!!errors.passwordConfirm}
                {...register('passwordConfirm')}
                type="password"
              />
              <p>{errors.passwordConfirm?.message}</p>
            </div>

            <div>
              <button onClick={() => handleDelete()}>Delete account</button>
              <button type="submit">Accept</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Profile;
