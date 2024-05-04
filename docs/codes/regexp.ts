/**
#region millimeter-problem
千分符：每隔三位数字加一个逗号。
- 举例1： 1234 => 12234
- 举例2： 12345 => 12，345
- 举例3： 123456 => 123,456
- 举例4： 1234567 => 1,234,567
#endregion millimeter-problem
 */
// #region millimeter-code
function millimeter(str: string): string {
    const reg = /\d{1,3}(?=(\d{3})+$)/g;
    return str.replace(reg, (n) => n + ',')
}
// #endregion millimeter-code

/**
#region exchange-problem
对金额做千分符处理，如果是美元需兑换为人民币，假设汇率为7.2。
举例： `我钱包里有1000￥和1000$。` -> `我钱包里有1,000￥和1,000$(7,200￥)`
#endregion exchange-problem
 */
// #region exchange-code
function exchange(str: string): string {
    const reg = /(\d+)([\$￥])/g
    return str.replace(reg, (ma, p1, p2) => {
        // 假设汇率为1美元=7.2人民币
        const rate = 7.2;
        switch(p2) {
            case '￥': return millimeter(p1) + '￥';
            case '$':
                return `${millimeter(p1)}${p2}(${millimeter(`${p1 * rate}`)}￥)`;
            default: return ma;
        }
    });
}
/**
// #endregion exchange-code
// #region date-problem
提取时间中的年月日，时间可以为'YYYY-mm-dd'、'YYYY.mm.dd'、'YYYY年mm月dd日'
// #endregion date-problem
*/

// #region date-code
function date(str: string): string[] {
    const reg = /(\d{4})[-\.年](\d{1,2})[-\.月](\d{1,2})/;
    const matches = str.match(reg);

    return matches ? [matches[1], matches[2], matches[3]] : [];
}
// #endregion date-code


