/**
#region problem
给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。

示例 1：
输入：head = [1,2,3,4,5], left = 2, right = 4
输出：[1,4,3,2,5]

示例 2：
输入：head = [5], left = 1, right = 1
输出：[5]
#endregion problem
*/
import { ListNode } from "./common/linked-list";

// #region code
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    let result = new ListNode(-1, head);
    let pre: ListNode | null = result;

    for (let i = 1; i < left && pre; i++) pre = pre.next;

    if (!pre) return result.next;

    const start = pre.next;
    let curr: ListNode | null = null;
    for (let i = 0; i < right - left ; i++) {
        if (!start || !start.next) break;

        curr = start.next;
        start.next = curr.next;
        curr.next =  pre.next;
        pre.next = curr;
    }

    return result.next;
};
// #endregion code