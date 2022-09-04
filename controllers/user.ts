import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { Request, Response } from '../types'
import { User, schema } from '../models/user'

const router = express.Router()

export const getUser = async (req: Request, res: Response) => {
  // get data only from the current user
  const user = await User.findByPk(req.user?.id)
  if (user) {
    return res.status(200).json({
      ok: true,
      msg: 'User founded',
      result: user,
    })
  }
  return res.status(404).json({
    ok: false,
    msg: 'User not founded',
  })
}

export const registerUser = async (req: Request, res: Response) => {
  // checks for validation errors
  schema
    .validate(req.body)
    .then(async () => {
      // checks if the email is valid
      const user = await User.findOne({
        where: { email: req.body.email },
      })
      // if the email exists, the func ends here
      if (user) {
        return res.status(400).json({
          ok: false,
          msg: 'Invalid email or password',
        })
      }

      // hash the password
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(req.body.password, salt)

      // creates the new user
      await User.create({
        username: req.body.username,
        email: req.body.email,
        password,
      }).then(() => res.status(200).json({
        ok: true,
        msg: 'User created',
      }))
    })
    .catch((err) => res.status(400).json({
      ok: false,
      msg: 'Validation error',
      result: err,
    }))
}

export const loginUser = async (req: Request, res: Response) => {
  // checks if thje email is valid
  const user: any = await User.findOne({
    where: { email: req.body.email },
  })
  // if the email doesn't exists, the func ends here
  if (!user) {
    return res.status(400).json({
      ok: false,
      msg: 'Invalid email or password',
    })
  }

  // compares passwords
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) {
    return res.status(400).json({
      ok: false,
      msg: 'Invalid email or password',
    })
  }

  // generate token and set it to expire in 30 days
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_PRIVATE_KEY as string,
    {
      expiresIn: '30d',
    },
  )

  return res.status(200).json({
    ok: true,
    msg: 'User logged',
    result: token,
  })
}

export const putUser = async (req: Request, res: Response) => {
  // finds the user and saves the body to newUser for
  // comparing them if they are the same or for email validation
  const user: any = await User.findByPk(req.user?.id)
  const newUser = {
    name: user.name,
    email: user.email,
    password: user.password,
  }

  if (req.body.name !== user.name && req.body.name.length >= 1) newUser.name = req.body.name
  if (req.body.email !== user.email && req.body.name.length >= 1) {
    // checks if the email is exists
    const emailCheck = await User.findOne({
      where: { email: req.body.email },
    })
    // if the email exists, the func ends here
    if (emailCheck !== null) {
      return res.status(400).json({
        ok: false,
        msg: 'Invalid email or password',
      })
    }
    newUser.email = req.body.email
  }
  if (req.body.password.length >= 1) {
    newUser.password = req.body.password
    // hash the password
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)
  }

  await User.update({ newUser }, { where: { id: req.user?.id } }).then(() => {
    res.status(200).json({
      ok: true,
      msg: 'User updated',
    })
  })
}

export const deleteUser = async (req: Request, res: Response) => {
  await User.destroy({ where: { id: req.user?.id } })
    .then(() => res.status(200).json({
      ok: true,
      msg: 'User deleted',
    }))
    .catch((err) => res.status(404).json({
      ok: false,
      msg: 'User not founded',
      result: err,
    }))
}

export default router
