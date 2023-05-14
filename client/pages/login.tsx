import React, { ReactElement, useEffect } from 'react';
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { loginUser } from '../api/users';
import Link from 'next/link';
import { useMutation } from 'react-query';

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .required('The email is a required field.')
      .email('Email must be a valid email.'),
    password: yup
      .string()
      .required('The password is a required field.')
      .min(8, 'The password should be at least 8 characters.')
      .max(128, 'The password should not have more than 128 characters.'),
  })
  .required();

type LoginType = NextPage & { getLayout: any };

const Login: LoginType = function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'johndoe@gmail.com',
      password: 'johndoepassword',
    },
  });

  const loginUserMutation = useMutation(loginUser, {
    onSuccess: () => {
      window.location.href = '/login';
    },
    onError: (res: any) => {
      if (res.data.msg === 'Invalid email or password') {
        setError('email', {
          message: 'Email already in use',
        });
      }
    },
  });

  const onSubmit = (data: IFormInputs) => {
    loginUserMutation.mutate(data);
  };

  useEffect(() => {
    if (localStorage.getItem('x-auth-token')) {
      window.location.href = '/';
    }
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email Adress</label>
          <input {...register('email')} />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <label>Password</label>
          <input {...register('password')} type="password" />
          <p>{errors.password?.message}</p>
        </div>

        <div>
          <button type="submit" disabled={loginUserMutation.isLoading}>
            Submit
          </button>
          <Link href="/register">
            <p>Create an account</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

Login.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Login;
