import db from '../mysql/index.js';//引入连接池模块
/**函数：
 * @subSongWord 返回值：[{time,word}]
 * 参数：
 * @songID {bigint[30]}歌曲ID号
 * 
 * 返回：
 * @songWordUrl {char[40]} 歌词路径
 * @success {boolean} 是否取出成功（成功取出返回true，失败返回false）
 * @reason {String} 失败原因
 */
export default async function getSongWord (req, res) {
  let songID = req.query.songID;
  console.log(songID);
  let ret = await db.selectPart('song', ['songID', 'songWord'], { songID: songID })
  console.log(ret.length > 0);
  console.log(ret);
  let success = (ret.length > 0);
  if (success) {
    let songWord = subSongWord(ret[0].songWord);

    res.json({
      success,
      songWord
    });
  }
  else {//当songID匹配不到时，ret_false返回值为[]，即空数组，需要更改从此处开始的逻辑
    let ret_false = await db.selectAll('song', { songID: songID });
    res.json({
      success,
      reason: "没有对应ID的歌曲"
    });
  }
}

function subSongWord (str) {
  // let str = '[00:00.000] 作词 : G.E.M.邓紫棋[00:01.000] 作曲 : G.E.M.邓紫棋[00:03.260][00:06.780]爱情的起点 都是最美的瞬间[00:12.950]什么铁达尼的经典 罗密欧跟茱丽叶[00:19.960]那些最煽情的电影情节[00:23.480]都说爱能超越生死离别[00:27.320]曾经 我们都很坚决 爱了就不改变[00:33.440][00:34.160]不要对我说再见  一句再见 就结束这一切[00:41.120]能否不要说再见 你的再见 说得那么明确[00:48.130]怎么我和你之间 两个世界 再也没有交接[00:55.570]如果告别 能不能再见[01:00.750][01:03.530]我们的照片  记录幸福到永远[01:09.360]只是再幸福的画面  只定格在一瞬间[01:16.430]那些慢吞吞悲情的音乐[01:19.800]早说过爱过之后就是离别[01:23.370]早该相信那些预言   我们也没有多特别[01:30.610]不要对我说再见 一句再见 让爱变得表面[01:37.610]真的不用说再见 就算再见 结局不能改变[01:44.690]就算我和你之间 两个世界 再也没有交接[01:51.820]不用抱歉 就真的再见[01:58.580]如果有缘 我们会再遇见 反正地球本来就很圆[02:05.850]就算今天 你要走得多远 反正就是一条地平线[02:12.840]反正愿望不一定会实现 反正承诺不一定要兑现[02:20.020]反正睡醒是新的一天[02:27.050][02:41.060]别对我说再见   一句再见 让爱变得表面[02:48.110]真的不用说再见 就算再见 结局不能改变[02:55.210]就算我和你之间 两个世界 再也没有交接[03:02.280]不用抱歉 就真的再见[03:09.440][03:10.700]爱情到终点 我们只能说再见[03:18.090]'
  let arr = []
  let time = ''
  let word = ''
  let result = []
  for (let i = 0; i < str.length; i++) {
    if (str[i] == '[') {
      arr.push('[')
      result.push({ time, word })
      time = ''
      word = ''
    } else if (str[i] == ']') {
      arr.pop()
    }
    if (arr.length == 1 && (str[i] != '[' && str[i] != ']')) {
      time += str[i]
    } else if (arr.length == 0 && (str[i] != '[' && str[i] != ']')) {
      word += str[i]
    }
  }
  return result
  // console.log(result)
}