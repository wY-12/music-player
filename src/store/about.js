import { getAbout } from "../api/about"
export default {
    namespaced: true,
    state: {
        loading: false,
        data: ""
    },
    mutations: {
        //同步处理
        setLoading(state, payload) {
            state.loading = payload
        },
        setData(state, payload) {
            state.data = payload
        }
    },
    actions: {
        //异步处理
        async fetchAbout(ctx) {
            console.log(ctx)
            if (ctx.state.data) {
                return
            }
            ctx.commit("setLoading", true)
            const resp = await getAbout()
            ctx.commit("setData", resp)
            ctx.commit("setLoading", false)
        }
    }
}