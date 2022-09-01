function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
function addTwoNumbers(l1, l2) {
  let result = (cur = new ListNode(0));
  let carry = 0;
  while (l1 || l2) {
    let val1 = l1 ? l1.val : 0;
    let val2 = l2 ? l2.val : 0;
    let sum = val1 + val2 + carry;
    if (sum >= 10) {
      sum = sum - 10;
      carry = 1;
    } else {
      carry = 0;
    }
    cur.next = new ListNode(sum, null); // 进位
    cur = cur.next;
    l1 = l1 ? l1.next : l1;
    l2 = l2 ? l2.next : l2;
  }
  if (carry === 1) {
    cur.next = new ListNode(1, null); // 进位
  }
  return result.next;
}
