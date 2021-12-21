
import db from '../mysql/index.js';


export default function(req,res){
        // 获取数据(歌曲id;用户id)
        let id1 = req.query.userID
        let id2 = req.query.songID
        db.insertSingle('songlistcontent',{listName:'Myfavouriteee',songID:id2,userID:id1}).then(suc=>{
            res.send({success:true})
        },err=>{
            res.send({fal:false})
        })

}
