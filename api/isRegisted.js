import db from '../mysql/index.js'
/**参数：
 * @userAccountThis {char[40]}账号
 * 
 * return:
 * @success {bool} 是否注册（已有账号返回 true，未被注册返回false）
 */
export default async function login (req, res) {
    //console.log(req.query.userIDThis);
    let userAccountThis = req.query.userAccountThis;
    let pro = await db.selectPart('user', ['userID'], { userAccount: userAccountThis });
    let success = pro.length != 0;
    res.send({
        success
    });
}