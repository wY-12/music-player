//函数防抖

export default function debounce(fn, delay = 100) {

    let timer = null;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args)
        }, delay);
    }
}
