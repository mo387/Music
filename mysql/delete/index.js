import pool from '../config.js'

/**
 * @tableName {string} 表名 
 * @condition {Object} 删除条件
 * @method {string} and/or 
 * @returns promise对象
 * // deletesingle('song',{name:'林俊杰'，})
 */
export function deletesingle (tableName, condition, method) {
  return new Promise((resolve, reject) => {
    let sql = ''
    let parms = []
    method = method || 'and'
    if (typeof condition !== 'object') {
      throw new Error('条件只能为对象')
    } else {
      let condi = ''
      for (let item in condition) {
        condi += `${item} = ? ${method} `
        parms.push(condition[item])
      }
      condi = condi.substring(0, condi.length - (method.length + 2))
      sql = `DELETE FROM ${tableName} WHERE ${condi}`
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