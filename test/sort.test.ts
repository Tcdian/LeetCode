import { selectionSort, insertionSort } from '../basis/sort';

describe('selectionSort', () => {
    test('默认排序', () => {
        const array = [5, 7, 2, 3, 1, 9, 6];
        expect(selectionSort(array)).toEqual([1, 2, 3, 5, 6, 7, 9]);
    });
    test('compare', () => {
        const array = [5, 7, 2, 3, 1, 9, 6];
        expect(selectionSort(array, (a, b) => b - a)).toEqual([9, 7, 6, 5, 3, 2, 1]);
    });
});

describe('insertionSort', () => {
    test('默认排序', () => {
        const array = [5, 7, 2, 3, 1, 9, 6];
        expect(insertionSort(array)).toEqual([1, 2, 3, 5, 6, 7, 9]);
    });
    test('compare', () => {
        const array = [5, 7, 2, 3, 1, 9, 6];
        expect(insertionSort(array, (a, b) => b - a)).toEqual([9, 7, 6, 5, 3, 2, 1]);
    });
});
