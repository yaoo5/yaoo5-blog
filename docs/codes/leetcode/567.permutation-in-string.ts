/**
#region problem
给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。如果是，返回 true ；否则，返回 false 。
换句话说，s1 的排列之一是 s2 的 子串 。

示例 1：
输入：s1 = "ab" s2 = "eidbaooo"
输出：true
解释：s2 包含 s1 的排列之一 ("ba").

示例 2：
输入：s1= "ab" s2 = "eidboaoo"
输出：false
#endregion problem
*/

function better() {
    // #region code-better
    function checkInclusion(s1: string, s2: string): boolean {
        if (s2.length < s1.length) return false;
    
        const cnt = new Array(26).fill(0);
        for (let i = 0; i < s1.length; i++) {
            cnt[s1[i].charCodeAt(0) - 'a'.charCodeAt(0)]--;
        }
    
        let left = 0;
        let right = 0;
        while(right < s2.length) {
            const oo = s2[right].charCodeAt(0) - 'a'.charCodeAt(0);
            cnt[oo]++;
    
            while(cnt[oo] > 0) {
                cnt[s2[left].charCodeAt(0) - 'a'.charCodeAt(0)]--;
                left++;
            }
    
            if (right - left + 1 === s1.length) return true;
            right++;
        }
    
        return false;
    };
    // #endregion code-better
}

// #region code
// 执行用时14.29%，消耗内存用时5.36%
function checkInclusion(s1: string, s2: string): boolean {
    if (s2.length < s1.length) return false;

    let cnt1 = new Array(26).fill(0);
    let cnt2 = new Array(26).fill(0);
    for (let i = 0; i < s1.length; i++) {
        ++cnt1[s1[i].charCodeAt(0) - 'a'.charCodeAt(0)];
        ++cnt2[s2[i].charCodeAt(0) - 'a'.charCodeAt(0)];
    }

    if (cnt1.toString() === cnt2.toString()) return true;

    for (let i = s1.length; i < s2.length; i++) {
        cnt2[s2[i].charCodeAt(0) - 'a'.charCodeAt(0)]++;
        cnt2[s2[i - s1.length].charCodeAt(0) - 'a'.charCodeAt(0)]--;
        if (cnt1.toString() === cnt2.toString()) return true;
    }

    return false;
};
// #endregion code