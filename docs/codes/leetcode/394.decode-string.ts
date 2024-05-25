/**
#region problem
给定一个经过编码的字符串，返回它解码后的字符串。
编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。

示例 1：
输入：s = "3[a]2[bc]"
输出："aaabcbc"

示例 2：
输入：s = "3[a2[c]]"
输出："accaccacc"

示例 3：
输入：s = "2[abc]3[cd]ef"
输出："abcabccdcdcdef"

示例 4：
输入：s = "abc3[cd]xyz"
输出："abccdcdcdxyz"
#endregion problem
 */

function regexpSolution() {
    // #region code-regexp
    function decodeString(s: string): string {
        const reg = /(\d{1,})\[([a-zA-Z]+)\]/g;
        if (reg.test(s)) {
            const result = s.replace(reg, (match, m1, m2) => m2.repeat(+m1));
            return decodeString(result);
        }
        return s;
    };
    // #endregion code-regexp
}

// #region code
function decodeString(s: string): string {
    const stack: string[] = [];
    let result = '';

    for (const ch of s) {
        if (/\d/.test(ch)) {
            if (/\d+/.test(stack[stack.length - 1])) {
                const num = stack.pop();
                stack.push(`${num}${ch}`);
            } else {
                stack.push(ch);
            }
        } else if (ch === '[') {
            stack.push("")
        } else if  (ch === ']') {
            const str = stack.pop();
            const num = stack.pop();
            if (stack.length === 0) {
                result += str!.repeat(+num!);
            } else {
                stack[stack.length - 1] += str!.repeat(+num!); 
            }
        } else {
            if (stack.length === 0) {
                result += ch;
            } else {
                stack[stack.length - 1] += ch;
            }
        }
    }

    return result;
};
// #endregion code