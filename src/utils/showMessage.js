/**
 * 弹出消息
 * @param {String} content 消息内容
 * @param {String} type 消息类型  info  error  success  warn
 * @param {Number} duration 多久后消失
 * @param {HTMLElement} container 容器，消息会显示到该容器的正中；如果不传，则显示到页面正中
 */
import styles from "./message.module.less"
import Icon from "@/Components/Icon"
import getComponentRootDom from "./getComponentRootDom"
export default function (options = {}) {
    const content = options.content || "";
    const type = options.type || "info";
    const duration = options.duration || 2000;
    const container = options.container || document.body;
    //创建dom实例
    const div = document.createElement("div");
    const iconDom = getComponentRootDom(Icon, { type })
    //设置样式 需要一个 icon 的组件实例
    div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><p>${content}</p>`;

    const typeClassName = styles[`message-${type}`]
    div.className = `${styles.message} ${typeClassName}`
    if (options.container) {
        if (getComputedStyle(container).position === "static") {
            container.style.position = "relative";
        }


    }
    container.appendChild(div);
    //强制渲染
    div.clientHeight;

    div.style.opacity = 1;
    div.style.transform = `translate(-50%,-50%)`;

    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = `translate(-50%, -50%) translateY(-25px)`;
        div.addEventListener("transitionend", function () {
            div.remove();
            options.callback && options.callback();
        }, { once: true })
    }, duration)

}