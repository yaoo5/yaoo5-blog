/**
#region problem
将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

示例 1
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]

示例 2：
输入：l1 = [], l2 = []
输出：[]

示例 3：
输入：l1 = [], l2 = [0]
输出：[0]
#endregion problem
*/
import { ListNode } from "./common/linked-list";

// #region code
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    if (list1 === null && list2 === null) return null;

    const head = new ListNode();
    let curr = head;

    while(list1 && list2) {
        if (list1.val < list2.val) {
            curr.next = new ListNode(list1.val, null);
            list1 = list1.next;
        } else {
            curr.next = new ListNode(list2.val, null);
            list2 = list2.next;
        }
        curr = curr.next;
    }

    curr.next = list1 === null ? list2 : list1;

    return head.next;
};
// #endregion code