
import db from '../mysql/index.js';


export function like (req, res) {
    // 获取数据(歌曲id;用户id)
    console.log('发送了')
    let id1 = req.query.userID
    let id2 = req.query.songID
    console.log(id1, id2)
    db.insertSingle('songlistcontent', { listName: 'Myfavouriteee', songID: id2, userID: id1 }).then(suc => {
        res.send({ success: true })
    }, err => {
        res.send({ fal: false })
    })

}
export async function islike (req, res) {
    let id1 = req.query.userID
    let id2 = req.query.songID
    let p = []
    p = await db.selectAll('songlistcontent', { listName: 'Myfavouriteee', songID: id2, userID: id1 })
    if (p.length != 0) {
        res.send({ success: true })
    } else {
        res.send({ fal: false })
    }

}
export function deletelike (req, res) {
    let id1 = req.query.userID
    let id2 = req.query.songID
    db.deletesingle('songlistcontent', { listName: 'Myfavouriteee', songID: id2, userID: id1 }).then(suc => {
        res.send({ success: true })
    }, err => {
        res.send({ fal: false })
    })
}
