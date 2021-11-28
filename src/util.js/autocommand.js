import fs from 'fs'
import ReadLine from 'readline'
/**
 * 
 * @InputFileUrl {*} 输入文件 
 * @OutputFileUrl {*} 输出文件
 * @templete {*} 指令模板
 * @charOfSplit {*} 数据分割符
 */
export function producecommand (InputFileUrl, OutputFileUrl, templete, charOfSplit) {
  var fRead = fs.createReadStream(InputFileUrl);
  var fWrite = fs.createWriteStream(OutputFileUrl);
  var objReadline = ReadLine.createInterface({
    input: fRead,
    output: fWrite,
    terminal: false
  });
  let count = 0
  objReadline.on('line', (strline) => {
    let singleArray = strline.split(charOfSplit)
    for (let i = 0; i < singleArray.length; i++) {
      templete = templete.replace('?', singleArray[i])
    }
    count++
    fWrite.write(templete + '\n');
  })
  objReadline.on('close', () => {
    console.log('readline close...');
  });
}