import db from '../mysql/index.js'
/**参数：
 * @userAccountThis {char[40]}账号
 * @userPasswordThis {char[20]}密码
 * 
 * return:
 * case1:注册成功
 * @success {bool} 是否成功登录（成功返回 true，未成功返回false）
 * 
 * case2:注册失败
 * @success {bool} 是否成功登录（成功返回 true，未成功返回false）
 * @reson {String}登陆失败原因
 */



export default async function login (req, res) {
    console.log(req.query.userIDThis);
    let userAccountThis = req.query.userAccountThis;
    let userPasswordThis = req.query.userPasswordThis;




    let pro = await db.selectPart('user', ['userID', 'userPassword', 'userNickName'], { userAccount: userAccountThis });
    // console.log(pro);
    let success = pro.length == 0;
    if (success) {

        await db.insertSingle('user', { userPassword: userPasswordThis, userAccount: userAccountThis });
        let pro2 = await db.selectPart('user', ['userID'], { userAccount: userAccountThis });
        let ID = pro2[0].userID;
        //console.log(pro2[0].userID);
        db.insertSingle('songList', { listName: 'Myfavouriteee', userID: ID });


        res.send({
            success,

        });
    }
    else {
        let result = '账号已被注册';

        res.send({
            success,
            result,

        })

    }





}