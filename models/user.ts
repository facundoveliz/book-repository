import Sequelize from 'sequelize'
import * as Yup from 'yup'

import sequelize from './index'
import { Book } from './book'

export const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

User.hasMany(Book, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }) // TODO: check if this works
Book.belongsTo(User)

export const schema = Yup.object().shape({
  username: Yup.string()
    .required('The name is a required field.')
    .min(3, 'The name should be at least 3 characters.')
    .max(128, 'The name should not have more than 128 characters.'),
  email: Yup.string()
    .required('The email is a required field.')
    .email('Email must be a valid email.'),
  password: Yup.string()
    .required('The password is a required field.')
    .min(8, 'The password should be at least 8 characters.')
    .max(128, 'The password should not have more than 128 characters.'),
})
