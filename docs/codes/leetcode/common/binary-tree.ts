
export class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}


// #region preOrder
function preOrder(root: TreeNode | null) {
    let result: number[] = [];
    if (root) {
        result.push(root.val);
        result = result.concat(preOrder(root.left));
        result = result.concat(preOrder(root.right));
    }
    return result;
}
// #endregion preOrder

// #region inOrder
function inOrder(root: TreeNode | null) {
    let result: number[] = [];
    if (root) {
        result = result.concat(inOrder(root.left));
        result.push(root.val);
        result = result.concat(inOrder(root.right));
    }
    return result;
}
// #endregion inOrder

// #region postOrder
function postOrder(root: TreeNode | null) {
    let result: number[] = [];
    if (root) {
        result = result.concat(postOrder(root.left));
        result = result.concat(postOrder(root.right));
        result.push(root.val);
    }
    return result;
}
// #endregion postOrder

// #region bfs
function bfs(root: TreeNode | null): number[][] {
    let result: number[][] = [];
    const stack: TreeNode[] = [];

    (root !== null) && stack.push(root);

    while(stack.length) {
        let len = stack.length;
        const row: number[] = [];

        while(len--) {
            const leaf = stack.shift();
            if (leaf) {
                row.push(leaf?.val);
                leaf.left && stack.push(leaf.left);
                leaf.right && stack.push(leaf.right);
            }
        }
        result.push(row);
    }

    return result;
}
// #endregion bfs
