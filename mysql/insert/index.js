import pool from '../config.js'
/**
 * @tableName {String} 表名(单表)
 * @mothod {String} and/or
 * @returns Promise对象
 */

export function insertSingle (tableName, object) {
  //state(pending,resolve,reject)
  return new Promise((resolve, reject) => {
    let sql = ''
    let parms = []
    let part = ''
    let str = ''
    for (let item in object) {
      part += `${item},`
      str += '?,'
      parms.push(object[item])
    }
    part = part.substring(0, part.length - 1)
    str = str.substring(0, str.length - 1)
    sql = `INSERT INTO ${tableName} (${part}) VALUES (${str})`
    console.log(sql);
    pool.query(sql, parms,
      (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
  })
}
