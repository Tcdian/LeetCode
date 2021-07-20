// 选择排序
function selectionSort(array, compare = (a, b) => a - b) {
    for (let i = 0; i < array.length; i++) {
        let foundIndex = i;
        for (let j = i; j < array.length; j++) {
            if (compare(array[foundIndex], array[j]) > 0) {
                foundIndex = j;
            }
        }
        swap(foundIndex, i);
    }
    return array;
    function swap(i, j) {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
// 插入排序
function insertionSort(array, compare = (a, b) => a - b) {
    for (let i = 0; i < array.length; i++) {
        const inserted = array[i];
        let j;
        for (j = i; j - 1 >= 0; j--) {
            if (compare(array[j - 1], inserted) > 0) {
                array[j] = array[j - 1];
            }
            else {
                break;
            }
        }
        array[j] = inserted;
    }
    return array;
}
export { selectionSort, insertionSort };
