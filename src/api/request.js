import axios from "axios";
import showMessage from "../utils/showMessage";

//制作拦截器
const ins = axios.create();
ins.interceptors.response.use(function (resp) {
    // 在发送请求之前做些什么

    if (resp.data.code !== 0) {
        showMessage({
            content: resp.data.msg,
            type: "error",
            duration: 2000,
        })
        return null;
    }

    return resp.data.data;
})
export default ins;