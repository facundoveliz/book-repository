import express from 'express'
import { Request, Response } from '../types'
import { Book, schema } from '../models/book'

const router = express.Router()

export const getBooks = async (req: Request, res: Response) => {
  // get books only from the current user
  const books = await Book.findAll({ where: { userId: req.user?.id } })
  if (books) {
    return res.status(200).json({
      ok: true,
      msg: 'Books founded',
      result: books,
    })
  }
  return res.status(404).json({
    ok: false,
    msg: 'No books founded',
  })
}

export const postBook = async (req: Request, res: Response) => {
  // checks for validation errors
  schema
    .validate(req.body)
    .then(async () => {
      Book.create({
        book_id: req.body.book_id,
        status: req.body.status,
        review: req.body.review,
        score: req.body.score,
        userId: req.user?.id,
      }).then((book) => res.status(200).json({
        ok: true,
        msg: 'Book created',
        result: book,
      }))
    })
    .catch((err) => res.status(400).json({
      ok: false,
      msg: 'Validation error',
      result: err,
    }))
}

export const putBook = async (req: Request, res: Response) => {
  schema
    .validate(req.body)
    .then(async () => {
      await Book.update(
        {
          book_id: req.body.book_id,
          status: req.body.status,
          review: req.body.review,
          score: req.body.score,
        },
        {
          where: {
            // ensures that the book that is trying to update
            // has the same user that the one who's logged
            id: req.params.id,
            userId: req.user?.id,
          },
        },
      ).then((book) => res.status(200).json({
        ok: true,
        msg: 'Book updated',
        result: book,
      }))
    })
    .catch((err) => res.status(400).json({
      ok: false,
      msg: 'Validation error',
      result: err,
    }))
}

export const deleteBook = async (req: Request, res: Response) => {
  const book = await Book.destroy({
    where: { id: req.params.id, userId: req.user?.id },
  })
  if (book) {
    return res.status(200).json({
      ok: true,
      msg: 'Book deleted',
    })
  }
  return res.status(404).json({
    ok: false,
    msg: "Book not founded or you don't have permissions",
  })
}

export default router
