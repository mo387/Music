import db from "../mysql/index.js";
export default async function (req, res) {
  console.log(req.cookies)
  let pro = await db.selectPart('user', ['userID', 'userPassword', 'userNickName', 'userHeadUrl'], { userAccount: req.cookies.username });
  let success = pro.length != 0;
  if (success) {
    let ID = pro[0].userID;
    let NickName = pro[0].userNickName;
    let userHeadUrl = pro[0].userHeadUrl;
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
      ID,
      userHeadUrl
    });
  }
}