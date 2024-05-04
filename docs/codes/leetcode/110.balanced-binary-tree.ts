/**
#region problem
给定一个二叉树，判断它是否是平衡二叉树。
平衡二叉树是指该树所有节点的左右子树的深度相差不超过 1。

示例 1：
输入：root = [3,9,20,null,null,15,7]
输出：true

示例 2：
输入：root = [1,2,2,3,3,null,null,4,4]
输出：false

示例 3：
输入：root = []
输出：true
#endregion problem
 */
import { TreeNode } from "./common/binary-tree";

function better() {
    // #region code-better
    function isBalanced(root: TreeNode | null): boolean {
        return maxDepth(root) !== -1;
    }

    function maxDepth(root: TreeNode | null): number {
        if (root === null) return 0;

        const leftDepth = maxDepth(root.left);
        const rightDepth = maxDepth(root.right);

        if (
            leftDepth === -1 || rightDepth === -1
            || leftDepth - rightDepth > 1 || rightDepth - leftDepth > 1
        ) {
            return -1;
        }

        return Math.max(leftDepth, rightDepth) + 1
    }
    // #endregion code-better
}

// #region code
function isBalanced(root: TreeNode | null): boolean {
    if (root === null) return true;

    const leftDepth = depth(root.left);
    const rightDepth = depth(root.right);

    return Math.abs(leftDepth - rightDepth) <= 1
        && isBalanced(root.left)
        && isBalanced(root.right)
};

function depth(root: TreeNode | null): number {
    if (root === null) return 0;

    return Math.max(depth(root.left), depth(root.right)) + 1;
}
// #endregion code