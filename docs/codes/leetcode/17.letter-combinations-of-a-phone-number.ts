/**
#region problem
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

示例 1：
输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]

示例 2：
输入：digits = ""
输出：[]

示例 3：
输入：digits = "2"
输出：["a","b","c"]
#endregion problem
*/

// #region code
function letterCombinations(digits: string): string[] {
    const result: string[] = [];
    const lettersMap = [
        [], [], ['a', 'b', 'c'], ['d', 'e', 'f'],
        ['g', 'h', 'i'], ['j','k','l'], ['m', 'n', 'o'],
        ['p', 'q', 'r', 's'], ['t', 'u', 'v'], ['w', 'x', 'y', 'z']
    ]

    function backtrack(start: number, curr: string[]) {
        if (curr.length === digits.length && curr.length) {
            result.push(curr.join(''));
            return;
        }

        let letters = lettersMap[+digits.charAt(start)];
        for (let i = 0; i < letters.length; i++) {
            // 这里不需要selected[]的判断
            curr.push(letters[i]);
            backtrack(start + 1, curr);
            curr.pop();
        }
    }

    backtrack(0, []);
    return result;
};
// #endregion code