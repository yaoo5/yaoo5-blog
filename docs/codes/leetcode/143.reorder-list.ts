/**
#region problem
给定一个单链表 L 的头节点 head ，单链表 L 表示为：
L0 → L1 → … → Ln - 1 → Ln
请将其重新排列后变为：
L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

示例 1：
输入：head = [1,2,3,4]
输出：[1,4,2,3]

示例 2：
输入：head = [1,2,3,4,5]
输出：[1,5,2,4,3]
#endregion problem
*/
import { ListNode } from "./common/linked-list";

// #region code
function reorderList(head: ListNode | null): void {
    if (head == null || head.next == null) return;

    // 找到中间节点
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    while(fast && fast.next && slow) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // 反转链表
    let reverse: ListNode | null = null;
    while(slow) {
        const next = slow.next;
        slow.next = reverse;
        reverse = slow;
        slow = next;
    }
    

    // 合并链表
    slow = head;
    fast = reverse;
    head = new ListNode();
    let curr = head;
    while(slow && fast) {
        const slowNext = slow.next;

        curr.next = slow;
        curr.next.next = fast;

        slow = slowNext;
        fast = fast.next;

        curr = curr.next.next;
    }
    curr.next = null;
    head = head.next;
};
// #endregion code