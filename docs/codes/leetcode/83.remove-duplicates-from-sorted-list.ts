/**
#region problem
给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。

示例 1：
输入：head = [1,1,2]
输出：[1,2]

示例 2：
输入：head = [1,1,2,3,3]
输出：[1,2,3]
#endregion problem
*/
import { ListNode } from "./common/linked-list";

// #region code
function deleteDuplicates(head: ListNode | null): ListNode | null {
    if (head === null) return null;

    let curr: ListNode = head;
    while(curr.next) {
        if (curr.val !== curr.next.val) {
            curr = curr.next;
        } else {
            curr.next = curr.next.next;
        }
    }

    return head;
};
// #endregion code