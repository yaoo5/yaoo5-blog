/**
#region problem
给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

示例 1：
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]

示例 2：
输入：head = [1,2]
输出：[2,1]

示例 3：
输入：head = []
输出：[]
#endregion problem
*/
import { ListNode } from "./common/linked-list";

// #region code
function reverseList(head: ListNode | null): ListNode | null {
    let result: ListNode | null = null;
    let curr = head;

    while(curr) {
        const next = curr.next;
        curr.next = result;
        result = curr;
        curr = next;
    }

    return result;
};
// #endregion code