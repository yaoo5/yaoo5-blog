/**
#region problem
给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。

示例 1：
输入：head = [1,2,3,3,4,4,5]
输出：[1,2,5]

示例 2：
输入：head = [1,1,1,2,3]
输出：[2,3]
#endregion problem
*/
import { ListNode } from "./common/linked-list";

// #region code
function deleteDuplicates(head: ListNode | null): ListNode | null {
    if (head === null) return head;

    let result: ListNode = new ListNode();
    let curr: ListNode = result;
    while(head) {
        if (head.next && head.next.val === head.val) {
            while(head.next && head.val === head.next.val) {
                head = head.next;
            }
        } else {
            curr.next = new ListNode(head.val);
            curr = curr.next;
        }
        head = head.next;
    }

    return result.next;
};
// #endregion code