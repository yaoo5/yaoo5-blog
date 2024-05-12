

// #region bubbleSort
export function bubbleSort(arr: number[]): number[] {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 1; j < arr.length - i; j++) {
            if (arr[j] < arr[j-1]) {
                const temp = arr[j];
                arr[j] = arr[j-1];
                arr[j-1] = temp;
            }
        }
    }

    return arr;
}
// #endregion bubbleSort


// #region selectionSort
export function selectionSort(arr: number[]): number[] {
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min !== i) {
            [arr[min], arr[i]] = [arr[i], arr[min]];
        }
    }

    return arr;
}
// #endregion selectionSort


// #region quickSort-simple
export function quickSortSimple(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }

    let pivot = arr[0];
    let left: number[] = [];
    let right: number[] = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else if (arr[i] > pivot) {
            right.push(arr[i])
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}
// #endregion quickSort-simple

// #region quickSort
export function quickSort(arr: number[], left?: number, right?: number): number[] {
    left = typeof left === 'number' ? left : 0;
    right = typeof right === 'number' ? right : arr.length;

    if (left < right) {
        let pivot = arr[left];
        let lessIdx = left + 1;

        for (let i = left + 1; i < right; i++) {
            if (arr[i] < pivot) {
                [arr[i], arr[lessIdx]] = [arr[lessIdx], arr[i]];
                lessIdx++;
            }
        }

        [arr[left], arr[lessIdx - 1]] = [arr[lessIdx - 1], arr[left]]
    }
    
    return arr;
}
// #endregion quickSort

// #region mergeSort
export function mergeSort(arr: number[], left?: number, right?: number): number[] {
    left = typeof left === 'number' ? left : 0;
    right = typeof right === 'number' ? right : arr.length;

    if (left >= right) return arr;

    const middle = Math.floor((left + right) / 2);
    mergeSort(arr, left, middle);
    mergeSort(arr, middle + 1, right);

    const result: number[] = [];
    let rightIdx = middle;

    while(left < middle && rightIdx < right)  {
        if (arr[left] < arr[rightIdx]) {
            result.push(arr[left++]);
        } else {
            result.push(arr[rightIdx++])
        }
    }
    while(left < middle) {
        result.push(arr[left++]);
    }
    while(rightIdx < right) {
        result.push(arr[rightIdx++])
    }

    return result;
}
// #endregion mergeSort


// #region insertionSort
export function insertionSort(arr: number[]): number[] {

    for (let i = 1; i < arr.length; i++) {
        let curr = arr[i];
        let j = i;
        while(j > 0 && arr[j] > arr[i]) {
            arr[j + 1] = arr[j--]
        }
        arr[j] = curr;
    }

    return arr;
}
// #endregion insertionSort
