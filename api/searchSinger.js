import db from '../mysql/index.js'

/**参数：
 * @keyword {String} 关键词
 * @page {int} 页码
 * 
 * return:
 * @singer {Object} 歌手信息
 * [{
	 'singerName': pro[i].singerName
		}]
 */

export default async function (req, res) {
	let singerData = [];
	let pro = await db.selectLike('singer', {
		singerName: req.query.keyword,
	});
	// console.log(pro);
	let total = pro.length; //查询到的歌手数
	let num = total; //每页显示的条数
	let pageNum = Math.ceil(total / num); //总页数
	let page = 1; //当前页码，默认为1
	if (req.query.page) {
		page = parseInt(req.query.page); //将传入页码转为整数
	}
	for (let i = page * num - num; i < page * num; i++) { //分页显示
		singerData.push(pro[i]);
	}
	res.json({
		total,
		page,
		singerData
	});

}
