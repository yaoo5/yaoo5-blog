
#region backtract
const result = [];
const selected = {};
function backtarck(choices: number[], current: number[]) {
    if (满足结束条件) {
        result.add(current)
        return;
    }

    for (const choice in choices) {
        if (!selected[choice]) {
            selected[choice] = true;
            current.push(choice);
            backtrack(选择列表， 路径);
            selected[choice] = false;
            current.pop();
        }
    }
}
#endregion backtract
