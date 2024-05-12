// sum.test.js
import { describe, expect, test } from 'vitest';
import {
  bubbleSort,
  selectionSort,
  quickSortSimple,
  quickSort,
  mergeSort,
  insertionSort
} from '../../docs/codes/leetcode/sort.ts'


const testUnit = [3, 4, 5, 2, 1];
const testExpect = [1, 2, 3, 4, 5];

describe('TEST @/codes/leetcode/sort.ts', () => {

  test('test: 冒泡排序(bubbleSort)', () => {
    expect(bubbleSort(testUnit)).toEqual(testExpect)
  })

  
  test('test: 选择排序(selectionSort)', () => {
    expect(selectionSort(testUnit)).toEqual(testExpect)
  })

  test('test: 快速排序(quickSortSimple)', () => {
    expect(quickSortSimple(testUnit)).toEqual(testExpect)
  })
  test('test: 快速排序(quickSort)', () => {
    expect(quickSort(testUnit)).toEqual(testExpect)
  })
  
  test('test: 合并排序(mergeSort)', () => {
    expect(mergeSort(testUnit)).toEqual(testExpect)
  });

  test('test: 插入排序(insertionSort)', () => {
    expect(insertionSort(testUnit)).toEqual(testExpect)
  });
  
})
