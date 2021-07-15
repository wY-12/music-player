export default function (timestamp) {
    const date = new Date(+timestamp);
    const mouth = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDay().toString().padStart(2, "0");
    return `${date.getFullYear()}-${mouth}-${day}`
}