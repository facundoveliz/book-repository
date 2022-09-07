import { Request as Req, Response as Res, NextFunction as Next } from 'express'

interface User {
  user?: {
    id: number;
    name: string;
    email: string;
    password: string;
  };
}

export interface IBook {
  name: string;
  status: string;
  review: string;
  rate: number;
}

export type Request = Req & User;
export type Response = Res & User;
export type NextFunction = Next;
