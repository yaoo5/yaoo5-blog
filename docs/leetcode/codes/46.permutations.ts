/**
#region problem
给定一个不含重复数字的数组 nums ，返回其所有可能的全排列 。你可以按任意顺序返回答案。

示例 1：
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

示例 2：
输入：nums = [0,1]
输出：[[0,1],[1,0]]

示例 3：
输入：nums = [1]
输出：[[1]]
#endregion problem
*/

// #region code
function permute(nums: number[]): number[][] {
    const result: number[][] = [];
    const selected = {};

    function backtrack(choices: number[], current: number[]) {
        if (current.length === nums.length) {
            result.push(current.slice());
            return;
        }

        for (const choice of choices) {
            if (!selected[choice]) {
                selected[choice] = true;
                current.push(choice);
                backtrack(choices, current);
                current.pop();
                selected[choice] = false;
            }
        }
    }

    backtrack(nums, []);
    return result;
};
// #endregion code