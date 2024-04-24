/**
#region problem
给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
解集不能包含重复的子集。你可以按 任意顺序 返回解集。

示例 1：
输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

示例 2：
输入：nums = [0]
输出：[[],[0]]
#endregion problem
 */

// #region code
function subsets(nums: number[]): number[][] {
    const result: number[][] = [];
    const selected: Record<number, boolean> = {};

    function backtrack(start: number, current: number[]) {
        result.push(current.slice());
        if (start > nums.length) {
            return;
        }

        for (let i = start; i < nums.length; i++) {
            const choice = nums[i]
            if (!selected[choice]) {
                selected[choice] = true;
                current.push(choice);
                backtrack(i + 1, current);
                current.pop();
                selected[choice] = false;
            }
        }
    }

    backtrack(0, []);
    return result;
};
// #endregion code