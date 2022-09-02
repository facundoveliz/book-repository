import dotenv from 'dotenv'

dotenv.config()

// TODO: check if i should delete not used variables like port/secret
const config = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  secret: process.env.JWT_PRIVATE_KEY,
  dialect: 'mariadb',
}

export default config
