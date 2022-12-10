import axiosClient from './axiosClient';

const usersRoute = '/api/users';

type Data = {
  name?: string;
  email?: string;
  password?: string;
};

export async function getUser() {
  return axiosClient.get(usersRoute);
}

export async function registerUser(data: Data) {
  await axiosClient.post(`${usersRoute}/register`, data);
  return (window.location.href = '/login');
}

export async function loginUser(data: Data) {
  await axiosClient.post(`${usersRoute}/login`, data).then((res) => {
    localStorage.setItem('x-auth-token', res.data.result);
    return (window.location.href = '/');
  });
}

export async function putUser(data: Data) {
  await axiosClient.put(usersRoute, data);
}

export async function deleteUser() {
  return axiosClient.delete(usersRoute);
}
