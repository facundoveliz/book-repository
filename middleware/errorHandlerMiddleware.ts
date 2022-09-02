import { NextFunction, Request, Response } from 'express'

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response<any, Record<string, any>> => res.status(404).json({
  ok: false,
  msg: 'Not found',
})

interface Error {
  status?: number
  message?: string
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response<any, Record<string, any>> => res.status(err.status ?? 500).json({
  ok: false,
  msg: err.message,
})

export const catchErrors = (func: any) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(func(req, res)).catch(next)
}
