/**
#region problem
给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
有效二叉搜索树定义如下：
- 节点的左子树只包含小于 当前节点的数。
- 节点的右子树只包含大于 当前节点的数。
- 所有左子树和右子树自身必须也是二叉搜索树。

示例 1：
输入：root = [2,1,3]
输出：true

示例 2：
输入：root = [5,1,4,null,null,3,6]
输出：false
解释：根节点的值是 5 ，但是右子节点的值是 4 。
#endregion problem
 */
import { TreeNode } from "./common/binary-tree";

// #region code
function isValidBST(root: TreeNode | null): boolean {
    const order = preOrder(root);

    if (!order.length) return true;

    for (let i = 1; i < order.length; i++) {
        if (order[i] <= order[i - 1]) return false;
    }

    return true;
};

function preOrder(root: TreeNode | null): number[] {
    let result: number[] = [];

    if (root) {
        result = result.concat(preOrder(root.left));
        result.push(root.val);
        result = result.concat(preOrder(root.right));
    }

    return result;
}
// #endregion code
