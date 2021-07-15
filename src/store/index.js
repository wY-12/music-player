import Vue from "vue";
import Vuex from "vuex";
import about from "./about";
import project from "./project";
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        about,
        project,
    },
    strict: true
})