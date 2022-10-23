import React, { ReactElement, useEffect } from 'react';
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { loginUser } from '../api/users';
import Link from 'next/link';

interface Iforminputs {
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
    setError,
    formState: { errors },
  } = useForm<Iforminputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'johndoe@gmail.com',
      password: 'johndoepassword',
    },
  });

  const onSubmit = (data: Iforminputs) =>
    loginUser(data).then((res) => {
      // NOTE: probably not the best choice, i made a lot of
      // verifications of the same type to get to this, but
      // for the moment i don't find another relatively easy
      // way of make this
      if (res.toString() === 'Invalid email or password') {
        setError('email', {
          message: res.toString(),
        });
      }
    });

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
          <button type="submit">Submit</button>
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
