import Sequelize from 'sequelize'
import * as Yup from 'yup'

import { sequelize } from './index'

export const Book = sequelize.define('book', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  review: {
    type: Sequelize.STRING,
  },
  rate: {
    type: Sequelize.INTEGER,
  },
})

export const schema = Yup.object().shape({
  name: Yup.string()
    .required('The name is a required field.')
    .min(4, 'The name should be at least 3 characters.')
    .max(64, 'The name should not have more than 128 characters.'),
  status: Yup.string()
    .required('The status is a required field.')
    .oneOf(['read', 'currently-reading', 'to-read']),
  review: Yup.string()
    .min(8, 'The review should be at least 8 characters.')
    .max(1024, 'The review should not have more than 128 characters.'),
  rate: Yup.number()
    .min(1, 'The rate should be at least 1.')
    .max(5, 'The rate should not have more than 5.'),
})
