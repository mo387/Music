import pool from '../config.js'

/**
 * @tableName {string} 表名 
 * @data {object} 要更新的数据
 * @condition {object} 对应条件 
 * @method {string} and/or
 * @returns 
 */
export function update (tableName, data, condition, method) {
  return new Promise((resolve, reject) => {
    let sql = ''
    if (typeof data !== 'object' || typeof condition !== 'object') {
      throw new Error('第二个参数和第三个参数必须为对象')
    } else {
      let digital = ''
      let parms = []
      let condi = ''
      method = method || 'and'
      for (let item in data) {
        digital += `${item} = ?, `
        parms.push(data[item])
      }
      digital = digital.substring(0, digital.length - 2)
      for (let item in condition) {
        condi += `${item} = ? ${method} `
        parms.push(condition[item])
      }
      condi = condi.substring(0, condi.length - (method.length + 2))
      sql = `UPDATE ${tableName} SET ${digital} WHERE ${condi}`
      pool.query(sql, parms, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    }
  })
}