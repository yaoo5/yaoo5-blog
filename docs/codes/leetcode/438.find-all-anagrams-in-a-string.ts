/**
#region problem
给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。

示例 1:
输入: s = "cbaebabacd", p = "abc"
输出: [0,6]
解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。

示例 2:
输入: s = "abab", p = "ab"
输出: [0,1,2]
解释:
起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。
#endregion problem
*/

// #region code
function findAnagrams(s: string, p: string): number[] {
    if (s.length < s.length) return [];

    const cnt = new Array(26).fill(0);
    for (let i = 0; i < p.length; i++) {
        cnt[p[i].charCodeAt(0) - 'a'.charCodeAt(0)]--;
    }

    let left = 0;
    let right = 0;
    let result: number[] = [];
    while (right < s.length) {
        const o_o = s[right].charCodeAt(0) - 'a'.charCodeAt(0);
        cnt[o_o]++;

        while (cnt[o_o] > 0) {
            cnt[s[left].charCodeAt(0) - 'a'.charCodeAt(0)]--;
            left++;
        }

        if (right - left + 1 === p.length) {
            result.push(left);
        }
        right++;
    }

    return result;
};
// #endregion code