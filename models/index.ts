import { Sequelize } from 'sequelize'
import config from '../config/config'

const sequelize = new Sequelize(
  // @ts-expect-error unfixable sequelize error
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  },
)

sequelize // TODO: remember to delete this on production
  .sync()
  .then(() => {
    console.log('fine')
  })
  .catch((err) => {
    console.log('err: ', err)
  })

export default sequelize
