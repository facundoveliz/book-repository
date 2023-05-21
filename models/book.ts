import Sequelize from 'sequelize'
import * as Yup from 'yup'

import sequelize from './index'

export const Book = sequelize.define('book', {
  book_id: {
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
  score: {
    type: Sequelize.INTEGER,
  },
})

export const schema = Yup.object().shape({
  book_id: Yup.string().required(),
  status: Yup.string()
    .required('The status is a required field.')
    .oneOf(['read', 'currently-reading', 'to-read']),
  review: Yup.string().max(
    1024,
    'The review should not have more than 128 characters.',
  ),
  score: Yup.number()
    .min(0, 'The score should be at least 1.')
    .max(5, 'The score should not have more than 5.'),
})
