/**
#region problem
给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。
你应当 保留 两个分区中每个节点的初始相对位置。

示例 1：
输入：head = [1,4,3,2,5,2], x = 3
输出：[1,2,2,4,3,5]

示例 2：
输入：head = [2,1], x = 2
输出：[1,2]
#endregion problem
*/
import { ListNode } from "./common/linked-list";

// #region code
function partition(head: ListNode | null, x: number): ListNode | null {
    let result = new ListNode();
    let curr = result;
    let head2 = head;

    while(head) {
        if (head.val < x) {
            curr.next = new ListNode(head.val);
            curr = curr.next;
        }
        head = head.next;
    }    
    while(head2) {
        if (head2.val >= x) {
            curr.next = new ListNode(head2.val);
            curr = curr.next;
        }
        head2 = head2.next;
    }

    return result.next;
};
// #endregion code