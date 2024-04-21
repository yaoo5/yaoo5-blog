/**
#region problem
给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。

示例 1：
输入：nums = [1,1,2]
输出：[[1,1,2], [1,2,1], [2,1,1]]

示例 2：
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
#endregion problem
*/

// #region code
function permuteUnique(nums: number[]): number[][] {
    const result: number[][] = [];
    const selected = {};

    function backtrack(choices: number[], current: number[]) {
        if (current.length === nums.length) {
            result.push(current.slice());
            return;
        }

        for (let i = 0; i < choices.length; i++) {
            const cho = choices[i]
            if (selected[i]
                || (i > 0 && choices[i] === choices[i - 1] && !selected[i-1])
            ) {
                continue;
            }

            selected[i] = true;
            current.push(cho);
            backtrack(choices, current);
            current.pop();
            selected[i] = false;
        }
    }

    backtrack(nums.sort((a,b) => a > b ? 1 : -1), []);
    return result;
};
// #endregion code