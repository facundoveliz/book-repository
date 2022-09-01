import { Sequelize } from 'sequelize'
import config from '../config/config'

export const sequelize = new Sequelize(
  // @ts-expect-error
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  },
)

sequelize // TODO: remember to delete this on production
  .sync({ alter: true })
  .then(() => {
    console.log('fine')
  })
  .catch((err) => {
    console.log('err: ', err)
  })
