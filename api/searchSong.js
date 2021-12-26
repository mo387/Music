import db from '../mysql/index.js'

/**参数：
 * @keyword {String} 关键词
 * @page {int} 页码
 * 
 * return:
 * @songNum {int} 歌曲数量
 * @songDetail {Object} 歌曲信息
 * [{'songName': pro[i].songName,
	 'singerName': pro[i].singer,
	 'imgUrl': null,
	 'musicUrl': null
		}]
 */

export default async function (req, res) {
	let musicData = [];
	let keyword = req.query.keyword
	let pro = await db.selectLike('song', {
		songName: keyword,
	});
	console.log(pro);
	let total = pro.length; //查询到的歌曲数
	let num = total; //每页显示的条数
	let pageNum = Math.ceil(total / num); //总页数
	let page = 1; //当前页码，默认为1
	if (req.query.page) {
		page = parseInt(req.query.page); //将传入页码转为整数
	}
	for (let i = page * num - num; i < page * num; i++) { //分页显示
		musicData.push({
			songName: pro[i].songName,
			singerName: pro[i].singer,
			songTime: '4:00',
			imgUrl: pro[i].songImage,
			musicUrl: pro[i].songSrc,
			songID: pro[i].songID
		})
	}
	for (let i in musicData) {
		console.log(`i:${i},musicData[i]:${JSON.stringify(musicData[i])}`);
	}
	res.send({
		total,
		// page,
		musicData
	});

}
