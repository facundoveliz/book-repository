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

export default sequelize
