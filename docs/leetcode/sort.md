# 排序算法

## 冒泡排序

> 曾在面试中栽过，越简单越容易忽略。

| 时间复杂度        |      空间复杂度      | 
| ------------- | :-----------: |
| O(n^2)      | O(1) |

<<< @/codes/leetcode/sort.ts#bubbleSort

## 选择排序

| 时间复杂度        |      空间复杂度      | 
| ------------- | :-----------: |
| O(n^2)      | O(1) |

<<< @/codes/leetcode/sort.ts#selectionSort

## 快速排序

| 时间复杂度        |      空间复杂度      | 
| ------------- | :-----------: |
| O(log2n)      | O(1) |

:::code-group

<<< @/codes/leetcode/sort.ts#quickSort[更优解]

<<< @/codes/leetcode/sort.ts#quickSort-simple[普通解]

:::

## 归并排序

| 时间复杂度        |      空间复杂度      | 
| ------------- | :-----------: |
| O(log2n)      | O(n) |

<<< @/codes/leetcode/sort.ts#mergeSort

## 插入排序

| 时间复杂度        |      空间复杂度      | 
| ------------- | :-----------: |
| O(n^2)      | O(1) |

<<< @/codes/leetcode/sort.ts#insertionSort

## 参考
- [十大经典排序算法](https://www.cnblogs.com/onepixel/p/7674659.html)
