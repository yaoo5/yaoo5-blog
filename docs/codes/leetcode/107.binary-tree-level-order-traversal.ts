/**
#region problem
给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

示例 1：
输入：root = [3,9,20,null,null,15,7]
输出：[[15,7],[9,20],[3]]

示例 2：
输入：root = [1]
输出：[[1]]

示例 3：
输入：root = []
输出：[]
#endregion problem
 */
import { TreeNode } from "./common/binary-tree";

// #region code
function levelOrderBottom(root: TreeNode | null): number[][] {
    if (root === null) return [];

    const stack: TreeNode[] = [root];
    const result: number[][] = [];

    while(stack.length) {
        let len = stack.length;
        const row: number[] = [];
        while(len--) {
            const leaf = stack.shift();
            if (leaf) {
                row.push(leaf.val);
                leaf.left && stack.push(leaf.left);
                leaf.right && stack.push(leaf.right);
            }
        }
        result.unshift(row);
    }

    return result;
};
// #endregion code