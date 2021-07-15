import loadingUrl from "@/assets/loading.svg";
import styles from "./loading.module.less"
function getLoadingImage(el) {
    return el.querySelector("img[data-role=loading]")
}

function createLoadingImg() {
    //创建img对象
    const img = document.createElement("img");
    img.dataset.role = "loading";
    img.src = loadingUrl;
    img.className = styles.loading;
    return img;
}

export default function (el, binding) {
    //el指令所绑定的元素 可以直接用来直接操作dom
    //binding 一个对象 
    //查看是否已经存在 img对象
    const curImg = getLoadingImage(el);
    if (binding.value) {
        //binding.value的值   决定了创建或删除el
        //如果 value有值 创建一个 img对象
        if (!curImg) {
            const img = createLoadingImg();
            el.appendChild(img);
        }
    } else {
        //如果已经存在了
        if (curImg) {
            curImg.remove();
        }
    }
}