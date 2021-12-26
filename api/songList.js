import db from "../mysql/index.js";

//返回值
// {
//     song[{
//       songName:'',
//       singerName:'',
//       imageUrl:''
//       musicUrl:''
//     }]
//   }
export default async function (req, res) {
    //获取数据
    let obj = req.query
    let part = ['songID']
    //找到对应listName和userID的songID
    let id1 = req.query.listName
    let id2 = req.query.userID
    let res1 = []
    res1 = await db.selectPart('songlistcontent', part, { listName: id1, userID: id2 })
    //通过songID找到对应的songName,songImage,songSrc,songID
    let song = []
    for (let i = 0; i < res1.length; i++) {
        let q = await db.selectAll('song', { songID: res1[i].songID })
        let songID = q[0].songID
        let songName = q[0].songName
        let imgUrl = q[0].songImage
        let musicUrl = q[0].songSrc
        song.push({
            songID, songName, imgUrl, musicUrl
        })
    }
    // console.log(song)
    //通过songID找到songrelease中对应的singerID
    let part2 = ['singerID']
    let sgID = []
    for (let i = 0; i < res1.length; i++) {
        sgID.push(await db.selectPart('songrelease', part2, { songID: res1[i].songID }))
    }
    // console.log(sgID)
    //通过singerID找到对应singer中对应的singerName
    let part3 = ['singerName']
    let sgNm = []
    for (let i = 0; i < sgID.length; i++) {
        if (sgID[i].length > 1) {
            let str = ''
            for (let j = 0; j < sgID[i].length; j++) {
                let item = sgID[i][j].singerID
                // console.log(item)
                let result = await db.selectPart('singer', part3, { singerID: item })
                // console.log(result)
                str = str + result[0].singerName + ','
            }
            str = str.substring(0, str.length - 1)
            // console.log(str)
            let p = [str]
            sgNm.push(p)
        } else {
            console.log(sgID)
            let b = await db.selectPart('singer', part3, { singerID: sgID[i][0].singerID })
            let str1 = b[0].singerName
            let p1 = [str1]
            sgNm.push(p1)
        }

    }
    console.log(sgNm)
    //将sgNm合并到song中
    for (let i = 0; i < res1.length; i++) {
        song[i].singerName = sgNm[i][0]
    }
    // console.log(song)
    res.send({ song })


}