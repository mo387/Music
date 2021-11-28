import mysql from 'mysql'
let pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'music',
  port: 3306
})
pool.connect()
export default pool
