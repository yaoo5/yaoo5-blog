/**
#region problem
给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。

示例 1：
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]

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
function levelOrder(root: TreeNode | null): number[][] {
    if (root === null) return [];

    const result: number[][] = [];
    const stack: TreeNode[] = [root];

    while(stack.length) {
        const row: number[] = [];
        let rowLen = stack.length;
        while(rowLen--) {
            const leaf = stack.shift();
            if (!leaf) continue;
            row.push(leaf.val);
            leaf.left && stack.push(leaf.left)
            leaf.right && stack.push(leaf.right)
        }
        result.push(row);
    }

    return result;
};
// #endregion code