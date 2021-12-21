import db from '../mysql/index.js'
/**参数：
 * @userAccountThis {char[40]}账号
 * @userPasswordThis {char[20]}密码
 * 
 * return:
 * case1:成功登录
 * @success {bool} 是否成功登录（成功返回 true，未成功返回false）
 * @listName {String[]}该用户所有的歌单名
 * @NickName {char[30]}用户昵称
 * @ID {BigInt}用户ID
 * 
 * case2:登陆失败
 * @success {bool} 是否成功登录（成功返回 true，未成功返回false）
 * @reson {String}登陆失败原因
 */
export default async function login (req, res) {
    //console.log(req.query.userIDThis);
    let userAccountThis = req.query.userAccountThis;
    let userPasswordThis = req.query.userPasswordThis;
    let pro = await db.selectPart('user', ['userID', 'userPassword', 'userNickName'], { userAccount: userAccountThis, userPassword: userPasswordThis });
    let success = pro[0].userID != null;
    if (success) {
        let ID = pro[0].userID;
        let NickName = pro[0].userNickName;
        let pro2 = await db.selectAll('songList', { userID: ID });
        //console.log(pro2[0].userID);
        // let len = pro2.length;
        // console.log(len);
        let listName = new Array();
        for (let index = 0; index < pro2.length; index++) {
            listName[index] = pro2[index].listName;
        }
        // let listName=pro2.listName;
        res.send({
            success,
            listName,
            NickName,
            ID
        });
    }
    else {
        let pro3 = await db.selectPart('user', ['userID', 'userPassword', 'userNickName'], { userAccount: userAccountThis });
        let reson;
        // console.log(pro3.userID);

        if (pro3.userID == null) {
            //console.log('in1');
            reson = 'Canot find the account!'
        }
        else {
            //console.log('in2');
            reson = 'Password is woring!'
        }


        res.send({
            success,
            reson

        });
    }
}