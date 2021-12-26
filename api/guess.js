import db from "../mysql/index.js";

export default async function (req, res) {
  let keyword = req.query.keyword
  console.log(req.query)
  let pro = await db.selectLike('song', {
    songName: keyword,
  });
  let song = []
  if (pro.length > 3) {
    for (let i = 0; i < 3; i++) {
      song.push(pro[i].songName.replace('.mp3', ''))
    }
  } else if (pro.length > 0) {
    for (let i = 0; i < pro.length; i++) {
      song.push(pro[i].songName.replace('.mp3', ''))
    }
  }
  let singer = []
  let sing = await db.selectLike('singer', {
    singerName: keyword,
  });
  if (sing.length > 3) {
    for (let i = 0; i < 3; i++) {
      singer.push(sing[i].singerName)
    }
  } else if (sing.length > 0) {
    for (let i = 0; i < sing.length; i++) {
      singer.push(sing[i].singerName)
    }
  }
  console.log(singer)
  res.send({ song, singer })

}