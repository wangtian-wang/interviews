/**
 解题思路: 
  左指针 右指针 同时指向0位置的元素
   右指针先走, 当池子里面没有该元素时, 添加元素;长度变更;右指针++; 否则,右指针不动;开始移动左边指针;
   左边指针没移动一次,就会删除掉在池子里面记录的重复出现的字母,直到池子里面没有当前右指针指向的字母,左指针移动停止;开始移动右指针

扩展:
  找出所有无重复的子字符串
  找出第一个长度最大的子字符串

 */
function longStrSubstring(str) {
  let left = (right = length = maxLen = 0);
  let pool = new Set();
  let arr = [];
  while (right < str.length) {
    if (!pool.has(str[right])) {
      pool.add(str[right]);
      right++;
      length++;
      if (length > maxLen) {
        maxLen = length;
      }
    } else {
      while (pool.has(str[right])) {
        pool.delete(str[left]);
        left++;
        length--;
      }
      pool.add(str[right]);
      right++;
      length++;
    }
  }

  return [maxLen, pool];
}

// console.log(longStrSubstring("pwwkew"));
console.log(longStrSubstring("abcabcbb"));
