/**
#region problem
斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：
F(0) = 0，F(1) = 1
F(n) = F(n - 1) + F(n - 2)，其中 n > 1
给定 n ，请计算 F(n) 。
#endregion problem
*/

function better() {
    // #region code-better
    const cache = Object.create(null);
    function fib(n: number): number {
        if (n <= 1) return n;
    
        if (!cache[n]) {
            const num = fib(n - 1) + fib(n - 2);
            cache[n] = num;
        }
        return cache[n]
    };
    // #endregion code-better
}


// #region code
/**
 * 面试千万不能这样写，或者要留后手记住第二种。因为这样写会有重复计算的问题。
 * @param n 
 * @returns 
 */
function fib(n: number): number {
    if (n <= 1) return n;

    return fib(n - 1) + fib(n - 2);
}

// #endregion code