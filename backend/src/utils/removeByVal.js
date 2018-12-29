export default function removeByVal(arr, item) {
    const index = arr.indexOf(item);
    arr.splice(index, 1);
    return arr;
}