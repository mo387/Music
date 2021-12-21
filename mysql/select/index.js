import pool from '../config.js'
//查询所有列
/**
 * @tableName {String} 表名(单表)
 * @condition {Object} 查询条件
 * @mothod {String} and/or
 * @returns Promise对象
 */
export function selectAll (tableName, condition, method) {
  return new Promise((resolve, reject) => {
    method = method || 'and'
    let sql = ''
    let parms = []
    if (condition === undefined) {
      sql = `SELECT * FROM ${tableName}`
    } else if (typeof condition === 'object') {
      let last = ''
      for (let key in condition) {
        last += `${key} = ? ${method} `
        parms.push(condition[key])
      }
      last = last.substring(0, last.length - (method.length + 2))
      sql = `SELECT * FROM ${tableName} WHERE ${last}`
    } else {
      throw new Error('条件类型错误')
    }
    pool.query(sql, parms, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
//查询部分列
/**
 * @tableName {String} 表名(单表)
 * @part {Array} 列名(数组元素为字符串)
 * @condition {Object} 查询条件
 * @returns Promise对象
 * ['name']
 * async
 * let res = await selectPart('song',['name','age'],{})
 * 
 * 
 * )
 */
export function selectPart (tableName, part, condition, method) {
  return new Promise((resolve, reject) => {
    method = method || 'and'
    if (typeof part != 'string' && !Array.isArray(part)) {
      throw new Error('参数输入错误')
    } else {
      if (typeof part == 'string') {
        let sql = ''
        let parms = []
        if (typeof condition === undefined) {
          sql = `SELECT ${part} FROM ${tableName}`
        } else if (typeof condition === 'object') {
          let last = ''
          for (let key in condition) {
            last += `${key} = ? ${method} `,
              parms.push(condition[key])
          }
          last = last.substring(0, last.length - (method.length + 2))
          sql = `SELECT ${part} FROM ${tableName} WHERE ${last}`
        } else {
          throw new Error('条件类型错误')
        }
        pool.query(sql, parms, (err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        })
      } else {
        let str = ''
        let parms = []
        for (let i = 0; i < part.length; i++) {
          str += part[i] + ','
        }
        str = str.substring(0, str.length - 1)
        let sql = ''
        if (typeof condition === undefined) {
          sql = `SELECT ${str} FROM ${tableName}`
        } else if (typeof condition === 'object') {
          let last = ''
          for (let key in condition) {
            last += `${key} = ? ${method} `
            parms.push(condition[key])
          }
          last = last.substring(0, last.length - (method.length + 2))
          sql = `SELECT ${str} FROM ${tableName} WHERE ${last}`
        } else {
          throw new Error('条件类型错误')
        }
        pool.query(sql, parms, (err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        })
      }
    }
  })
}

//模糊查询
/**
 * @tableName {String} 表名(单表)
 * @condition {Object} 查询条件
 * @mothod {String} and/or
 * @returns Promise对象
 */
export function selectLike (tableName, condition, method) {
  return new Promise((resolve, reject) => {
    method = method || 'and'
    let sql = ''
    if (condition === undefined) {
      sql = `SELECT * FROM ${tableName}`
    } else if (typeof condition === 'object') {
      // let last = `${condition} LIKE "%?%"`
      let last = '';
      for (let key in condition) {
        last += `${key} LIKE "%${condition[key]}%" ${method} `
      }
      last = last.substring(0, last.length - (method.length + 2))
      // console.log(last);
      sql = `SELECT * FROM ${tableName} WHERE ${last}`
      console.log(sql);
    } else {
      throw new Error('条件类型错误')
    }
    pool.query(sql, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}