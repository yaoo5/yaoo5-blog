/**
#region problem
给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。

示例 1：
输入：nums = [1,2,2]
输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]

示例 2：
输入：nums = [0]
输出：[[],[0]]
#endregion problem
 */

// #region code
function subsetsWithDup(nums: number[]): number[][] {
    const result: number[][] = [];
    const selected = {};

    function backtrack(start: number, curr: number[]) {
        result.push(curr.slice());
        if (curr.length === nums.length) {
            return;
        }

        for (let i = start; i < nums.length; i++) {
            if (selected[i] || (i > 0 && nums[i] === nums[i-1] && !selected[i-1])) {
                continue;
            }

            selected[i] = true;
            curr.push(nums[i]);
            backtrack(i + 1, curr);
            curr.pop();
            selected[i] = false;
        }
    }
    nums.sort((a, b) => a > b ? 1 : -1);
    backtrack(0, []);
    return result;
};
// #endregion code
