/**
#region problem
给定一个二叉树的根节点 root ，返回它的中序遍历 。

示例 1：
输入：root = [1,null,2,3]
输出：[1,3,2]

示例 2：
输入：root = []
输出：[]

示例 3：
输入：root = [1]
输出：[1]
#endregion problem
 */
import { TreeNode } from "./common/binary-tree";

// #region code
function inorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];

    function inorder(leaf: TreeNode | null) {
        if (leaf === null) return;

        inorder(leaf.left);
        result.push(leaf.val);
        inorder(leaf.right);
    }
    inorder(root);

    return result;
};
// #endregion code