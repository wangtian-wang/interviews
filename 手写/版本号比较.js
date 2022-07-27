/*
知识扩展: referenceStr.localeCompare(compareStr) 按照ascii排序进行比较字母的大小
比较引用字符串和比较字符串的排序,返回值为数字
    当引用字符串在前,返回-1;
    引用字符串在后,返回1

 */

/*
 
  flag 返回 -1 后面的版本号高
  flag 返回 1 前面的版本号高
 */

const compare = function compare(a, b) {
  let reg = /^\d+(\.\d+){2}(-(alpha|beta|rc)\.\d+)?$/i,
    n = -1,
    diff,
    flag;
  if (!reg.test(a) || !reg.test(b)) throw new TypeError("请输入正确的版本号");
  a = a.split(/(?:\.|-)/g);
  b = b.split(/(?:\.|-)/g);
  //基于递归进行版本号比较
  const recur = () => {
    n++;
    let item1 = a[n],
      item2 = b[n];
    if (!item1 || !item2) {
      flag = !item1 && !item2 ? 0 : !item1 ? 1 : -1;
      return;
    }
    diff =
      isNaN(item1) || isNaN(item2) ? item1.localeCompare(item2) : item1 - item2;
    if (diff === 0) {
      recur();
      return;
    }
    flag = diff > 0 ? 1 : -1;
  };
  recur();
  return flag;
};
console.log(compare("3.2.34-beta.9", "3.2.34-beta.3"));
